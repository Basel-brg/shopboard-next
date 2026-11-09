'use client';

import React from 'react';
import { useAuth } from '@/modules/auth/context/useAuth';
import { useCart } from '@/modules/cart/context/useCart';
import { useProducts } from '@/modules/products/context/useProducts';

import { ProductsHero } from '@/modules/products/components/ProductsHero';
import { ProductsContainer } from '@/modules/products/components/ProductsContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export function ShopBoardApp() {
  const { user } = useAuth();
  const { state: cartState, addItem } = useCart();
  const { setCategory } = useProducts();

  return (
    <div id="app">
      {/* First Viewport: Comp-1 Atelier Rail & Hero Stage */}
      <ProductsHero
        onOpenDeskStudio={() => {}}
        onOpenOrders={() => {}}
        onOpenAuth={() => {}}
        onToggleCart={() => {}}
        cartCount={cartState.count}
        cartTotal={cartState.total}
        userName={user?.name}
        onAddToCart={addItem}
      />

      {/* Main Products Workshop Catalog */}
      <ProductsContainer />

      {/* Store Footer */}
      <Footer onSelectCategory={setCategory} />
    </div>
  );
}
