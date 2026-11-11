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
    <section className="controls-panel" aria-label="خيارات البحث والتصفية والفرز">
      <div className="controls-top-row">
        <form
          className="search-form"
          id="search-form"
          role="search"
          onSubmit={handleSearchSubmit}
          noValidate
        >
          <div className="form-field search-field-wrap">
            <label htmlFor="search-input" className="sr-only">
              البحث عن معدات المكتب
            </label>
            <div className="search-box relative flex items-center">
              <span className="search-icon absolute right-3 pointer-events-none text-[var(--muted-umeboshi)]">
                <IconSearch size={18} />
              </span>
              <Input
                type="search"
                id="search-input"
                name="q"
                aria-label="البحث عن معدات المكتب"
                placeholder="ابحث عن لوحة مفاتيح، سماعة استوديو، مصباح نحاسي..."
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pr-10 pl-20 h-11 bg-white dark:bg-[#1f1d1a] border border-[var(--border)] rounded-full focus-visible:ring-[var(--accent-coral)]"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute left-1.5 h-8 bg-[var(--accent-coral)] hover:bg-[#d95232] text-white px-3.5 text-xs rounded-full shadow-xs"
                aria-label="تنفيذ البحث"
              >
                بحث
              </Button>
            </div>
          </div>
        </form>

        <nav className="categories-nav flex flex-wrap gap-2" aria-label="تصنيفات معدات المكتب" id="categories-nav">
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
                className={`h-9 px-3.5 gap-2 rounded-full cursor-pointer font-medium transition-all ${
                  isActive
                    ? 'bg-[var(--accent-coral)] text-white hover:bg-[#d95232] shadow-xs'
                    : 'bg-white dark:bg-[#1f1d1a] border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--secondary)]'
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

      <form
        className="filters-row flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--bamboo-border)]"
        id="filters-form"
        noValidate
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form-field price-filter-field flex items-center gap-3">
          <label htmlFor="price-range-input" className="filter-label text-xs font-semibold text-[var(--charcoal-ink)] whitespace-nowrap">
            الحد الأقصى للسعر: <strong id="price-range-output" className="font-mono text-[var(--charcoal-ink)]">{maxPrice} ر.س</strong>
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
            className="accent-[var(--charcoal-ink)] cursor-pointer h-1.5 w-32 sm:w-44 bg-[var(--bamboo-border)] rounded-lg appearance-none"
          />
        </div>

        <div className="form-field sort-filter-field flex items-center gap-2">
          <label htmlFor="sort-select" className="filter-label text-xs font-semibold text-[var(--charcoal-ink)] whitespace-nowrap">
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
            className="h-9 rounded-md border border-[var(--bamboo-border)] bg-white px-3 text-xs text-[var(--charcoal-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--charcoal-ink)] cursor-pointer"
          >
            <option value="default">الافتراضي (ترتيب الكتالوج)</option>
            <option value="price-asc">السعر: الأقل أولاً</option>
            <option value="price-desc">السعر: الأعلى أولاً</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
        </div>
      </form>
    </section>
  );
};
