'use client';

import React from 'react';
import { useProducts } from '@/modules/products/context/useProducts';
import { Header } from '@/components/layout/Header';
import { ModernHeroBanner } from '@/components/home/ModernHeroBanner';
import { CategoryIconsRail } from '@/components/home/CategoryIconsRail';
import { PopularCollections } from '@/components/home/PopularCollections';
import { ProductsContainer } from '@/modules/products/components/ProductsContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export function ShopBoardApp() {
  const { setCategory } = useProducts();

  return (
    <div id="app" className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Experience Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* StyleNest-Inspired Hero Stage Banner */}
        <ModernHeroBanner />

        {/* Quick Category Icons Rail */}
        <CategoryIconsRail />

        {/* Popular Collections (2-Column) */}
        <PopularCollections />

        {/* Catalog Section with 4-State UI & Filter Controls */}
        <ProductsContainer />
      </div>

      {/* Store Footer */}
      <Footer onSelectCategory={setCategory} />
    </div>
  );
}
