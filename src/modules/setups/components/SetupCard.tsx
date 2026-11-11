'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import type { DeskSetup } from '../setups.types';
import { calculateBundlePrice } from '../setups.logic';

interface SetupCardProps {
  setup: DeskSetup;
}

export function SetupCard({ setup }: SetupCardProps) {
  const calculation = calculateBundlePrice(
    setup.items.map((i) => i.product),
    setup.bundleDiscountPct,
  );

  return (
    <article className="group relative flex flex-col rounded-3xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300">
      {/* Setup Hero Image Banner */}
      <div className="relative w-full aspect-16/10 bg-[#fbf9f5] dark:bg-[#201e1b] overflow-hidden">
        <Link href={`/setups/${setup.id}`} className="block w-full h-full">
          <img
            src={setup.image}
            alt={setup.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Category Pill Overlay */}
        <span className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-[var(--card)]/90 backdrop-blur-xs text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold shadow-xs">
          {setup.categoryLabel}
        </span>

        {/* Bundle Discount Badge */}
        {setup.bundleDiscountPct > 0 && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--accent-coral)] text-white text-xs font-bold shadow-xs">
            <Sparkles className="w-3 h-3" />
            <span>وفر {setup.bundleDiscountPct}% بالحزمة</span>
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)] group-hover:text-[var(--accent-coral)] transition-colors">
            <Link href={`/setups/${setup.id}`}>{setup.title}</Link>
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)] font-sans line-clamp-2">
            {setup.description}
          </p>

          {/* Included Items Thumbnails Row */}
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <span className="text-[11px] font-semibold text-[var(--muted-foreground)] block mb-2">
              تشمل هذه البيئة {setup.items.length} قطع متناسقة:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {setup.items.map((item) => (
                <div
                  key={item.productId}
                  className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--background)] shrink-0"
                  title={item.product.name}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-[var(--muted-foreground)] block">سعر الحزمة المتكاملة:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black font-readex text-[var(--accent-coral)]">
                {calculation.finalPrice}
              </span>
              <span className="text-xs font-semibold text-[var(--foreground)]">ر.س</span>
              <s className="text-xs text-[var(--muted-foreground)] line-through font-mono mr-1">
                {calculation.totalOriginalPrice} ر.س
              </s>
            </div>
          </div>

          <Link
            href={`/setups/${setup.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--foreground)] hover:opacity-90 text-[var(--background)] text-xs font-bold transition-all shadow-xs cursor-pointer group-hover:scale-102"
          >
            <span>استعراض وتخصيص الحزمة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
