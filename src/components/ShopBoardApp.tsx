'use client';

import React from 'react';
import { useProducts } from '@/modules/products/context/useProducts';
import { Header } from '@/components/layout/Header';
import { ModernHeroBanner } from '@/components/home/ModernHeroBanner';
import { CategoryIconsRail } from '@/components/home/CategoryIconsRail';
import { HomeSetupsSection } from '@/components/home/HomeSetupsSection';
import { HomeGiftGuidePromo } from '@/components/home/HomeGiftGuidePromo';
import { HomeFeaturedProducts } from '@/components/home/HomeFeaturedProducts';
import { Footer } from '@/shared/components/Footer/Footer';

export function ShopBoardApp() {
  const { setCategory } = useProducts();

  return (
    <div id="app" className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Experience Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-12">
        {/* StyleNest-Inspired Hero Stage Banner */}
        <ModernHeroBanner />

        {/* Quick Category Icons Rail */}
        <CategoryIconsRail />

        {/* Option 2 Core: Curated Desk Setups (Shop The Look) */}
        <HomeSetupsSection />

        {/* Gift Guide Banner */}
        <HomeGiftGuidePromo />

        {/* Best Sellers / Essentials */}
        <HomeFeaturedProducts />
      </main>

      {/* Store Footer */}
      <Footer onSelectCategory={setCategory} />
    </div>
  );
}
