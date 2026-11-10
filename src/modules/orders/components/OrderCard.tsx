'use client';
import React from 'react';
import type { Order } from '../orders.types';
import { getOrderStatusBadge, formatOrderDate } from '../orders.logic';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onCancelOrder: (orderId: string) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onViewDetails, onCancelOrder }) => {
  const badge = getOrderStatusBadge(order.status);
  const canCancel = order.status === 'pending' || order.status === 'processing';
  const itemCount = order.items.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <Card className="order-card overflow-hidden" data-order-id={order.id}>
      <CardHeader className="order-card-header p-4 pb-2">
        <div className="order-title-group">
          <span className="order-num" dir="ltr">
            #{order.orderNumber}
          </span>
          <time className="order-date">{formatOrderDate(order.createdAt)}</time>
        </div>
        <span className={`order-status-badge ${badge.className}`}>
          <span aria-hidden="true">{badge.icon}</span>
          <span>{badge.label}</span>
        </span>
      </CardHeader>

      <CardContent className="order-card-body p-4 pt-2">
        <div className="order-items-strip">
          {order.items.slice(0, 3).map((item, idx) => (
            <div key={idx} className="order-item-thumb" title={`${item.name} (${item.quantity})`}>
              <img
                src={item.image || '/assets/products/keyboard.jpg'}
                alt={item.name}
                loading="lazy"
              />
              <span className="order-thumb-qty">×{item.quantity}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="order-thumb-more">+{order.items.length - 3}</span>
          )}
        </div>

        <div className="order-meta-info">
          <span className="meta-row">
            <span>المستلم:</span>{' '}
            <strong>
              {order.customerName} ({order.customerCity})
            </strong>
          </span>
          <span className="meta-row">
            <span>عدد المنتجات:</span> <strong>{itemCount} قطع</strong>
          </span>
          {order.trackingNumber && (
            <span className="meta-row meta-tracking">
              <span>رقم التتبع:</span>
              <strong dir="ltr">{order.trackingNumber}</strong>
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="order-card-footer p-4 pt-2 flex items-center justify-between border-t border-[var(--bamboo-border)]/40 mt-2">
        <div className="order-total-block">
          <span className="total-label text-xs text-[var(--muted-umeboshi)] block">المجموع الإجمالي</span>
          <strong className="total-val text-base font-bold text-[var(--charcoal-ink)]">{order.total} ر.س</strong>
        </div>
        <div className="order-card-actions flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(order)}
          >
            عرض التفاصيل
          </Button>
          {canCancel && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onCancelOrder(order.id)}
            >
              إلغاء الطلب
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
