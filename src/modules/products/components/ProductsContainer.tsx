'use client';
import React from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Package,
  Search,
} from 'lucide-react';
import { useProducts } from '../context/useProducts';
import { useCart } from '../../cart/context/useCart';
import { ProductsFilterBar } from './ProductsFilterBar';
import { ProductsList } from './ProductsList';
import { ProductsSkeleton } from './ProductsSkeleton';
import { CATEGORIES } from '../products.api';

export const ProductsContainer: React.FC = () => {
  const {
    allProducts,
    filteredProducts,
    filters,
    loadState,
    setCategory,
    setSearchQuery,
    setMaxPrice,
    setSortBy,
    openQuickView,
    resetToDefault,
  } = useProducts();

  const { addItem } = useCart();

  const renderContent = () => {
    switch (loadState.status) {
      case 'idle':
      case 'loading':
        return <ProductsSkeleton />;

      case 'error':
        return (
          <div className="state-feedback-card state-error" role="alert">
            <div className="state-icon flex justify-center text-rose-500">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h3 className="state-title">فشل في الاتصال بالخادم</h3>
            <p className="state-desc">{loadState.message}</p>
            <button
              type="button"
              className="btn btn-primary inline-flex items-center gap-2 justify-center"
              id="retry-btn"
              onClick={resetToDefault}
            >
              <RefreshCw className="w-4 h-4" />
              <span>إعادة المحاولة (Try Again)</span>
            </button>
          </div>
        );

      case 'empty':
        if (loadState.reason === 'no-products') {
          return (
            <div className="state-feedback-card state-empty">
              <div className="state-icon flex justify-center text-[var(--muted-foreground)]">
                <Package className="w-10 h-10" />
              </div>
              <h3 className="state-title">لا توجد منتجات في المتجر حالياً</h3>
              <p className="state-desc">لم يرجع الخادم أي عناصر مسجلة في قاعدة البيانات.</p>
              <button
                type="button"
                className="btn btn-secondary inline-flex items-center gap-2 justify-center"
                id="retry-btn"
                onClick={resetToDefault}
              >
                <RefreshCw className="w-4 h-4" />
                <span>تحديث من الخادم (Try Again)</span>
              </button>
            </div>
          );
        } else {
          return (
            <div className="state-feedback-card state-empty">
              <div className="state-icon flex justify-center text-[var(--muted-foreground)]">
                <Search className="w-10 h-10" />
              </div>
              <h3 className="state-title">لا توجد منتجات مطابقة لمعايير البحث</h3>
              <p className="state-desc">جرّب توسيع الحد الأقصى للسعر أو اختيار تصنيف آخر.</p>
              <button
                type="button"
                className="btn btn-primary"
                id="reset-filters"
                onClick={resetToDefault}
              >
                إعادة ضبط جميع الفلاتر
              </button>
            </div>
          );
        }

      case 'success':
      default:
        return (
          <ProductsList
            products={filteredProducts}
            onQuickView={openQuickView}
            onAddToCart={addItem}
          />
        );
    }
  };

  const countText =
    loadState.status === 'loading'
      ? 'جاري التحميل...'
      : loadState.status === 'error'
        ? 'تعذر التحميل'
        : loadState.status === 'empty'
          ? '0 منتجات'
          : `عرض ${filteredProducts.length} من أصل ${allProducts.length} قطع مكتبية`;

  return (
    <main id="products-section" className="container store-main">
      <ProductsFilterBar
        categories={CATEGORIES}
        selectedCategory={filters.category}
        onSelectCategory={setCategory}
        searchQuery={filters.searchQuery}
        onSearchChange={setSearchQuery}
        maxPrice={filters.maxPrice}
        onPriceChange={setMaxPrice}
        sortBy={filters.sortBy}
        onSortChange={setSortBy}
        allProducts={allProducts}
      />

      <section className="catalog-section" aria-labelledby="catalog-title">
        <header className="catalog-header flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
          <div>
            <h2 id="catalog-title" className="text-xl sm:text-2xl font-bold font-readex text-[var(--foreground)]">
              كتالوج المنتجات
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">قطع هندسية مختارة بعناية لبيئة عمل هادئة ومنظمة</p>
          </div>
          <div>
            <p id="products-count" className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)]" aria-live="polite">
              {countText}
            </p>
          </div>
        </header>

        {renderContent()}
      </section>
    </main>
  );
};
