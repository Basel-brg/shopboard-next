'use client';

import React, { useState } from 'react';
import { ShoppingCart, Heart, Minus, Plus, Check, Ruler } from 'lucide-react';
import type { Product } from '../products.types';
import { useCart } from '@/modules/cart/context/useCart';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSpec, setSelectedSpec] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const colors = [
    { name: 'عاجي طبيعي', hex: '#f2eada', ring: 'ring-[#ccb693]' },
    { name: 'كربوني داكن', hex: '#1c1b18', ring: 'ring-[#1c1b18]' },
    { name: 'أخضر خيزران', hex: '#3f5945', ring: 'ring-[#3f5945]' },
    { name: 'رمادي حجري', hex: '#a69f94', ring: 'ring-[#a69f94]' },
  ];

  const specsList = product.specs && product.specs.length > 0
    ? product.specs
    : ['إصدار قياسي', 'إصدار احترافي Pro', 'إصدار ماكس Max'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Color Swatches */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-[var(--foreground)] font-readex">
            اللون: <span className="font-normal text-[var(--muted-foreground)]">{colors[selectedColor].name}</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {colors.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedColor(idx)}
              className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                selectedColor === idx
                  ? 'ring-2 ring-offset-2 ring-[var(--accent-coral)] scale-110'
                  : 'hover:scale-105 opacity-85'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              aria-label={c.name}
            >
              {selectedColor === idx && (
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Specs / Size Chips */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-[var(--foreground)] font-readex">
            المواصفات / القياس:
          </span>
          <button
            type="button"
            onClick={() => showToast('دليل المقاسات: الأبعاد القياسية للمنتج موضحة في تفاصيل المواصفات الفنية أدناه')}
            className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--accent-coral)] cursor-pointer"
          >
            <Ruler className="w-3 h-3" />
            <span>دليل المقاسات</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {specsList.map((spec, idx) => {
            const isSelected = selectedSpec === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSpec(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--accent-coral)] text-white shadow-xs scale-102'
                    : 'bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]'
                }`}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Quantity Stepper */}
      <div>
        <span className="text-xs font-bold text-[var(--foreground)] font-readex block mb-2">
          الكمية:
        </span>
        <div className="inline-flex items-center border border-[var(--border)] rounded-2xl bg-[var(--card)] p-1 shadow-xs">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            aria-label="إنقاص الكمية"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-bold text-sm text-[var(--foreground)] font-readex">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
            aria-label="زيادة الكمية"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4. Action Buttons (Add to Cart & Wishlist) */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer active:scale-98 ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[var(--accent-coral)] hover:bg-[#d95232] text-white hover:shadow-lg'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-5 h-5" />
              <span>تمت الإضافة بنجاح إلى السلة!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>إضافة {quantity > 1 ? `(${quantity})` : ''} إلى السلة</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            const next = !isWishlisted;
            setIsWishlisted(next);
            showToast(
              next
                ? `تمت إضافة "${product.name}" إلى المفضلة`
                : `تمت إزالة "${product.name}" من المفضلة`,
            );
          }}
          className="w-full py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 bg-white dark:bg-[#1a1917] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[var(--accent-coral)] text-[var(--accent-coral)]' : 'text-[var(--muted-foreground)]'}`} />
          <span>{isWishlisted ? 'في قائمة المفضلة' : 'إضافة إلى المفضلة'}</span>
        </button>
      </div>

      {/* 5. Trust Guarantee Badges */}
      <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-2 p-3 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <span className="w-2 h-2 rounded-full bg-[var(--bamboo-green)] shrink-0" aria-hidden="true" />
          <span>شحن سريع ومجاني للطلبات فوق 300 ر.س</span>
        </div>
        <div className="flex items-center gap-2 p-3 rounded-2xl border border-[var(--border)] bg-[var(--card)]">
          <span className="w-2 h-2 rounded-full bg-[var(--accent-coral)] shrink-0" aria-hidden="true" />
          <span>{product.warranty || 'ضمان سنتين شامل من ShopBoard'}</span>
        </div>
      </div>
    </div>
  );
}
