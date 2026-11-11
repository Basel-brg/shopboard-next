'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShoppingCart,
  Check,
  Sparkles,
} from 'lucide-react';
import type { DeskSetup } from '../setups.types';
import { calculateBundlePrice } from '../setups.logic';
import { useCart } from '@/modules/cart/context/useCart';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface SetupDetailViewProps {
  setup: DeskSetup;
}

export function SetupDetailView({ setup }: SetupDetailViewProps) {
  // All product IDs initially selected
  const [selectedIds, setSelectedIds] = useState<number[]>(
    setup.items.map((it) => it.productId),
  );
  const [justAdded, setJustAdded] = useState(false);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const toggleProduct = (productId: number) => {
    setSelectedIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const selectedProducts = setup.items
    .filter((it) => selectedIds.includes(it.productId))
    .map((it) => it.product);

  const calculation = calculateBundlePrice(selectedProducts, setup.bundleDiscountPct);

  const handleAddBundleToCart = () => {
    if (selectedProducts.length === 0) {
      showToast('يرجى تحديد قطعة واحدة على الأقل لإضافتها للسلة');
      return;
    }

    for (const product of selectedProducts) {
      addItem(product);
    }

    setJustAdded(true);
    showToast(`تمت إضافة ${selectedProducts.length} قطع من حزمة "${setup.title}" إلى السلة!`);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/setups"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] font-semibold shadow-xs transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة لجميع بيئات العمل</span>
          </Link>
          <span className="text-[var(--border)]">/</span>
          <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/20 font-readex">
            {setup.categoryLabel}
          </span>
        </div>

        <div className="text-xs font-mono text-[var(--muted-foreground)] hidden sm:block">
          {setup.subtitle}
        </div>
      </div>

      {/* Main Grid: Left Setup Showcase & Right Bundle Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Col (7 cols): Hero Image & Vibe Story */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-sm">
            <div className="aspect-16/10 w-full overflow-hidden bg-[#fbf9f5] dark:bg-[#201e1b]">
              <img
                src={setup.image}
                alt={setup.title}
                className="w-full h-full object-cover"
              />
            </div>

            {setup.bundleDiscountPct > 0 && (
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[var(--accent-coral)] text-white text-xs font-bold shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>خصم الحزمة التجميعية {setup.bundleDiscountPct}%</span>
              </span>
            )}
          </div>

          <div className="space-y-4 p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-readex">
              {setup.title}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] font-mono">
              {setup.subtitle}
            </p>
            <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-sans">
              {setup.description}
            </p>

            {/* Tags Strip */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
              {setup.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (5 cols): Interactive Checklist & Instant Buy */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
              <div>
                <h2 className="text-lg font-bold font-readex text-[var(--foreground)]">
                  قطع وتجهيزات السيت أب
                </h2>
                <p className="text-xs text-[var(--muted-foreground)]">
                  حدد القطع التي ترغب بضمها في الحزمة:
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--accent-coral)] bg-[var(--accent-coral-soft)] px-2.5 py-1 rounded-full">
                {selectedProducts.length} من {setup.items.length} محددة
              </span>
            </div>

            {/* Checklist of Items */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {setup.items.map((item) => {
                const isSelected = selectedIds.includes(item.productId);
                return (
                  <div
                    key={item.productId}
                    onClick={() => toggleProduct(item.productId)}
                    className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[var(--accent-coral)] bg-[var(--accent-coral-soft)]/20 shadow-xs'
                        : 'border-[var(--border)] bg-[var(--background)] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-[var(--accent-coral)] border-[var(--accent-coral)] text-white'
                            : 'border-[var(--border)] bg-white dark:bg-black/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-[var(--border)] bg-white dark:bg-[#1a1917] shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover aspect-square"
                        />
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)] truncate font-readex">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-[var(--muted-foreground)]">
                          {item.product.category}
                        </span>
                      </div>
                    </div>

                    <div className="text-left shrink-0">
                      <span className="text-xs sm:text-sm font-bold font-readex text-[var(--foreground)]">
                        {item.product.price} ر.س
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pricing Summary Box */}
            <div className="p-4 rounded-2xl bg-[var(--secondary)] space-y-2 text-xs">
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>سعر القطع المحددة:</span>
                <span className="font-mono">{calculation.totalOriginalPrice} ر.س</span>
              </div>
              {calculation.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>خصم شراء الحزمة ({setup.bundleDiscountPct}%):</span>
                  <span className="font-mono">- {calculation.discountAmount} ر.س</span>
                </div>
              )}
              <div className="pt-2 border-t border-[var(--border)] flex justify-between items-baseline text-base font-bold text-[var(--foreground)]">
                <span>إجمالي الحزمة:</span>
                <span className="text-2xl font-black font-readex text-[var(--accent-coral)]">
                  {calculation.finalPrice} <span className="text-xs font-sans">ر.س</span>
                </span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleAddBundleToCart}
              disabled={selectedProducts.length === 0}
              className={`w-full py-4 rounded-full font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer active:scale-98 ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : selectedProducts.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[var(--accent-coral)] hover:bg-[#d95232] text-white hover:shadow-lg'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>تمت إضافة الحزمة بنجاح إلى السلة!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    إضافة الحزمة ({selectedProducts.length} قطع) إلى السلة
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
