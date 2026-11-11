'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/modules/products/products.api';
import { ProductCard } from '@/modules/products/components/ProductCard';
import { useCart } from '@/modules/cart/context/useCart';
import { useToast } from '@/shared/components/Toast/ToastContext';
import type { Product } from '@/modules/products/products.types';

export function HomeFeaturedProducts() {
  const { addItem } = useCart();
  const { showToast } = useToast();

  // Curated 4 featured top-tier products
  const featured = PRODUCTS.slice(0, 4);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    showToast(`تمت إضافة "${product.name}" إلى السلة`);
  };

  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-coral)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>القطع الأكثر طلباً وتقييماً</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-readex text-[var(--foreground)]">
            أساسيات سطح المكتب
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            قطع فردية يمكنك اقتناؤها أو إضافتها لبيئة عملك الحالية.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--accent-coral)] hover:underline shrink-0"
        >
          <span>تصفح كامل الكتالوج (12 منتجاً)</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of 4 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
