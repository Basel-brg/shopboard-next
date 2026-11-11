import React from 'react';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';
import type { Review } from '../reviews.types';

interface ReviewCardProps {
  review: Review;
  onVoteHelpful: (reviewId: string) => void;
}

export function ReviewCard({ review, onVoteHelpful }: ReviewCardProps) {
  return (
    <article className="p-5 sm:p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs space-y-3.5 transition-all">
      {/* Top Author Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar Initial */}
          <div className="w-10 h-10 rounded-full bg-[var(--secondary)] border border-[var(--border)] flex items-center justify-center font-bold text-sm text-[var(--foreground)] font-readex shrink-0">
            {review.authorName.charAt(0)}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[var(--foreground)] font-readex">
                {review.authorName}
              </span>
              {review.verifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>مشترٍ موثّق</span>
                </span>
              )}
            </div>
            <time className="text-[11px] text-[var(--muted-foreground)] font-mono block">
              {review.date}
            </time>
          </div>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1" aria-label={`تقييم: ${review.rating} من 5 نجوم`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                star <= review.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-[var(--border)]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-1.5">
        <h4 className="font-bold text-sm text-[var(--foreground)] font-readex">
          {review.title}
        </h4>
        <p className="text-xs sm:text-sm text-[var(--foreground)]/85 leading-relaxed font-sans">
          {review.comment}
        </p>
      </div>

      {/* Recommendation and Helpful Vote Row */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)]/60 text-xs text-[var(--muted-foreground)]">
        <div>
          {review.recommended ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-[var(--accent-coral)] font-semibold">
              <ThumbsUp className="w-3 h-3" />
              <span>يوصي بهذا المنتج للمكاتب</span>
            </span>
          ) : (
            <span className="text-[11px] text-[var(--muted-foreground)]">
              لا يوصي بالمنتج للاستخدام الحالي
            </span>
          )}
        </div>

        {/* Helpful button */}
        <button
          type="button"
          onClick={() => onVoteHelpful(review.id)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
            review.userVotedHelpful
              ? 'bg-[var(--accent-coral)] text-white border-[var(--accent-coral)]'
              : 'bg-[var(--background)] hover:bg-[var(--secondary)] text-[var(--foreground)] border-[var(--border)]'
          }`}
          aria-label={`تقييم هذا الرأي كمفيد، حالياً ${review.helpfulCount} أصوات`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          <span>مفيد ({review.helpfulCount})</span>
        </button>
      </div>
    </article>
  );
}

