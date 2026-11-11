'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Star,
  MessageSquarePlus,
  RotateCcw,
  AlertCircle,
  SlidersHorizontal,
} from 'lucide-react';
import type {
  Review,
  ReviewFilter,
  ReviewSort,
  CreateReviewInput,
  ReviewsLoadState,
} from '../reviews.types';
import {
  calculateRatingBreakdown,
  filterReviews,
  sortReviews,
} from '../reviews.logic';
import {
  fetchReviewsByProductId,
  submitReview,
  toggleReviewHelpful,
} from '../reviews.api';
import { RatingBreakdown } from './RatingBreakdown';
import { ReviewCard } from './ReviewCard';
import { WriteReviewModal } from './WriteReviewModal';
import { ReviewsSkeleton } from './ReviewsSkeleton';
import { Button } from '@/components/ui/button';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface ReviewsSectionProps {
  productId: number;
  productName: string;
}

export function ReviewsSection({ productId, productName }: ReviewsSectionProps) {
  const [loadState, setLoadState] = useState<ReviewsLoadState>({ status: 'loading' });
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [activeFilter, setActiveFilter] = useState<ReviewFilter>('all');
  const [activeSort, setActiveSort] = useState<ReviewSort>('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { showToast } = useToast();

  const loadReviews = useCallback(async () => {
    setLoadState({ status: 'loading' });
    try {
      const data = await fetchReviewsByProductId(productId);
      setAllReviews(data);
      if (data.length === 0) {
        setLoadState({ status: 'empty', reason: 'no-reviews' });
      } else {
        setLoadState({ status: 'success', data });
      }
    } catch {
      setLoadState({
        status: 'error',
        message: 'تعذر تحميل التقييمات حالياً، يرجى المحاولة مرة أخرى.',
      });
    }
  }, [productId]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleVoteHelpful = async (reviewId: string) => {
    try {
      const { updatedReviews } = await toggleReviewHelpful(productId, reviewId);
      setAllReviews(updatedReviews);
      showToast('شكراً لمشاركتك برأيك');
    } catch {
      showToast('تعذر تسجيل التصويت');
    }
  };

  const handleCreateReview = async (input: CreateReviewInput) => {
    const newRev = await submitReview(input);
    const updated = [newRev, ...allReviews];
    setAllReviews(updated);
    setLoadState({ status: 'success', data: updated });
    showToast('تم نشر تقييمك بنجاح! شكراً لمشاركتك');
  };

  // Derive filtered and sorted reviews purely
  const filtered = filterReviews(allReviews, activeFilter);
  const displayedReviews = sortReviews(filtered, activeSort);
  const breakdown = calculateRatingBreakdown(allReviews);

  return (
    <section className="mt-12 pt-10 border-t border-[var(--border)] space-y-8" aria-label="تقييمات وآراء العملاء">
      {/* 1. Header & Add Review Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-readex text-[var(--foreground)] tracking-tight flex items-center gap-2">
            <span>تقييمات وآراء العملاء</span>
            {allReviews.length > 0 && (
              <span className="text-xs font-mono font-normal text-[var(--muted-foreground)]">
                ({allReviews.length})
              </span>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
            آراء وتجارب حقيقية من مقتني منتجات ShopBoard المعتمدين
          </p>
        </div>

        <Button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="rounded-full bg-[var(--accent-coral)] hover:bg-[#d95232] text-white text-xs sm:text-sm font-bold gap-2 cursor-pointer shadow-xs self-start sm:self-auto"
        >
          <MessageSquarePlus className="w-4 h-4" />
          <span>كتابة تقييم</span>
        </Button>
      </div>

      {/* 2. Mandatory 4-State UI Lifecycle */}
      {loadState.status === 'loading' && <ReviewsSkeleton />}

      {loadState.status === 'error' && (
        <div className="p-8 rounded-3xl bg-[var(--card)] border border-red-500/30 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 mx-auto rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)]">
              تعذر عرض التقييمات
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              {loadState.message}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={loadReviews}
            className="rounded-full text-xs gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة المحاولة</span>
          </Button>
        </div>
      )}

      {loadState.status === 'empty' && (
        <div className="p-10 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] flex items-center justify-center">
            <Star className="w-7 h-7" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className="text-base font-bold text-[var(--foreground)] font-readex">
              كن أول من يقيّم هذا المنتج
            </h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              شارك تجربتك مع هذا المنتج وساعد الآخرين في تجهيز مساحات عملهم بأفضل الاختيارات.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-full bg-[var(--accent-coral)] text-white text-xs font-bold px-6 cursor-pointer"
          >
            أضف أول تقييم
          </Button>
        </div>
      )}

      {loadState.status === 'success' && (
        <div className="space-y-8">
          {/* Breakdown Component */}
          <RatingBreakdown data={breakdown} />

          {/* Controls: Filter Pills & Sorting */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[var(--muted-foreground)] font-semibold ml-2 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>تصفية:</span>
              </span>

              {[
                { key: 'all', label: `الكل (${allReviews.length})` },
                { key: '5', label: `5 نجوم (${breakdown.distribution[5] || 0})` },
                { key: '4', label: `4 نجوم (${breakdown.distribution[4] || 0})` },
                { key: 'positive', label: 'التقييمات الإيجابية' },
                { key: 'critical', label: 'ملاحظات وتطوير' },
              ].map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key as ReviewFilter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeFilter === f.key
                      ? 'bg-[var(--accent-coral)] text-white font-bold shadow-xs'
                      : 'bg-[var(--background)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Sorter Dropdown */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <label htmlFor="reviews-sort" className="text-[var(--muted-foreground)] whitespace-nowrap">
                الترتيب حسب:
              </label>
              <select
                id="reviews-sort"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as ReviewSort)}
                className="h-8 rounded-xl border border-[var(--border)] bg-[var(--background)] px-2.5 text-xs text-[var(--foreground)] focus:outline-hidden cursor-pointer"
              >
                <option value="newest">الأحدث أولاً</option>
                <option value="helpful">الأكثر إفادة</option>
                <option value="highest">الأعلى تقييماً</option>
                <option value="lowest">الأقل تقييماً</option>
              </select>
            </div>
          </div>

          {/* List of Reviews or No-Match Empty State */}
          {displayedReviews.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] text-center space-y-3">
              <p className="text-xs text-[var(--muted-foreground)]">
                لا توجد تقييمات تطابق التصنيف المحدد.
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setActiveFilter('all')}
                className="rounded-full text-xs"
              >
                عرض كافة التقييمات
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedReviews.map((rev) => (
                <ReviewCard
                  key={rev.id}
                  review={rev}
                  onVoteHelpful={handleVoteHelpful}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. Interactive Write Review Modal */}
      <WriteReviewModal
        productId={productId}
        productName={productName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateReview}
      />
    </section>
  );
}

