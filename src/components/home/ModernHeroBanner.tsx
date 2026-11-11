'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Layers, Gift } from 'lucide-react';

interface ModernHeroBannerProps {
  onExploreClick?: () => void;
}

export function ModernHeroBanner({ onExploreClick }: ModernHeroBannerProps = {}) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#faf4ec] via-[#f5ede0] to-[#ece1d1] dark:from-[#211f1c] dark:via-[#1c1a17] dark:to-[#171513] border border-[var(--border)] p-6 sm:p-8 lg:p-12 shadow-[0_4px_25px_-5px_rgba(25,24,23,0.06)] transition-all">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Right Content (RTL Leading) */}
        <div className="flex-1 text-center lg:text-right space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--card)]/90 backdrop-blur-xs border border-[var(--border)] text-xs font-bold text-[var(--accent-coral)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>بيئات عمل متناسقة | Shop The Look</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-readex text-[var(--foreground)] tracking-tight leading-[1.2]">
            صمم بيئة عملك المثالية <br />
            <span className="text-[var(--accent-coral)]">بحزم منسقة هندسياً</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed font-sans max-w-md mx-auto lg:mx-0">
            اقتنِ مكاتب متكاملة للمطورين والمصممين تجمع بين هدوء الخامات اليابانية وتناغم الإضاءة، مع خصم حزمة تلقائي يصل إلى 15%.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              href="/setups"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent-coral)] hover:bg-[#d95232] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(234,94,60,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Layers className="w-4 h-4" />
              <span>استكشف بيئات العمل</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/gift-guide"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 text-[var(--foreground)] font-medium text-sm border border-[var(--border)] transition-all duration-200"
            >
              <Gift className="w-4 h-4 text-[var(--accent-coral)]" />
              <span>دليل هدايا المكاتب</span>
            </Link>
          </div>

          {/* Highlights Mini Row */}
          <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-[var(--muted-foreground)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>شحن آمن لكافة مدن المملكة</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-coral)]" />
              <span>وفر حتى 15% عند شراء الحزمة</span>
            </div>
          </div>
        </div>

        {/* Left Hero Visual */}
        <div className="flex-1 relative flex items-center justify-center w-full max-w-md lg:max-w-none">
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#f4dfc8] to-[#fcefe3] dark:from-[#2a2620] dark:to-[#352f28] absolute z-0 scale-90 sm:scale-100" />

          <div className="relative z-10 p-2 transition-transform duration-300 hover:scale-105">
            <Link href="/setups/developer-station" className="block relative group">
              <img
                src="/assets/products/curved-monitor.jpg"
                alt="محطة المطور الخارقة"
                className="w-full max-w-[340px] sm:max-w-[420px] aspect-4/3 object-cover rounded-3xl shadow-xl border border-[var(--border)] transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute bottom-3 right-3 left-3 p-3 rounded-2xl bg-[var(--card)]/95 backdrop-blur-md border border-[var(--border)] shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--accent-coral)] block">
                    بيئة الشهر المميزة
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
                    محطة المطور الخارقة
                  </span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-coral)]">
                  خصم 15%
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
