'use client';

import React from 'react';
import Link from 'next/link';
import { useOrders } from '../context/useOrders';
import { OrderCard } from './OrderCard';
import { OrderDetailsModal } from './OrderDetailsModal';
import { IconOrders, IconSearch } from '../../../shared/components/Icons/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
          <Card className="p-8 text-center" role="alert">
            <div className="text-3xl mb-3">⚠️</div>
            <h3 className="text-lg font-bold text-[var(--charcoal-ink)] mb-1">فشل في جلب سجل الطلبات</h3>
            <p className="text-xs text-[var(--muted-umeboshi)] mb-4">{loadState.message}</p>
            <Button
              type="button"
              onClick={() => setTestState('live')}
            >
              إعادة المحاولة (Try Again)
            </Button>
          </Card>
        );

      case 'empty':
        if (loadState.reason === 'no-orders') {
          return (
            <Card className="p-8 text-center">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="text-lg font-bold text-[var(--charcoal-ink)] mb-1">لا توجد طلبات سابقة حتى الآن</h3>
              <p className="text-xs text-[var(--muted-umeboshi)] mb-6">
                لم تقم بإتمام أي طلبات شراء بعد. اختر منتجاتك من المتجر وجهّز مكتبك الآن!
              </p>
              <Button asChild size="lg">
                <Link href="/products">تصفح المنتجات وبدء التسوق</Link>
              </Button>
            </Card>
          );
        }
        return (
          <Card className="p-8 text-center">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-[var(--charcoal-ink)] mb-1">لا توجد طلبات مطابقة للبحث أو الفلتر</h3>
            <p className="text-xs text-[var(--muted-umeboshi)] mb-6">جرّب البحث برقم طلب آخر أو تغيير تصنيف حالة الطلب.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              إعادة ضبط الفلاتر
            </Button>
          </Card>
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
              <Badge variant="outline" className="text-xs font-bold">
                {filteredOrders.length} طلبات
              </Badge>
            </div>
          </div>
          <p className="text-sm text-[var(--muted-umeboshi)] font-[family-name:var(--font-ibm-plex)]">
            متابعة حالة الشحنات، أرقام التتبع، ومراجعة تفاصيل الفواتير لجميع مشترياتك.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/products">متابعة التسوق في المتجر ←</Link>
        </Button>
      </div>

      {/* KPI Stats Strip with shadcn Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Card className="p-4 sm:p-5">
          <CardContent className="p-0 flex flex-col">
            <span className="text-xs text-[var(--muted-umeboshi)] font-medium mb-1">إجمالي المشتريات</span>
            <strong className="text-xl sm:text-2xl font-bold text-[var(--charcoal-ink)]">
              {summary.totalSpent.toLocaleString('ar-SA')} ر.س
            </strong>
          </CardContent>
        </Card>
        <Card className="p-4 sm:p-5">
          <CardContent className="p-0 flex flex-col">
            <span className="text-xs text-[var(--muted-umeboshi)] font-medium mb-1">طلبات نشطة / في الطريق</span>
            <strong className="text-xl sm:text-2xl font-bold text-[var(--bamboo-green)]">
              {summary.activeOrders}
            </strong>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters Bar with shadcn Input */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 flex items-center">
          <span className="absolute right-3.5 text-[var(--muted-umeboshi)] pointer-events-none">
            <IconSearch size={18} />
          </span>
          <Input
            type="search"
            id="page-orders-search"
            className="pr-10"
            placeholder="بحث برقم الطلب، المدينة، أو اسم المنتج..."
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sm:w-56">
          <label htmlFor="page-orders-status" className="sr-only">
            حالة الطلب
          </label>
          <select
            id="page-orders-status"
            className="flex h-10 w-full rounded-xl border border-[var(--bamboo-border)] bg-white px-3.5 py-2 text-sm text-[var(--charcoal-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] cursor-pointer"
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
