'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/modules/cart/context/useCart';
import { useAuth } from '@/modules/auth/context/useAuth';
import {
  IconLogo,
  IconCart,
  IconOrders,
  IconStore,
  IconHome,
  IconSettings,
} from '@/shared/components/Icons/Icons';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  const pathname = usePathname();
  const { state: cartState } = useCart();
  const { user } = useAuth();

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: IconHome },
    { href: '/products', label: 'المتجر والمنتجات', icon: IconStore },
    { href: '/orders', label: 'طلباتي', icon: IconOrders },
    { href: '/cart', label: 'السلة', icon: IconCart },
    { href: '/settings', label: 'الإعدادات', icon: IconSettings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-[var(--washi-ivory)]/90 border-[var(--bamboo-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] rounded-md"
          aria-label="ShopBoard - العودة للرئيسية"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs">
            <IconLogo size={22} />
          </span>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              ShopBoard
            </span>
            <span className="text-[10px] text-[var(--muted-umeboshi)] -mt-1 font-[family-name:var(--font-ibm-plex)]">
              أتيليه أكاري للأثاث المكتبي
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="التنقل الأساسي">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[var(--bamboo-tan)]/30 text-[var(--charcoal-deep)] font-semibold border border-[var(--bamboo-border)]'
                    : 'text-[var(--charcoal-ink)]/80 hover:bg-black/5 hover:text-[var(--charcoal-deep)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Orders Link */}
          <Link
            href="/orders"
            className={`inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[var(--bamboo-border)] transition-colors ${
              pathname.startsWith('/orders')
                ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)]'
                : 'bg-[var(--washi-cream)] text-[var(--charcoal-ink)] hover:bg-black/5'
            }`}
            aria-label="سجل الطلبات"
          >
            <IconOrders size={17} />
            <span className="hidden sm:inline">طلباتي</span>
          </Link>

          {/* Settings Link */}
          <Link
            href="/settings"
            className={`inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[var(--bamboo-border)] transition-colors ${
              pathname.startsWith('/settings')
                ? 'bg-[var(--charcoal-ink)] text-[var(--washi-ivory)]'
                : 'bg-[var(--washi-cream)] text-[var(--charcoal-ink)] hover:bg-black/5'
            }`}
            aria-label="الإعدادات وتفضيلات الحساب"
          >
            <IconSettings size={17} />
            <span className="hidden sm:inline">الإعدادات</span>
          </Link>

          {/* Auth Link */}
          <Link
            href={user ? '/settings' : '/auth'}
            className="inline-flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-[var(--bamboo-border)] bg-[var(--washi-cream)] text-[var(--charcoal-ink)] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label={user ? `حساب ${user.name}` : 'تسجيل الدخول'}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--bamboo-green)]" aria-hidden="true" />
            <span className="max-w-[100px] truncate">{user ? user.name : 'دخول'}</span>
          </Link>

          {/* Cart Link */}
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] text-sm font-semibold hover:bg-[var(--charcoal-deep)] transition-all shadow-xs cursor-pointer"
            aria-label={`عربة التسوق، تحتوي على ${cartState.count} منتجات بقيمة ${cartState.total} ر.س`}
          >
            <IconCart size={18} />
            <span className="hidden sm:inline">السلة</span>
            <span
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full text-xs font-bold bg-[var(--vermilion-seal)] text-white"
              aria-hidden="true"
            >
              {cartState.count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
