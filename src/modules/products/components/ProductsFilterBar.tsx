'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  X,
} from 'lucide-react';
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
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const hasActivePriceFilter = maxPrice < 6000;
  const hasActiveSortFilter = sortBy !== 'default';
  const activeAdvancedCount = (hasActivePriceFilter ? 1 : 0) + (hasActiveSortFilter ? 1 : 0);

  const getSortLabel = (sort: SortOption) => {
    switch (sort) {
      case 'price-asc':
        return 'الأقل سعراً';
      case 'price-desc':
        return 'الأعلى سعراً';
      case 'rating':
        return 'الأعلى تقييماً';
      default:
        return 'الافتراضي';
    }
  };

  return (
    <section
      className="mb-6 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs flex flex-col gap-3.5 transition-all"
      aria-label="خيارات البحث والتصفية والفرز"
    >
      {/* 1. Top Bar: Search Input & Collapsible Filter Toggle Button */}
      <div className="flex items-center gap-2 w-full">
        <form
          className="flex-1 relative flex items-center"
          id="search-form"
          role="search"
          onSubmit={handleSearchSubmit}
          noValidate
        >
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--muted-foreground)]">
            <IconSearch size={18} />
          </span>
          <Input
            type="search"
            id="search-input"
            name="q"
            aria-label="البحث عن معدات المكتب"
            placeholder="ابحث عن لوحة مفاتيح، سماعة استوديو، حقيبة..."
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pr-10 pl-16 h-10 sm:h-11 bg-[var(--background)] border border-[var(--border)] rounded-2xl text-xs sm:text-sm focus-visible:ring-[var(--accent-coral)]"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 cursor-pointer"
              aria-label="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Button
              type="submit"
              size="sm"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 sm:h-8 bg-[var(--accent-coral)] hover:bg-[#d95232] text-white px-3 text-xs font-semibold rounded-xl shadow-xs cursor-pointer"
              aria-label="تنفيذ البحث"
            >
              بحث
            </Button>
          )}
        </form>

        {/* Collapsible Trigger: Advanced Filters Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`h-10 sm:h-11 px-3 sm:px-4 rounded-2xl gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm shrink-0 border transition-all cursor-pointer ${
            isExpanded || activeAdvancedCount > 0
              ? 'border-[var(--accent-coral)] bg-[var(--accent-coral)]/10 text-[var(--accent-coral)] font-semibold'
              : 'border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--secondary)]'
          }`}
          aria-expanded={isExpanded}
          aria-controls="collapsible-filters-panel"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">فلاتر إضافية</span>
          <span className="sm:hidden">فلترة</span>
          {activeAdvancedCount > 0 && (
            <span className="flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-[var(--accent-coral)] text-white text-[10px] font-bold">
              {activeAdvancedCount}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </Button>
      </div>

      {/* 2. Categories Rail: Horizontal scroll on mobile, wrapped row on desktop */}
      <nav
        className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        aria-label="تصنيفات معدات المكتب"
        id="categories-nav"
      >
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
              className={`h-8 sm:h-9 px-3 sm:px-3.5 gap-1.5 sm:gap-2 rounded-full cursor-pointer font-medium text-xs sm:text-sm shrink-0 transition-all ${
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
                className={`h-4.5 min-w-4.5 px-1.5 text-[10px] font-mono rounded-full ${
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

      {/* 3. Active Filters Quick Pills (Shown when collapsed so user is aware) */}
      {!isExpanded && (hasActivePriceFilter || hasActiveSortFilter) && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[var(--muted-foreground)] text-[11px] font-medium">الفلاتر المطبقة:</span>
          {hasActivePriceFilter && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent-coral)]/10 text-[var(--accent-coral)] font-medium border border-[var(--accent-coral)]/20 text-xs">
              السعر حتى {maxPrice} ر.س
              <button
                type="button"
                onClick={() => onPriceChange(6000)}
                className="hover:opacity-75 p-0.5 cursor-pointer"
                aria-label="إلغاء فلتر السعر"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {hasActiveSortFilter && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--accent-coral)]/10 text-[var(--accent-coral)] font-medium border border-[var(--accent-coral)]/20 text-xs">
              ترتيب: {getSortLabel(sortBy)}
              <button
                type="button"
                onClick={() => onSortChange('default')}
                className="hover:opacity-75 p-0.5 cursor-pointer"
                aria-label="إلغاء فلتر الترتيب"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              onPriceChange(6000);
              onSortChange('default');
            }}
            className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] underline cursor-pointer mr-1"
          >
            مسح الكل
          </button>
        </div>
      )}

      {/* 4. Collapsible Advanced Section: Price Slider & Sorter */}
      {isExpanded && (
        <div
          id="collapsible-filters-panel"
          className="pt-3.5 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 animate-in fade-in-50 duration-200"
        >
          {/* Price Slider Block */}
          <div className="flex flex-col gap-2 p-3 sm:p-4 rounded-2xl bg-[var(--background)]/60 border border-[var(--border)]/60">
            <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
              <span>الحد الأقصى للسعر:</span>
              <strong id="price-range-output" className="font-mono text-sm text-[var(--accent-coral)]">
                {maxPrice} ر.س
              </strong>
            </div>
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
              className="accent-[var(--accent-coral)] cursor-pointer h-2 w-full bg-[var(--border)] rounded-lg appearance-none mt-1"
            />
            <div className="flex justify-between text-[10px] text-[var(--muted-foreground)] font-mono">
              <span>50 ر.س</span>
              <span>6000 ر.س</span>
            </div>
          </div>

          {/* Sort Select Block */}
          <div className="flex flex-col justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-[var(--background)]/60 border border-[var(--border)]/60">
            <div className="flex items-center justify-between gap-2">
              <label htmlFor="sort-select" className="text-xs font-semibold text-[var(--foreground)] whitespace-nowrap">
                ترتيب المنتجات:
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
                className="h-9 rounded-xl border border-[var(--border)] bg-[var(--card)] px-3 text-xs font-medium text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--accent-coral)] cursor-pointer"
              >
                <option value="default">الافتراضي (ترتيب الكتالوج)</option>
                <option value="price-asc">السعر: الأقل أولاً</option>
                <option value="price-desc">السعر: الأعلى أولاً</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>
            </div>

            {/* Quick Reset if filters modified */}
            {(hasActivePriceFilter || hasActiveSortFilter) && (
              <div className="flex justify-end pt-2 border-t border-[var(--border)]/40">
                <button
                  type="button"
                  onClick={() => {
                    onPriceChange(6000);
                    onSortChange('default');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-coral)] hover:underline font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة ضبط السعر والترتيب</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
