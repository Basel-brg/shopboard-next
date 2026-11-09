'use client';

import React from 'react';
import { ToastProvider } from '@/shared/components/Toast/ToastContext';
import { AuthProvider } from '@/modules/auth/context/AuthContext';
import { CartProvider } from '@/modules/cart/context/CartContext';
import { ProductsProvider } from '@/modules/products/context/ProductsContext';
import { OrdersProvider } from '@/modules/orders/context/OrdersContext';
import { SettingsProvider } from '@/modules/settings/context/SettingsContext';
import { GlobalModals } from './layout/GlobalModals';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <SettingsProvider>
          <CartProvider>
            <ProductsProvider>
              <OrdersProvider>
                {children}
                <GlobalModals />
              </OrdersProvider>
            </ProductsProvider>
          </CartProvider>
        </SettingsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
