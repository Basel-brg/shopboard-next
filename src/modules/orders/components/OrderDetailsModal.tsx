'use client';

import React from 'react';
import type { Order } from '../orders.types';
import { getOrderStatusBadge, formatOrderDate } from '../orders.logic';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const badge = getOrderStatusBadge(order.status);

  return (
    <Modal
      isOpen={Boolean(order)}
      onClose={onClose}
      size="lg"
      title="تفاصيل الفاتورة والطلب"
      description={`تاريخ الطلب: ${formatOrderDate(order.createdAt)}`}
      footer={
        <Button className="w-full bg-[var(--charcoal-ink)] hover:bg-[var(--charcoal-deep)] text-[var(--washi-ivory)] cursor-pointer" onClick={onClose}>
          إغلاق النافذة
        </Button>
      }
    >
      <div className="space-y-4">
        {/* Order Status & Number */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--bamboo-border)]/50">
          <div>
            <span className="text-xs text-[var(--muted-umeboshi)] block">رقم الطلب</span>
            <h3 className="text-base font-bold font-mono text-[var(--charcoal-ink)] dark:text-[var(--foreground)]" dir="ltr">
              #{order.orderNumber}
            </h3>
          </div>
          <Badge variant="outline" className={`order-status-badge text-xs px-2.5 py-1 ${badge.className}`}>
            {badge.icon} {badge.label}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-[family-name:var(--font-ibm-plex)]">
          <div className="p-3.5 rounded-xl border border-[var(--bamboo-border)]/60 bg-white/70 dark:bg-black/20 space-y-1.5">
            <h4 className="font-bold text-sm text-[var(--charcoal-ink)] dark:text-[var(--foreground)] mb-2 font-[family-name:var(--font-readex)]">
              بيانات المستلم والشحن
            </h4>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">الاسم:</strong> {order.customerName}
            </p>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">الهاتف:</strong> <span dir="ltr">{order.customerPhone}</span>
            </p>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">المدينة:</strong> {order.customerCity}
            </p>
            {order.trackingNumber && (
              <p>
                <strong className="text-[var(--muted-umeboshi)]">رقم الشحنة:</strong> <span dir="ltr">{order.trackingNumber}</span>
              </p>
            )}
          </div>

          <div className="p-3.5 rounded-xl border border-[var(--bamboo-border)]/60 bg-white/70 dark:bg-black/20 space-y-1.5">
            <h4 className="font-bold text-sm text-[var(--charcoal-ink)] dark:text-[var(--foreground)] mb-2 font-[family-name:var(--font-readex)]">
              بيانات الدفع والملخص
            </h4>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">طريقة الدفع:</strong> {order.paymentMethod}
            </p>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">المجموع الفرعي:</strong> {order.subtotal} ر.س
            </p>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">الخصم:</strong> {order.discount > 0 ? `-${order.discount} ر.س` : '0 ر.س'}
            </p>
            <p>
              <strong className="text-[var(--muted-umeboshi)]">رسوم الشحن:</strong>{' '}
              {order.shipping === 0 ? 'مجاني' : `${order.shipping} ر.س`}
            </p>
            <p className="pt-1 text-sm font-bold border-t border-[var(--bamboo-border)]/40 flex justify-between">
              <span>المبلغ الصافي:</span> <span className="text-[var(--bamboo-green)] font-mono">{order.total} ر.س</span>
            </p>
          </div>
        </div>

        {/* Items List */}
        <div>
          <h4 className="font-bold text-sm text-[var(--charcoal-ink)] dark:text-[var(--foreground)] mb-2 font-[family-name:var(--font-readex)]">
            قائمة العناصر ({order.items.length})
          </h4>
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {order.items.map((it, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-white/70 dark:bg-black/20 border border-[var(--bamboo-border)]/40">
                <img
                  src={it.image || '/assets/products/keyboard.jpg'}
                  alt={it.name}
                  width="48"
                  height="48"
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 flex justify-between items-center text-xs">
                  <span className="font-semibold text-[var(--charcoal-ink)] dark:text-[var(--foreground)]">{it.name}</span>
                  <span className="text-[var(--muted-umeboshi)]">
                    {it.price} ر.س × {it.quantity} = <strong className="text-[var(--charcoal-ink)] dark:text-[var(--foreground)] font-mono">{it.price * it.quantity} ر.س</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
