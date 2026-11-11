'use client';

import React from 'react';
import { ToastProvider } from '@/shared/components/Toast/ToastContext';
import { CartProvider } from '@/modules/cart/context/CartContext';
import { ProductsProvider } from '@/modules/products/context/ProductsContext';
import { GlobalModals } from './layout/GlobalModals';
import { MobileBottomNav } from './layout/MobileBottomNav';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <ProductsProvider>
          <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
            {children}
          </div>
          <MobileBottomNav />
          <GlobalModals />
        </ProductsProvider>
      </CartProvider>
    </ToastProvider>
  );
}
