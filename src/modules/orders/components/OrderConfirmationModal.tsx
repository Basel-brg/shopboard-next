'use client';

import React from 'react';
import type { Order } from '../orders.types';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { IconCheck } from '@/shared/components/Icons/Icons';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const totalItemsCount = order.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <Modal
      isOpen={Boolean(order)}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bamboo-green)]/15 text-[var(--bamboo-green)]">
            <IconCheck size={18} />
          </span>
          <span>تم استلام طلبك بنجاح</span>
        </div>
      }
      description={`شكراً لثقتك يا ${order.customerName}! سيتم تجهيز وشحن طلبك بعناية إلى ${order.customerCity} خلال 24 ساعة.`}
      footer={
        <Button
          type="button"
          onClick={onClose}
          className="w-full h-11 bg-[var(--charcoal-ink)] hover:bg-[var(--charcoal-deep)] text-[var(--washi-ivory)] font-bold text-sm cursor-pointer"
        >
          متابعة التسوق
        </Button>
      }
    >
      <div className="space-y-2.5 rounded-xl border border-[var(--bamboo-border)] bg-white/70 dark:bg-black/20 p-4 text-sm font-[family-name:var(--font-ibm-plex)]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-umeboshi)]">رقم الطلب المرجعي:</span>
          <span className="font-mono font-bold text-[var(--charcoal-ink)] dark:text-[var(--foreground)]" dir="ltr">
            #{order.orderNumber}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-umeboshi)]">رقم التواصل:</span>
          <span className="font-mono text-[var(--charcoal-ink)] dark:text-[var(--foreground)]" dir="ltr">
            {order.customerPhone}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-umeboshi)]">طريقة الدفع:</span>
          <Badge variant="outline" className="font-medium text-xs">
            {order.paymentMethod}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-umeboshi)]">عدد القطع:</span>
          <span className="font-semibold text-[var(--charcoal-ink)] dark:text-[var(--foreground)]">{totalItemsCount} قطعة</span>
        </div>

        <div className="pt-2 border-t border-[var(--bamboo-border)] flex items-baseline justify-between font-bold">
          <span className="text-[var(--charcoal-ink)] dark:text-[var(--foreground)]">المبلغ الإجمالي:</span>
          <span className="text-xl font-black font-mono text-[var(--charcoal-ink)] dark:text-[var(--foreground)]">
            {order.total} ر.س
          </span>
        </div>
      </div>
    </Modal>
  );
};
