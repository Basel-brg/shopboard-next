'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ModernHeroBannerProps {
  onExploreClick?: () => void;
}

export function ModernHeroBanner({ onExploreClick }: ModernHeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#faf4ec] via-[#f5ede0] to-[#ece1d1] dark:from-[#211f1c] dark:via-[#1c1a17] dark:to-[#171513] border border-[var(--border)] p-6 sm:p-8 lg:p-12 shadow-[0_4px_25px_-5px_rgba(25,24,23,0.06)] transition-all">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Right Content (RTL Leading) */}
        <div className="flex-1 text-center lg:text-right space-y-4 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-readex text-[var(--foreground)] tracking-tight leading-[1.2]">
            تشكيلات عصرية <br />
            <span className="text-[var(--accent-coral)]">تناسب أسلوبك</span>
          </h1>

          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed font-sans max-w-md mx-auto lg:mx-0">
            ارتقِ بمساحة عملك مع قطع مكتبية متقنة وأدوات حديثة تجمع بين الجمال الياباني الهادئ والإنتاجية العالية.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link
              href="#products-section"
              onClick={onExploreClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent-coral)] hover:bg-[#d95232] text-white font-semibold text-sm shadow-[0_4px_14px_rgba(234,94,60,0.35)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>تسوق الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 text-[var(--foreground)] font-medium text-sm border border-[var(--border)] transition-all duration-200"
            >
              <span>تصفح الكتالوج</span>
            </Link>
          </div>

          {/* Micro dots pagination */}
          <div className="flex items-center justify-center lg:justify-start gap-1.5 pt-4" aria-hidden="true">
            <span className="w-6 h-2 rounded-full bg-[var(--accent-coral)] transition-all" />
            <span className="w-2 h-2 rounded-full bg-[var(--muted-foreground)]/30" />
            <span className="w-2 h-2 rounded-full bg-[var(--muted-foreground)]/30" />
          </div>
        </div>

        {/* Left Hero Visual (Product with Glow Circle) */}
        <div className="flex-1 relative flex items-center justify-center w-full max-w-md lg:max-w-none">
          {/* Circular Glow backdrop */}
          <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-[#f4dfc8] to-[#fcefe3] dark:from-[#2a2620] dark:to-[#352f28] absolute z-0 scale-90 sm:scale-100" />

          {/* Product Cutout / Hero Stage Image */}
          <div className="relative z-10 p-2 transition-transform duration-300 hover:scale-105">
            <img
              src="/assets/products/keyboard.jpg"
              alt="ركن عمل احترافي بتنسيق أكاري الهادئ"
              className="w-full max-w-[300px] sm:max-w-[360px] lg:max-w-[400px] aspect-square object-cover drop-shadow-[0_20px_25px_rgba(0,0,0,0.12)] rounded-3xl"
              width={400}
              height={400}
            />
            {/* Floating Tag */}
            <div className="absolute top-4 left-4 bg-[var(--accent-coral)] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
              جديد
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

