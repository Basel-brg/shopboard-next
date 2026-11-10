import React from 'react';

export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse" dir="rtl">
      {/* Breadcrumbs skeleton */}
      <div className="h-5 w-48 bg-black/10 dark:bg-white/10 rounded mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Product image gallery skeleton */}
        <div className="space-y-4">
          <div className="aspect-4/3 w-full rounded-2xl bg-black/10 dark:bg-white/10 border border-[var(--bamboo-border)]/50" />
          <div className="grid grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-black/10 dark:bg-white/10" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="h-6 w-24 bg-black/10 dark:bg-white/10 rounded-full" />
            <div className="h-9 w-3/4 bg-black/10 dark:bg-white/10 rounded-lg" />
            <div className="h-4 w-32 bg-black/10 dark:bg-white/10 rounded" />
          </div>

          <div className="h-10 w-40 bg-black/10 dark:bg-white/10 rounded-lg" />

          <div className="space-y-2 pt-4 border-t border-[var(--bamboo-border)]/50">
            <div className="h-4 w-full bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-black/10 dark:bg-white/10 rounded" />
            <div className="h-4 w-2/3 bg-black/10 dark:bg-white/10 rounded" />
          </div>

          <div className="h-12 w-full bg-black/10 dark:bg-white/10 rounded-lg pt-4" />
        </div>
      </div>
    </div>
  );
}

