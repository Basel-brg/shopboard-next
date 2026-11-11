'use client';

import React from 'react';
import type { CategoryType, SortOption, Product } from '../products.types';
import { CATEGORIES } from '../products.api';
import { IconSearch } from '../../../shared/components/Icons/Icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductsFilterBarProps {
  categories: readonly CategoryType[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  maxPrice: number;
  onPriceChange: (price: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  allProducts: Product[];
}

export function isSortOption(value: string): value is SortOption {
  return (
    value === 'default' || value === 'price-asc' || value === 'price-desc' || value === 'rating'
  );
}

export const ProductsFilterBar: React.FC<ProductsFilterBarProps> = ({
  categories = CATEGORIES,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  maxPrice,
  onPriceChange,
  sortBy,
  onSortChange,
  allProducts,
}) => {
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <section className="mb-8 p-4 sm:p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col gap-5" aria-label="خيارات البحث والتصفية والفرز">
      {/* Top Search & Categories Row */}
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <form
          className="w-full max-w-xl mx-auto"
          id="search-form"
          role="search"
          onSubmit={handleSearchSubmit}
          noValidate
        >
          <div className="relative flex items-center w-full">
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]">
              <IconSearch size={18} />
            </span>
            <Input
              type="search"
              id="search-input"
              name="q"
              aria-label="البحث عن معدات المكتب"
              placeholder="ابحث عن لوحة مفاتيح، سماعة استوديو، حقيبة، ماوس..."
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pr-10 pl-20 h-11 bg-[var(--background)] border border-[var(--border)] rounded-full text-sm focus-visible:ring-[var(--accent-coral)]"
            />
            <Button
              type="submit"
              size="sm"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 h-8 bg-[var(--accent-coral)] hover:bg-[#d95232] text-white px-4 text-xs font-semibold rounded-full shadow-xs cursor-pointer"
              aria-label="تنفيذ البحث"
            >
              بحث
            </Button>
          </div>
        </form>

        {/* Categories Rail */}
        <nav className="flex flex-wrap items-center justify-center gap-2 pt-1" aria-label="تصنيفات معدات المكتب" id="categories-nav">
          {categories.map((cat) => {
            const count =
              cat === 'الكل'
                ? allProducts.length
                : allProducts.filter((p) => p.category === cat).length;
            const isActive = selectedCategory === cat;

            return (
              <Button
                key={cat}
                type="button"
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                className={`h-9 px-3.5 gap-2 rounded-full cursor-pointer font-medium text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-[var(--accent-coral)] text-white hover:bg-[#d95232] shadow-xs border-transparent'
                    : 'bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]'
                }`}
                data-category={cat}
                aria-pressed={isActive}
                onClick={() => onSelectCategory(cat)}
              >
                <span>{cat}</span>
                <Badge
                  variant="secondary"
                  className={`h-5 min-w-5 px-1.5 text-[10px] font-mono rounded-full ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-black/5 dark:bg-white/10 text-[var(--muted-foreground)]'
                  }`}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Filter Controls (Price Slider & Sorter) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
        {/* Price Slider */}
        <div className="flex items-center gap-3">
          <label htmlFor="price-range-input" className="text-xs font-semibold text-[var(--foreground)] whitespace-nowrap">
            الحد الأقصى للسعر: <strong id="price-range-output" className="font-mono text-[var(--accent-coral)]">{maxPrice} ر.س</strong>
          </label>
          <input
            type="range"
            id="price-range-input"
            name="maxPrice"
            aria-label="الحد الأقصى للسعر"
            aria-valuemin={50}
            aria-valuemax={6000}
            aria-valuenow={maxPrice}
            aria-valuetext={`${maxPrice} ريال سعودي`}
            min="50"
            max="6000"
            step="50"
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="accent-[var(--accent-coral)] cursor-pointer h-1.5 w-32 sm:w-44 bg-[var(--border)] rounded-lg appearance-none"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-semibold text-[var(--foreground)] whitespace-nowrap">
            ترتيب حسب:
          </label>
          <select
            id="sort-select"
            name="sort"
            aria-label="ترتيب المنتجات"
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value;
              if (isSortOption(val)) {
                onSortChange(val);
              }
            }}
            className="h-9 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 text-xs font-medium text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-coral)] cursor-pointer"
          >
            <option value="default">الافتراضي (ترتيب الكتالوج)</option>
            <option value="price-asc">السعر: الأقل أولاً</option>
            <option value="price-desc">السعر: الأعلى أولاً</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
        </div>
      </div>
    </section>
  );
};
