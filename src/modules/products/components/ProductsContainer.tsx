'use client';
import React from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Package,
  Search,
  FlaskConical,
  CheckCircle2,
  Clock,
  XCircle,
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
    activeTestState,
    setCategory,
    setSearchQuery,
    setMaxPrice,
    setSortBy,
    setTestState,
    openQuickView,
    fetchApiProducts,
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
        <header className="catalog-header">
          <div>
            <h2 id="catalog-title">كتالوج معدات المكتب الاحترافية</h2>
            <p className="catalog-subtitle">قطع هندسية مختارة بعناية لبيئة عمل هادئة ومنظمة</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              type="button"
              id="btn-fetch-api"
              className="btn btn-secondary"
              style={{
                fontSize: '0.82rem',
                padding: '0.4rem 0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
              onClick={fetchApiProducts}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>سحب منتجات الـ API</span>
            </button>
            <p id="products-count" className="products-count" aria-live="polite">
              {countText}
            </p>
          </div>
        </header>

        {/* 4 UI States Interactive Test Toolbar */}
        <div className="state-test-toolbar" role="group" aria-label="اختبار حالات الواجهة الأربعة">
          <span className="state-test-title inline-flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
            <span>اختبار الحالات (4 States):</span>
          </span>
          <button
            type="button"
            className={`state-pill-btn inline-flex items-center gap-1.5 ${activeTestState === 'success' ? 'is-active' : ''}`}
            data-test-state="success"
            title="جلب طبيعي ناجح للبيانات"
            onClick={() => setTestState('success')}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>نجاح (Success)</span>
          </button>
          <button
            type="button"
            className={`state-pill-btn inline-flex items-center gap-1.5 ${activeTestState === 'loading' ? 'is-active' : ''}`}
            data-test-state="loading"
            title="تأخير 3 ثوان لرؤية السكيلتون"
            onClick={() => setTestState('loading')}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>تحميل مؤقت (Loading)</span>
          </button>
          <button
            type="button"
            className={`state-pill-btn inline-flex items-center gap-1.5 ${activeTestState === 'error' ? 'is-active' : ''}`}
            data-test-state="error"
            title="محاكاة خطأ 500 مع زر إعادة المحاولة"
            onClick={() => setTestState('error')}
          >
            <XCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>خطأ 500 (Error + Try Again)</span>
          </button>
          <button
            type="button"
            className={`state-pill-btn inline-flex items-center gap-1.5 ${activeTestState === 'empty-products' ? 'is-active' : ''}`}
            data-test-state="empty-products"
            title="خادم بدون منتجات مسجلة"
            onClick={() => setTestState('empty-products')}
          >
            <Package className="w-3.5 h-3.5" />
            <span>فارغ: خادم (Empty: No Products)</span>
          </button>
          <button
            type="button"
            className={`state-pill-btn inline-flex items-center gap-1.5 ${activeTestState === 'empty-match' ? 'is-active' : ''}`}
            data-test-state="empty-match"
            title="بحث بدون نتائج مطابقة"
            onClick={() => setTestState('empty-match')}
          >
            <Search className="w-3.5 h-3.5" />
            <span>فارغ: بحث (Empty: No Match)</span>
          </button>
        </div>

        {renderContent()}
      </section>
    </main>
  );
};
