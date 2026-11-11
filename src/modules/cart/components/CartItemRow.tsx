'use client';

import React from 'react';
import type { CartItem } from '../cart.types';
import { IconTrash, IconPlus, IconMinus } from '@/shared/components/Icons/Icons';
import { Button } from '@/components/ui/button';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <li
      className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--accent-coral)]/40 shadow-xs"
      data-id={item.id}
    >
      {/* Product Thumbnail */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--secondary)] p-1 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover rounded-lg aspect-square"
          loading="lazy"
          width="64"
          height="64"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-[var(--foreground)] truncate font-readex">
          {item.name}
        </h4>
        <span className="text-xs text-[var(--muted-foreground)] mt-0.5 block font-sans">
          <span className="font-mono">{item.price}</span> ر.س × <span className="font-mono">{item.quantity}</span> ={' '}
          <strong className="text-[var(--foreground)] font-mono">{item.price * item.quantity} ر.س</strong>
        </span>

        <div className="flex items-center gap-3 mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[var(--border)] rounded-lg bg-[var(--background)] overflow-hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none text-[var(--foreground)] hover:bg-[var(--accent)]/15 cursor-pointer"
              aria-label={`إنقاص الكمية لمنتج ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, -1)}
            >
              <IconMinus size={12} />
            </Button>
            <span
              className="w-8 text-center text-xs font-mono font-bold text-[var(--foreground)]"
              aria-label="الكمية الحالية"
            >
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none text-[var(--foreground)] hover:bg-[var(--accent)]/15 cursor-pointer"
              aria-label={`زيادة الكمية لمنتج ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, +1)}
            >
              <IconPlus size={12} />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-xs text-[var(--muted-foreground)] hover:text-red-500 hover:bg-red-500/10 h-7 gap-1 px-2 cursor-pointer transition-colors"
            aria-label={`حذف منتج ${item.name} من السلة`}
            onClick={() => onRemoveItem(item.id)}
          >
            <IconTrash size={13} />
            <span className="hidden sm:inline">حذف</span>
          </Button>
        </div>
      </div>
    </li>
  );
};
