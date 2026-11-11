'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Heart, Plus, Check } from 'lucide-react';
import type { Product } from '../products.types';
import { getDiscountPercent } from '../products.logic';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const discountPct = getDiscountPercent(product.price, product.originalPrice);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <article
      className="group relative flex flex-col rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-lg transition-all duration-200"
      data-id={product.id}
    >
      {/* Product Media Area */}
      <div className="relative w-full aspect-square bg-[#fbf9f5] dark:bg-[#25221e] overflow-hidden flex items-center justify-center p-3 sm:p-4">
        <Link href={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width="320"
            height="320"
          />
        </Link>

        {/* Floating Discount Badge (Top Right in RTL) */}
        {discountPct > 0 ? (
          <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-[var(--accent-coral)] text-white text-[11px] font-bold shadow-xs">
            خصم {discountPct}%-
          </span>
        ) : product.tag ? (
          <span className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 rounded-full bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] text-[11px] font-semibold">
            {product.tag}
          </span>
        ) : null}

        {/* Floating Wishlist Heart Button (Top Left in RTL) */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={isWishlisted ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
          className={`absolute top-2.5 left-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-colors shadow-xs cursor-pointer ${
            isWishlisted
              ? 'bg-[var(--accent-coral)] text-white'
              : 'bg-white/90 dark:bg-black/60 text-[var(--muted-foreground)] hover:text-[var(--accent-coral)]'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* API Badge indicator */}
        {product.isFromApi && (
          <div className="absolute bottom-2 right-2.5 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] backdrop-blur-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>API</span>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between gap-2.5">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <strong className="text-[var(--foreground)] font-semibold">{product.rating}</strong>
            <span className="text-[11px]">({product.reviewsCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm sm:text-base font-bold font-readex text-[var(--foreground)] line-clamp-1 group-hover:text-[var(--accent-coral)] transition-colors">
            <Link href={`/products/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
            {product.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-1 border-t border-[var(--border)]/60">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <strong className="text-base sm:text-lg font-extrabold font-readex text-[var(--foreground)]">
                {product.price}
              </strong>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">ر.س</span>
            </div>
            {product.originalPrice && product.originalPrice > product.price && (
              <s className="text-xs text-[var(--muted-foreground)] line-through -mt-0.5">
                {product.originalPrice} ر.س
              </s>
            )}
          </div>

          {/* Add to Cart Circular Action Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            data-add-id={product.id}
            aria-label={`أضف ${product.name} إلى السلة`}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[var(--accent-coral)] hover:bg-[#d95232] text-white hover:scale-105'
            }`}
          >
            {justAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" strokeWidth={2.4} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
