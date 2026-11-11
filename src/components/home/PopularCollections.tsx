'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft } from 'lucide-react';
import { useProducts } from '@/modules/products/context/useProducts';

export function PopularCollections() {
  const { setCategory } = useProducts();

  const handleCollectionClick = (categoryName: string) => {
    setCategory(categoryName);
    const catalogElem = document.getElementById('products-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="my-8" aria-labelledby="collections-heading">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="collections-heading" className="text-xl sm:text-2xl font-bold font-readex text-[var(--foreground)]">
            مجموعات مميزة
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">تشكيلات مختارة لأفضل بيئات العمل</p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[var(--accent-coral)] hover:underline"
        >
          <span>عرض الكل</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 2-Column Collection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Collection 1 */}
        <div
          onClick={() => handleCollectionClick('لوحات مفاتيح')}
          className="group relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-5 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer"
          role="button"
          tabIndex={0}
        >
          <div className="space-y-1.5 z-10">
            <span className="text-[11px] font-bold text-[var(--accent-coral)] uppercase tracking-wider block">
              سلسلة النقاء
            </span>
            <h3 className="text-base sm:text-lg font-bold font-readex text-[var(--foreground)] group-hover:text-[var(--accent-coral)] transition-colors">
              أجهزة ومعدات ميكانيكية
            </h3>
            <span className="text-xs text-[var(--muted-foreground)] block">120+ قطعة معتمدة</span>
            <div className="pt-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--secondary)] text-[var(--foreground)] group-hover:bg-[var(--accent-coral)] group-hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="w-28 h-28 sm:w-32 sm:h-32 relative shrink-0 overflow-hidden rounded-2xl bg-[#faf2e6] dark:bg-[#25221e] flex items-center justify-center p-2">
            <img
              src="/assets/products/keyboard.jpg"
              alt="أجهزة ومعدات ميكانيكية"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Collection 2 */}
        <div
          onClick={() => handleCollectionClick('تنظيم المكتب')}
          className="group relative overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] p-4 sm:p-5 flex items-center justify-between shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-200 cursor-pointer"
          role="button"
          tabIndex={0}
        >
          <div className="space-y-1.5 z-10">
            <span className="text-[11px] font-bold text-[var(--accent-coral)] uppercase tracking-wider block">
              سلسلة النظام
            </span>
            <h3 className="text-base sm:text-lg font-bold font-readex text-[var(--foreground)] group-hover:text-[var(--accent-coral)] transition-colors">
              أكسسوارات التنظيم الهادئ
            </h3>
            <span className="text-xs text-[var(--muted-foreground)] block">98+ قطعة متناسقة</span>
            <div className="pt-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--secondary)] text-[var(--foreground)] group-hover:bg-[var(--accent-coral)] group-hover:text-white transition-all">
                <ChevronLeft className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div className="w-28 h-28 sm:w-32 sm:h-32 relative shrink-0 overflow-hidden rounded-2xl bg-[#faf2e6] dark:bg-[#25221e] flex items-center justify-center p-2">
            <img
              src="/assets/products/brass-organizer.jpg"
              alt="أكسسوارات التنظيم الهادئ"
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

