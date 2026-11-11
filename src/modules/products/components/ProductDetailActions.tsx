'use client';

import React, { useState, useMemo } from 'react';
import { ShoppingCart, Heart, Minus, Plus, Check, Ruler, Sparkles } from 'lucide-react';
import type { Product } from '../products.types';
import { useCart } from '@/modules/cart/context/useCart';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // Initialize selected variants from product.variantGroups (first option default for each group)
  const initialVariants = useMemo(() => {
    const map: Record<string, string> = {};
    if (product.variantGroups) {
      for (const group of product.variantGroups) {
        if (group.options.length > 0) {
          map[group.id] = group.options[0].id;
        }
      }
    }
    return map;
  }, [product.variantGroups]);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(initialVariants);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const colors = product.colors && product.colors.length > 0 ? product.colors : null;
  const variantGroups = product.variantGroups && product.variantGroups.length > 0 ? product.variantGroups : null;

  // Calculate total price modifiers from chosen variants
  const priceModifiersSum = useMemo(() => {
    if (!variantGroups) return 0;
    let sum = 0;
    for (const group of variantGroups) {
      const chosenOptionId = selectedVariants[group.id];
      const opt = group.options.find((o) => o.id === chosenOptionId);
      if (opt && opt.priceModifier) {
        sum += opt.priceModifier;
      }
    }
    return sum;
  }, [variantGroups, selectedVariants]);

  const effectivePrice = product.price + priceModifiersSum;

  const handleSelectVariant = (groupId: string, optionId: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [groupId]: optionId,
    }));
  };

  const handleAddToCart = () => {
    // Collect chosen variant descriptions
    const chosenColorName = colors ? colors[selectedColorIdx]?.name : undefined;
    const chosenOptionsLabels: string[] = [];

    if (variantGroups) {
      for (const group of variantGroups) {
        const opt = group.options.find((o) => o.id === selectedVariants[group.id]);
        if (opt) {
          chosenOptionsLabels.push(`${group.title}: ${opt.label}`);
        }
      }
    }

    const customSubtitle = [
      chosenColorName ? `اللون: ${chosenColorName}` : null,
      ...chosenOptionsLabels,
    ]
      .filter(Boolean)
      .join(' | ');

    const itemToAdd: Product = {
      ...product,
      price: effectivePrice,
      subtitle: customSubtitle || product.subtitle,
    };

    for (let i = 0; i < quantity; i++) {
      addItem(itemToAdd);
    }

    setJustAdded(true);
    showToast(`تمت إضافة "${product.name}" إلى السلة بنجاح!`);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="space-y-6 pt-2">
      {/* 1. Tailored Color Swatches (if product has colors) */}
      {colors && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-[var(--foreground)] font-readex">
              اللون المختار:{' '}
              <span className="font-normal text-[var(--muted-foreground)]">
                {colors[selectedColorIdx]?.name}
              </span>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {colors.map((c, idx) => {
              const isSelected = selectedColorIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-9 h-9 rounded-full transition-all duration-200 cursor-pointer relative flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-[var(--accent-coral)] scale-110 shadow-xs'
                      : 'hover:scale-105 opacity-85 border border-[var(--border)]'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={`اختيار لون: ${c.name}`}
                >
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Tailored Product Variant Groups (Switches, Size, Mount, etc.) */}
      {variantGroups ? (
        <div className="space-y-4">
          {variantGroups.map((group) => {
            const currentSelected = selectedVariants[group.id] || group.options[0]?.id;

            return (
              <div key={group.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)] font-readex">
                    {group.title}:
                  </span>
                  {group.id.includes('size') && (
                    <button
                      type="button"
                      onClick={() =>
                        showToast(
                          'دليل المقاسات: الأبعاد القياسية للمنتج موضحة بالتفصيل في خانة المواصفات الفنية'
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--accent-coral)] cursor-pointer"
                    >
                      <Ruler className="w-3 h-3" />
                      <span>دليل المقاسات</span>
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.options.map((opt) => {
                    const isSelected = currentSelected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectVariant(group.id, opt.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[var(--accent-coral)] text-white shadow-xs scale-102 font-bold'
                            : 'bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]'
                        }`}
                        aria-pressed={isSelected}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                        <span>{opt.label}</span>
                        {opt.priceModifier ? (
                          <span className={`text-[10px] font-mono px-1 rounded-sm ${isSelected ? 'bg-white/20 text-white' : 'text-[var(--accent-coral)]'}`}>
                            +{opt.priceModifier} ر.س
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Fallback Specs Chips if no custom variant groups exist */
        product.specs && product.specs.length > 0 && (
          <div>
            <span className="text-xs font-bold text-[var(--foreground)] font-readex block mb-2">
              خيارات التجهيز:
            </span>
            <div className="flex flex-wrap gap-2">
              {product.specs.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)]"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )
      )}

      {/* 3. Dynamic Price Display if Price Modifier Exists */}
      {priceModifiersSum > 0 && (
        <div className="p-3 rounded-2xl bg-[var(--accent-coral-soft)] border border-[var(--accent-coral)]/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[var(--accent-coral)] font-bold">
            <Sparkles className="w-4 h-4" />
            <span>السعر الإجمالي بعد تخصيص الخيارات:</span>
          </div>
          <span className="font-bold text-sm text-[var(--foreground)] font-mono">
            {effectivePrice} ر.س
          </span>
        </div>
      )}

      {/* 4. Quantity Stepper */}
      <div>
        <span className="text-xs font-bold text-[var(--foreground)] font-readex block mb-2">
          الكمية المطلوبة:
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

      {/* 5. Action Buttons (Add to Cart & Wishlist) */}
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
              <span>إضافة {quantity > 1 ? `(${quantity})` : ''} إلى السلة ({effectivePrice * quantity} ر.س)</span>
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
                : `تمت إزالة "${product.name}" من المفضلة`
            );
          }}
          className="w-full py-3.5 rounded-full font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 bg-white dark:bg-[#1a1917] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] transition-colors cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted
                ? 'fill-[var(--accent-coral)] text-[var(--accent-coral)]'
                : 'text-[var(--muted-foreground)]'
            }`}
          />
          <span>{isWishlisted ? 'في قائمة المفضلة' : 'إضافة إلى المفضلة'}</span>
        </button>
      </div>

      {/* 6. Trust Guarantee Badges */}
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
