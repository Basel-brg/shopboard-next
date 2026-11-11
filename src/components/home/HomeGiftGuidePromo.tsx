'use client';

import React from 'react';
import Link from 'next/link';
import { Gift, ArrowLeft } from 'lucide-react';

export function HomeGiftGuidePromo() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-gradient-to-r from-[var(--card)] via-[var(--accent-coral-soft)]/50 to-[var(--card)] p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 text-center lg:text-right max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--card)] text-[var(--accent-coral)] border border-[var(--border)] text-xs font-bold">
            <Gift className="w-3.5 h-3.5" />
            <span>خدمة الإهداء الحصرية</span>
          </span>

          <h2 className="text-xl sm:text-3xl font-bold font-readex text-[var(--foreground)] tracking-tight">
            تبحث عن هدية استثنائية لسطح المكتب؟
          </h2>

          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
            استكشف دليل هدايا المكاتب المقسم حسب ميزانيتك (أقل من 200، 200-500، وأكثر من 500 ر.س)، مع تغليف فاخر مجاني وبطاقة إهداء مخصصة.
          </p>

          {/* Quick budget tier badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium">
              هدايا تحت 200 ر.س
            </span>
            <span className="px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium">
              هدايا 200 - 500 ر.س
            </span>
            <span className="px-3 py-1 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] font-medium">
              هدايا فاخرة +500 ر.س
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <Link
            href="/gift-guide"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent-coral)] hover:bg-[#d95232] text-white text-xs sm:text-sm font-bold shadow-xs transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <Gift className="w-4 h-4" />
            <span>تصفح دليل الهدايا</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--accent)] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <span>كتالوج المنتجات الفردية</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
