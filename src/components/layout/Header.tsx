'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/modules/cart/context/useCart';
import { Layers, Gift } from 'lucide-react';
import {
  IconCart,
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
    { href: '/setups', label: 'بيئات العمل', icon: Layers },
    { href: '/products', label: 'المنتجات', icon: IconStore },
    { href: '/gift-guide', label: 'دليل الهدايا', icon: Gift },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md bg-[var(--washi-ivory)]/90 border-[var(--bamboo-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <BrandLogo asLink size="md" />

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
            aria-label={`السلة، تحتوي على ${cartState.count} منتجات بقيمة ${cartState.total} ر.س`}
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
