import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ReviewsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="جاري تحميل التقييمات">
      {/* Breakdown Skeleton */}
      <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] h-44 flex flex-col justify-between">
        <Skeleton className="h-8 w-48 rounded-xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </div>

      {/* Reviews Cards Skeleton */}
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32 rounded-lg" />
                <Skeleton className="h-3 w-20 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-4 w-3/4 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

