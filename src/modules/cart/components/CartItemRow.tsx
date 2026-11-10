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
      className="flex items-center gap-4 p-4 rounded-xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] transition-all hover:border-[var(--charcoal-ink)]/20"
      data-id={item.id}
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-[var(--bamboo-border)] bg-white/60 p-1 flex items-center justify-center">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain"
          loading="lazy"
          width="64"
          height="64"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-[var(--charcoal-ink)] truncate font-[family-name:var(--font-readex)]">
          {item.name}
        </h4>
        <span className="text-xs text-[var(--muted-umeboshi)] mt-0.5 block font-[family-name:var(--font-ibm-plex)]">
          <span className="font-mono">{item.price}</span> ر.س × <span className="font-mono">{item.quantity}</span> ={' '}
          <strong className="text-[var(--charcoal-ink)] font-mono">{item.price * item.quantity} ر.س</strong>
        </span>

        <div className="flex items-center gap-3 mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-[var(--bamboo-border)] rounded-md bg-white">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none text-[var(--charcoal-ink)] hover:bg-black/5"
              aria-label={`إنقاص الكمية لمنتج ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, -1)}
            >
              <IconMinus size={12} />
            </Button>
            <span
              className="w-8 text-center text-xs font-mono font-bold text-[var(--charcoal-ink)]"
              aria-label="الكمية الحالية"
            >
              {item.quantity}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none text-[var(--charcoal-ink)] hover:bg-black/5"
              aria-label={`زيادة الكمية لمنتج ${item.name}`}
              onClick={() => onUpdateQuantity(item.id, 1)}
            >
              <IconPlus size={12} />
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 text-xs text-[var(--vermilion-seal)] hover:text-[var(--vermilion-seal)] hover:bg-[var(--vermilion-seal)]/10 gap-1 px-2 cursor-pointer"
            aria-label={`حذف منتج ${item.name} من السلة`}
            onClick={() => onRemoveItem(item.id)}
          >
            <IconTrash size={13} />
            <span>حذف</span>
          </Button>
        </div>
      </div>
    </li>
  );
};
