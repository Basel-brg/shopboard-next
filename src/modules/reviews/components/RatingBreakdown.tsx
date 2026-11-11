import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import type { RatingBreakdownData } from '../reviews.types';

interface RatingBreakdownProps {
  data: RatingBreakdownData;
}

export function RatingBreakdown({ data }: RatingBreakdownProps) {
  const { average, totalCount, distribution, recommendedPercentage } = data;
  const starKeys: (1 | 2 | 3 | 4 | 5)[] = [5, 4, 3, 2, 1];

  return (
    <div className="p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* 1. Score & Recommendation Box (4 cols) */}
      <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-right border-b md:border-b-0 md:border-l border-[var(--border)] pb-6 md:pb-0 md:pl-6 space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-black font-readex text-[var(--foreground)] tracking-tight">
            {average.toFixed(1)}
          </span>
          <span className="text-xs sm:text-sm text-[var(--muted-foreground)] font-mono">
            من 5.0
          </span>
        </div>

        {/* Visual Stars */}
        <div className="flex items-center gap-1" aria-label={`متوسط التقييم ${average} من 5 نجوم`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= Math.round(average)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-[var(--border)]'
              }`}
            />
          ))}
        </div>

        <p className="text-xs text-[var(--muted-foreground)] pt-1">
          بناءً على <strong className="text-[var(--foreground)] font-bold">{totalCount}</strong> تقييم معتمد
        </p>

        {/* Recommended Pill */}
        <div className="pt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/20 text-xs font-bold">
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>{recommendedPercentage}% من المشترين يوصون بهذا المنتج</span>
        </div>
      </div>

      {/* 2. Star Distribution Bars (8 cols) */}
      <div className="md:col-span-8 space-y-2">
        {starKeys.map((stars) => {
          const count = distribution[stars] || 0;
          const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;

          return (
            <div key={stars} className="flex items-center gap-3 text-xs">
              <span className="w-12 text-[var(--foreground)] font-semibold flex items-center gap-1 justify-end">
                <span>{stars}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>

              {/* Progress Bar Container */}
              <div
                className="flex-1 h-2 rounded-full bg-[var(--secondary)] overflow-hidden"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`نسبة تقييمات ${stars} نجوم: ${percentage}%`}
              >
                <div
                  className="h-full bg-[var(--accent-coral)] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Percentage / Count label */}
              <span className="w-12 text-left font-mono text-[var(--muted-foreground)]">
                {count} ({percentage}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

