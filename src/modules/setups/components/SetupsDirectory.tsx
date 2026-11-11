'use client';

import React, { useState, useMemo } from 'react';
import { Layers, Sparkles, Truck, RotateCcw } from 'lucide-react';
import type { DeskSetup } from '../setups.types';
import { filterSetups } from '../setups.logic';
import { SetupCard } from './SetupCard';

interface SetupsDirectoryProps {
  initialSetups: readonly DeskSetup[];
}

const CATEGORIES = [
  { id: 'all', label: 'كافة البيئات' },
  { id: 'developer', label: 'بيئة المطورين' },
  { id: 'creator', label: 'استوديو الإبداع' },
  { id: 'minimalist', label: 'بساطة التركيز' },
  { id: 'executive', label: 'مكاتب تنفيذية' },
] as const;

export function SetupsDirectory({ initialSetups }: SetupsDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    return filterSetups(initialSetups, activeCategory);
  }, [initialSetups, activeCategory]);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
          <Layers className="w-4 h-4 text-[var(--accent-coral)]" />
          <span>تصفح حسب نمط العمل ({filtered.length} بيئات متوفرة)</span>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="فئات بيئات العمل">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[var(--accent-coral)] text-white shadow-xs font-bold'
                    : 'bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:bg-[var(--accent)] hover:border-[var(--accent-coral)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Setups */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-[var(--border)] bg-[var(--card)] space-y-4">
          <p className="text-[var(--muted-foreground)]">لا توجد بيئات عمل متطابقة مع هذا التصنيف حالياً.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-5 py-2.5 rounded-full bg-[var(--accent-coral)] text-white text-sm font-semibold hover:opacity-90 cursor-pointer"
          >
            عرض كافة البيئات
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filtered.map((setup) => (
            <SetupCard key={setup.id} setup={setup} />
          ))}
        </div>
      )}

      {/* Trust & Guarantee Banner */}
      <section className="mt-12 rounded-3xl border border-[var(--border)] bg-radial from-[var(--card)] to-[var(--background)] p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <h2 className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)]">
            لماذا تختار حزم ShopBoard المتكاملة؟
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
            كل حزمة تم تنسيقها من حيث تناغم الألوان، ملاءمة الارتفاعات هندسياً، وضمان خلو المكتب تماماً من تشابك الأسلاك.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">وفر حتى 15% بالحزمة</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                خصم إضافي تلقائي عند اقتناء قطع الحزمة معاً بدلاً من الشراء المنفرد.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">شحن سريع مجاني</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                توصيل آمن لجميع مدن المملكة مع تغليف مخصص لحماية الخشب والمكونات الحساسة.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">تجربة 14 يوماً مرنة</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                يمكنك تخصيص أو استبدال أي قطعة في الحزمة بكل سهولة وبلا تعقيدات.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
