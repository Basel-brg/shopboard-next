'use client';

import React, { useState } from 'react';
import type { Product } from '../products.types';
import { useCart } from '@/modules/cart/context/useCart';
import { IconCart, IconPlus, IconMinus } from '@/shared/components/Icons/Icons';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t border-[var(--bamboo-border)]">
      {/* Quantity & Add to Cart Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Quantity selector */}
        <div className="flex items-center justify-between sm:justify-center border border-[var(--bamboo-border)] rounded-lg bg-[var(--washi-cream)] px-2 py-1.5 h-12">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-1.5 rounded hover:bg-black/5 text-[var(--charcoal-ink)] transition-colors cursor-pointer"
            aria-label="إنقاص الكمية"
          >
            <IconMinus size={16} />
          </button>
          <span className="w-12 text-center font-bold text-sm font-mono text-[var(--charcoal-ink)]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="p-1.5 rounded hover:bg-black/5 text-[var(--charcoal-ink)] transition-colors cursor-pointer"
            aria-label="زيادة الكمية"
          >
            <IconPlus size={16} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-lg bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] font-semibold text-sm hover:bg-[var(--charcoal-deep)] transition-all shadow-sm cursor-pointer"
        >
          <IconCart size={18} />
          <span>إضافة {quantity > 1 ? `(${quantity})` : ''} إلى السلة</span>
        </button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[var(--muted-umeboshi)] font-[family-name:var(--font-ibm-plex)]">
        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--bamboo-border)] bg-[var(--washi-cream)]/50">
          <span className="h-2 w-2 rounded-full bg-[var(--bamboo-green)]" aria-hidden="true" />
          <span>شحن سريع ومجاني للطلبات فوق 300 ر.س</span>
        </div>
        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[var(--bamboo-border)] bg-[var(--washi-cream)]/50">
          <span className="h-2 w-2 rounded-full bg-[var(--bamboo-tan)]" aria-hidden="true" />
          <span>{product.warranty || 'ضمان سنتين شامل للأتيليه'}</span>
        </div>
      </div>
    </div>
  );
}
