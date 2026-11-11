'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Gift,
  Sparkles,
  Check,
  Package,
  ArrowLeft,
} from 'lucide-react';
import type { BudgetTier, RecipientPersona, GiftItem } from '../gift-guide.types';
import { filterGifts, getBudgetTierStats } from '../gift-guide.logic';
import { useCart } from '@/modules/cart/context/useCart';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface GiftGuideViewProps {
  initialGifts: readonly GiftItem[];
}

export function GiftGuideView({ initialGifts }: GiftGuideViewProps) {
  const [selectedTier, setSelectedTier] = useState<BudgetTier | 'all'>('all');
  const [selectedPersona, setSelectedPersona] = useState<RecipientPersona>('all');
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const { addItem } = useCart();
  const { showToast } = useToast();

  const tierStats = useMemo(() => getBudgetTierStats(initialGifts), [initialGifts]);

  const filteredGifts = useMemo(() => {
    return filterGifts(initialGifts, {
      tier: selectedTier,
      persona: selectedPersona,
    });
  }, [initialGifts, selectedTier, selectedPersona]);

  const handleAddGift = (gift: GiftItem) => {
    addItem(gift.product);
    setAddedIds((prev) => [...prev, gift.product.id]);
    showToast(`تمت إضافة "${gift.product.name}" إلى السلة كهدية`);

    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== gift.product.id));
    }, 2500);
  };

  return (
    <div className="space-y-10">
      {/* Filters Toolbar */}
      <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-6">
        {/* Budget Tiers Row */}
        <div>
          <label className="text-xs font-bold text-[var(--muted-foreground)] block mb-3">
            حدد الميزانية المناسبة للهدية:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedTier('all')}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer ${
                selectedTier === 'all'
                  ? 'bg-[var(--accent-coral)] text-white shadow-xs font-bold'
                  : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent-coral)]'
              }`}
            >
              <div>كافة الهدايا</div>
              <span className="text-[11px] opacity-80 mt-0.5 block">({initialGifts.length} خيار)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('under-200')}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer ${
                selectedTier === 'under-200'
                  ? 'bg-[var(--accent-coral)] text-white shadow-xs font-bold'
                  : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent-coral)]'
              }`}
            >
              <div>أقل من 200 ر.س</div>
              <span className="text-[11px] opacity-80 mt-0.5 block">({tierStats['under-200']} هدايا راقية)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('200-to-500')}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer ${
                selectedTier === '200-to-500'
                  ? 'bg-[var(--accent-coral)] text-white shadow-xs font-bold'
                  : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent-coral)]'
              }`}
            >
              <div>200 - 500 ر.س</div>
              <span className="text-[11px] opacity-80 mt-0.5 block">({tierStats['200-to-500']} الأكثر طلباً)</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTier('over-500')}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-center cursor-pointer ${
                selectedTier === 'over-500'
                  ? 'bg-[var(--accent-coral)] text-white shadow-xs font-bold'
                  : 'bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent-coral)]'
              }`}
            >
              <div>أكثر من 500 ر.س</div>
              <span className="text-[11px] opacity-80 mt-0.5 block">({tierStats['over-500']} هدايا ملكية)</span>
            </button>
          </div>
        </div>

        {/* Recipient Persona Filter Row */}
        <div className="pt-4 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[var(--muted-foreground)] ml-2">
            لمن الهدية؟
          </span>
          {[
            { id: 'all', label: 'الجميع' },
            { id: 'developer', label: 'للمطورين والمبرمجين' },
            { id: 'creator', label: 'للمصممين وصناع المحتوى' },
            { id: 'executive', label: 'للمديرين والتنفيذيين' },
          ].map((persona) => {
            const isActive = selectedPersona === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => setSelectedPersona(persona.id as RecipientPersona)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--foreground)] text-[var(--background)] font-bold'
                    : 'bg-[var(--background)] text-[var(--muted-foreground)] border border-[var(--border)] hover:text-[var(--foreground)]'
                }`}
              >
                {persona.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gift Cards Grid */}
      {filteredGifts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-[var(--border)] bg-[var(--card)] space-y-3">
          <p className="text-[var(--muted-foreground)]">لا توجد هدايا متطابقة مع هذا الفلتر حالياً.</p>
          <button
            type="button"
            onClick={() => {
              setSelectedTier('all');
              setSelectedPersona('all');
            }}
            className="px-5 py-2.5 rounded-full bg-[var(--accent-coral)] text-white text-xs font-bold cursor-pointer"
          >
            إعادة تعيين الفلاتر
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGifts.map((gift) => {
            const isAdded = addedIds.includes(gift.product.id);
            return (
              <article
                key={gift.id}
                className="group flex flex-col rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-full bg-[#fbf9f5] dark:bg-[#201e1b] overflow-hidden">
                  <Link href={`/products/${gift.product.id}`} className="block w-full h-full">
                    <img
                      src={gift.product.image}
                      alt={gift.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>

                  {/* Gift Tag Pill */}
                  <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[var(--card)]/95 backdrop-blur-xs text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold shadow-xs">
                    {gift.giftTag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-base font-bold font-readex text-[var(--foreground)] group-hover:text-[var(--accent-coral)] transition-colors">
                        <Link href={`/products/${gift.product.id}`}>{gift.product.name}</Link>
                      </h3>
                      <span className="text-base font-bold text-[var(--accent-coral)] shrink-0">
                        {gift.product.price} ر.س
                      </span>
                    </div>

                    {/* Why this makes a great gift */}
                    <div className="mt-3 p-3 rounded-2xl bg-[var(--accent)]/50 border border-[var(--border)]/60 text-xs text-[var(--muted-foreground)] leading-relaxed">
                      <span className="font-semibold text-[var(--foreground)] block mb-1">
                        لماذا تناسب كهدية؟
                      </span>
                      {gift.whyItsAGreatGift}
                    </div>

                    {/* Packaging Recommendation */}
                    {gift.recommendedPackaging && (
                      <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-[var(--muted-foreground)]">
                        <Package className="w-3.5 h-3.5 text-[var(--accent-coral)] shrink-0" />
                        <span>{gift.recommendedPackaging}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="pt-3 border-t border-[var(--border)]">
                    <button
                      type="button"
                      onClick={() => handleAddGift(gift)}
                      disabled={isAdded}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[var(--accent-coral)] text-white hover:opacity-90 shadow-xs'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>تمت الإضافة للسلة</span>
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          <span>أضف إلى السلة كهدية</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Gift Experience Banner */}
      <section className="rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--card)] to-[var(--accent)]/30 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-coral)] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>تجربة إهداء متكاملة</span>
            </span>
            <h2 className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)]">
              هل ترغب بإرسال الهدية مباشرة لصديقك أو زميلك؟
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-xl">
              نوفر خدمة تغليف هدايا احترافية فاخرة مجاناً مع إمكانية طباعة كرت إهداء شخصي بخط مميز، وإخفاء الأسعار من الفاتورة المرفقة.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/setups"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <span>شاهد بيئات العمل الكاملة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
