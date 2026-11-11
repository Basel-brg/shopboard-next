import type {
  Review,
  RatingBreakdownData,
  ReviewFilter,
  ReviewSort,
  CreateReviewInput,
} from './reviews.types';

/**
 * Calculates average rating, total count, star distribution, and recommendation percentage.
 * Pure function: deterministic, zero DOM, zero React.
 */
export function calculateRatingBreakdown(reviews: readonly Review[]): RatingBreakdownData {
  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  if (!reviews || reviews.length === 0) {
    return {
      average: 5.0,
      totalCount: 0,
      distribution,
      recommendedPercentage: 100,
    };
  }

  let sum = 0;
  let recommendedCount = 0;

  for (const r of reviews) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] = (distribution[star] || 0) + 1;
    sum += r.rating;
    if (r.recommended) {
      recommendedCount += 1;
    }
  }

  const average = Number((sum / reviews.length).toFixed(1));
  const recommendedPercentage = Math.round((recommendedCount / reviews.length) * 100);

  return {
    average,
    totalCount: reviews.length,
    distribution,
    recommendedPercentage,
  };
}

/**
 * Filters reviews based on selected filter criteria without mutating the original array.
 */
export function filterReviews(reviews: readonly Review[], filter: ReviewFilter): Review[] {
  const safeList = [...reviews];

  switch (filter) {
    case '5':
      return safeList.filter((r) => r.rating === 5);
    case '4':
      return safeList.filter((r) => r.rating === 4);
    case '3':
      return safeList.filter((r) => r.rating === 3);
    case 'positive':
      return safeList.filter((r) => r.rating >= 4);
    case 'critical':
      return safeList.filter((r) => r.rating <= 3);
    case 'all':
    default:
      return safeList;
  }
}

/**
 * Sorts reviews deterministically without mutating the original array.
 */
export function sortReviews(reviews: readonly Review[], sort: ReviewSort): Review[] {
  const safeList = [...reviews];

  switch (sort) {
    case 'highest':
      return safeList.sort((a, b) => b.rating - a.rating || b.helpfulCount - a.helpfulCount);
    case 'lowest':
      return safeList.sort((a, b) => a.rating - b.rating || b.helpfulCount - a.helpfulCount);
    case 'helpful':
      return safeList.sort((a, b) => b.helpfulCount - a.helpfulCount || b.rating - a.rating);
    case 'newest':
    default:
      return safeList.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
  }
}

/**
 * Validates a review submission input object.
 */
export function validateReviewInput(input: CreateReviewInput): {
  isValid: boolean;
  errors: Partial<Record<keyof CreateReviewInput, string>>;
} {
  const errors: Partial<Record<keyof CreateReviewInput, string>> = {};

  if (!input.authorName || input.authorName.trim().length < 2) {
    errors.authorName = 'يرجى إدخال اسمك الكريم (حرفين على الأقل)';
  }

  if (!input.rating || input.rating < 1 || input.rating > 5) {
    errors.rating = 'يرجى تحديد تقييم من 1 إلى 5 نجوم';
  }

  if (!input.title || input.title.trim().length < 3) {
    errors.title = 'يرجى كتابة عنوان مختصر لتقييمك (3 أحرف على الأقل)';
  }

  if (!input.comment || input.comment.trim().length < 10) {
    errors.comment = 'يرجى مشاركة تفاصيل تجربتك (10 أحرف على الأقل)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

