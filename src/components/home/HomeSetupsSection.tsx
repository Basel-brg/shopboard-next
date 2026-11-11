'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';
import { DESK_SETUPS } from '@/modules/setups/setups.api';
import { SetupCard } from '@/modules/setups/components/SetupCard';

export function HomeSetupsSection() {
  return (
    <section className="space-y-6 pt-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--accent-coral)]">
            <Layers className="w-3.5 h-3.5" />
            <span>تنسيق احترافي جاهز</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-readex text-[var(--foreground)]">
            بيئات عمل متكاملة (Shop The Look)
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            اختر مساحة العمل التي تناسب طبيعة يومك ووفر حتى 15% عند اقتناء الحزمة كاملة.
          </p>
        </div>

        <Link
          href="/setups"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--accent-coral)] hover:underline shrink-0"
        >
          <span>عرض كافة البيئات والتفاصيل</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of Setups */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {DESK_SETUPS.map((setup) => (
          <SetupCard key={setup.id} setup={setup} />
        ))}
      </div>
    </section>
  );
}
