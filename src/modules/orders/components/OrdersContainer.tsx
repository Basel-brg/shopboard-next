'use client';

import React from 'react';
import Link from 'next/link';
import { useOrders } from '../context/useOrders';
import { OrderCard } from './OrderCard';
import { OrderDetailsModal } from './OrderDetailsModal';
import { IconOrders, IconSearch } from '../../../shared/components/Icons/Icons';
import type { OrderStatus } from '../orders.types';

type FilterStatus = 'all' | OrderStatus;

function isFilterStatus(value: string): value is FilterStatus {
  return (
    value === 'all' ||
    value === 'pending' ||
    value === 'processing' ||
    value === 'shipped' ||
    value === 'delivered' ||
    value === 'cancelled'
  );
}

export const OrdersContainer: React.FC = () => {
  const {
    filteredOrders,
    loadState,
    filters,
    summary,
    selectedOrder,
    openOrderDetails,
    closeOrderDetails,
    setStatusFilter,
    setSearchQuery,
    updateOrderStatus,
    setTestState,
  } = useOrders();

  const handleCancelOrder = (orderId: string) => {
    const ok = window.confirm('هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟');
    if (ok) {
      updateOrderStatus(orderId, 'cancelled');
    }
  };

  const renderContent = () => {
    switch (loadState.status) {
      case 'idle':
      case 'loading':
        return (
          <div className="orders-skeleton-list" aria-busy="true" aria-label="جاري تحميل الطلبات">
            {[1, 2, 3].map((n) => (
              <div key={n} className="order-card-skeleton shimmer">
                <div className="skeleton-header">
                  <div className="skeleton-pill shimmer" style={{ width: '110px', height: '26px' }} />
                  <div className="skeleton-pill shimmer" style={{ width: '80px', height: '26px' }} />
                </div>
                <div className="skeleton-body">
                  <div className="skeleton-line shimmer" style={{ width: '60%', height: '18px', marginBottom: '8px' }} />
                  <div className="skeleton-line shimmer" style={{ width: '40%', height: '14px' }} />
                </div>
                <div className="skeleton-footer">
                  <div className="skeleton-pill shimmer" style={{ width: '100px', height: '24px' }} />
                  <div className="skeleton-pill shimmer" style={{ width: '120px', height: '36px' }} />
                </div>
              </div>
            ))}
          </div>
        );

      case 'error':
        return (
          <div className="state-feedback-card state-error" role="alert">
            <div className="state-icon">⚠️</div>
            <h3 className="state-title">فشل في جلب سجل الطلبات</h3>
            <p className="state-desc">{loadState.message}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setTestState('live')}
            >
              إعادة المحاولة (Try Again)
            </button>
          </div>
        );

      case 'empty':
        if (loadState.reason === 'no-orders') {
          return (
            <div className="state-feedback-card state-empty">
              <div className="state-icon">📦</div>
              <h3 className="state-title">لا توجد طلبات سابقة حتى الآن</h3>
              <p className="state-desc">
                لم تقم بإتمام أي طلبات شراء بعد. اختر منتجاتك من المتجر وجهّز مكتبك الآن!
              </p>
              <Link href="/products" className="btn btn-primary">
                تصفح المنتجات وبدء التسوق
              </Link>
            </div>
          );
        }
        return (
          <div className="state-feedback-card state-empty-filter">
            <div className="state-icon">🔍</div>
            <h3 className="state-title">لا توجد طلبات مطابقة للبحث أو الفلتر</h3>
            <p className="state-desc">جرّب البحث برقم طلب آخر أو تغيير تصنيف حالة الطلب.</p>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              إعادة ضبط الفلاتر
            </button>
          </div>
        );

      case 'success':
      default:
        return (
          <div className="orders-list-grid">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={openOrderDetails}
                onCancelOrder={handleCancelOrder}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-xs">
              <IconOrders size={20} />
            </span>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
                سجل طلباتي
              </h1>
              <span className="count-badge">
                {filteredOrders.length} طلبات
              </span>
            </div>
          </div>
          <p className="text-sm text-[var(--muted-umeboshi)] font-[family-name:var(--font-ibm-plex)]">
            متابعة حالة الشحنات، أرقام التتبع، ومراجعة تفاصيل الفواتير لجميع مشترياتك.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] text-sm font-semibold text-[var(--charcoal-ink)] hover:bg-black/5 transition-all self-start sm:self-auto"
        >
          متابعة التسوق في المتجر ←
        </Link>
      </div>

      {/* KPI Stats Strip */}
      <div className="orders-kpi-strip mb-8">
        <div className="kpi-box">
          <span className="kpi-label">إجمالي المشتريات</span>
          <strong className="kpi-val">
            {summary.totalSpent.toLocaleString('ar-SA')} ر.س
          </strong>
        </div>
        <div className="kpi-box">
          <span className="kpi-label">طلبات نشطة / في الطريق</span>
          <strong className="kpi-val">
            {summary.activeOrders}
          </strong>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="orders-controls-bar mb-8">
        <div className="orders-search-wrap">
          <label htmlFor="page-orders-search" className="sr-only">
            البحث في الطلبات
          </label>
          <div className="relative w-full flex items-center">
            <span className="absolute right-3 text-[var(--muted-umeboshi)] pointer-events-none">
              <IconSearch size={18} />
            </span>
            <input
              type="search"
              id="page-orders-search"
              className="orders-search-input pr-10"
              placeholder="بحث برقم الطلب، المدينة، أو اسم المنتج..."
              value={filters.searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="orders-filter-wrap">
          <label htmlFor="page-orders-status" className="sr-only">
            حالة الطلب
          </label>
          <select
            id="page-orders-status"
            className="orders-select"
            value={filters.status}
            onChange={(e) => {
              const val = e.target.value;
              if (isFilterStatus(val)) {
                setStatusFilter(val);
              }
            }}
          >
            <option value="all">جميع الحالات</option>
            <option value="pending">قيد الانتظار</option>
            <option value="processing">قيد التجهيز</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Main Dynamic Orders Body */}
      <div aria-live="polite">
        {renderContent()}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal order={selectedOrder} onClose={closeOrderDetails} />
    </div>
  );
};
