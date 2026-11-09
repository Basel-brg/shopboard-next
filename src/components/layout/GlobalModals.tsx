'use client';

import React from 'react';
import { OrderConfirmationModal } from '@/modules/orders/components/OrderConfirmationModal';
import { useOrders } from '@/modules/orders/context/useOrders';

export function GlobalModals() {
  const { confirmedOrder, closeOrderConfirmed } = useOrders();

  if (!confirmedOrder) return null;

  return (
    <OrderConfirmationModal order={confirmedOrder} onClose={closeOrderConfirmed} />
  );
}
