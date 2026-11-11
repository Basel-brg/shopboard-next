'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { IconCheck } from '@/shared/components/Icons/Icons';

export interface ConfirmedOrderData {
  orderNumber: string;
  customerName: string;
  customerCity: string;
  itemsCount: number;
  total: number;
}

interface OrderConfirmationModalProps {
  order: ConfirmedOrderData | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <Modal
      isOpen={Boolean(order)}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
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
          className="w-full h-11 rounded-2xl bg-[var(--accent-coral)] hover:bg-[#d95232] text-white font-bold text-sm cursor-pointer shadow-xs"
        >
          متابعة التسوق
        </Button>
      }
    >
      <div className="space-y-2.5 rounded-xl border border-[var(--border)] bg-[var(--background)] p-4 text-sm font-sans">
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-foreground)]">رقم الطلب المرجعي:</span>
          <span className="font-mono font-bold text-[var(--foreground)]" dir="ltr">
            #{order.orderNumber}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--muted-foreground)]">عدد القطع:</span>
          <span className="font-medium text-[var(--foreground)]">{order.itemsCount} قطع</span>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--border)] pt-2 font-bold">
          <span className="text-[var(--foreground)]">إجمالي المبلغ:</span>
          <span className="text-[var(--accent-coral)]">{order.total} ر.س</span>
        </div>
      </div>
    </Modal>
  );
};

