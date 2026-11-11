'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/modules/cart/context/useCart';
import {
  IconLogo,
  IconCart,
  IconStore,
  IconHome,
} from '@/shared/components/Icons/Icons';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  const pathname = usePathname();
  const { state: cartState } = useCart();

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: IconHome },
    { href: '/products', label: 'المتجر والمنتجات', icon: IconStore },
    { href: '/cart', label: 'السلة', icon: IconCart },
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

          {/* Cart Link */}
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] text-xs sm:text-sm font-semibold hover:bg-[var(--charcoal-deep)] transition-all shadow-xs cursor-pointer shrink-0"
            aria-label={`عربة التسوق، تحتوي على ${cartState.count} منتجات بقيمة ${cartState.total} ر.س`}
          >
            <IconCart size={17} />
            <span className="hidden sm:inline">السلة</span>
            <span
              className="inline-flex items-center justify-center min-w-[18px] h-4 sm:min-w-[20px] sm:h-5 px-1 rounded-full text-[10px] sm:text-xs font-bold bg-[var(--accent-coral)] text-white"
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
