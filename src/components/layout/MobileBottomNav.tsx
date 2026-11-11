'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, ShoppingBag } from 'lucide-react';
import { useCart } from '@/modules/cart/context/useCart';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { state: cartState } = useCart();

  const tabs = [
    {
      href: '/',
      label: 'الرئيسية',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      href: '/products',
      label: 'التصنيفات',
      icon: Grid3X3,
      isActive: pathname.startsWith('/products'),
    },
    {
      href: '/cart',
      label: 'السلة',
      icon: ShoppingBag,
      isActive: pathname.startsWith('/cart'),
      badge: cartState.count > 0 ? cartState.count : undefined,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white/95 dark:bg-[#1a1917]/95 backdrop-blur-md border-t border-[var(--border)] lg:hidden flex items-center justify-around px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="شريط التنقل السفلي للهواتف"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
              tab.isActive
                ? 'text-[var(--accent-coral)] font-semibold'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
            aria-current={tab.isActive ? 'page' : undefined}
          >
            <div className="relative">
              <Icon className="w-5 h-5 transition-transform duration-200" strokeWidth={tab.isActive ? 2.4 : 1.8} />
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[var(--accent-coral)] text-white text-[10px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-1 font-medium font-readex">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

