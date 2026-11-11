'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/modules/cart/context/useCart';
import { Layers, Gift, ShoppingBag, Sparkles } from 'lucide-react';
import {
  IconStore,
  IconHome,
} from '@/shared/components/Icons/Icons';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BrandLogo } from '@/components/ui/BrandLogo';

export function Header() {
  const pathname = usePathname();
  const { state: cartState } = useCart();

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: IconHome },
    { href: '/setups', label: 'بيئات العمل', icon: Layers, badge: 'وفر 15%' },
    { href: '/products', label: 'المنتجات', icon: IconStore },
    { href: '/gift-guide', label: 'دليل الهدايا', icon: Gift },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl bg-[var(--background)]/85 border-[var(--border)] transition-colors duration-200 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.04)]">
      {/* Top Micro Banner */}
      <div className="hidden sm:block border-b border-[var(--border)]/60 bg-[var(--card)]/50 text-[11px] text-[var(--muted-foreground)] py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>شحن مجاني لكافة طلبات المملكة التي تتجاوز 300 ر.س</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[var(--accent-coral)] font-semibold">
              <Sparkles className="w-3 h-3" />
              <span>كود خصم 10% للطلب الأول: WELCOME10</span>
            </span>
            <span className="text-[var(--border)]">|</span>
            <span>ضمان استبدال ذهبي سنتين</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <BrandLogo asLink size="md" />

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[var(--card)]/60 p-1.5 rounded-full border border-[var(--border)] shadow-xs" aria-label="التنقل الأساسي">
          {navLinks.map((item) => {
            const isActive =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-coral)] text-white font-bold shadow-xs'
                    : 'text-[var(--foreground)]/80 hover:text-[var(--foreground)] hover:bg-[var(--accent)]/15'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={15} />
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--accent)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/30">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark / Light Mode Toggle */}
          <ThemeToggle />

          {/* Cart Link */}
          <Link
            href="/cart"
            className="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-all shadow-xs cursor-pointer shrink-0"
            aria-label={`السلة، تحتوي على ${cartState.count} منتجات بقيمة ${cartState.total} ر.س`}
          >
            <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline font-sans">السلة</span>
            {cartState.count > 0 ? (
              <span
                className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[11px] font-bold bg-[var(--accent-coral)] text-white shadow-xs"
                aria-hidden="true"
              >
                {cartState.count}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
