'use client';
import React from 'react';
import type { Product } from '../products.types';
import { ProductCard } from './ProductCard';

interface ProductsListProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  return (
    <div
      id="products-grid"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
      role="region"
      aria-live="polite"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
