import { describe, it, expect } from 'vitest';
import {
  calculateRatingBreakdown,
  filterReviews,
  sortReviews,
  validateReviewInput,
} from '@/modules/reviews/reviews.logic';
import type { Review, CreateReviewInput } from '@/modules/reviews/reviews.types';

describe('Reviews Logic Unit Tests', () => {
  const sampleReviews: Review[] = [
    {
      id: 'rev-1',
      productId: 1,
      authorName: 'سعود الشمري',
      rating: 5,
      title: 'أفضل كيبورد جربته للبرمجة',
      comment: 'المفاتيح ناعمة جداً وصوتها هادئ ومناسب لبيئة العمل والمكتب.',
      date: '2026-10-10',
      verifiedPurchase: true,
      helpfulCount: 14,
      recommended: true,
    },
    {
      id: 'rev-2',
      productId: 1,
      authorName: 'فيصل الغامدي',
      rating: 4,
      title: 'خامات ممتازة وبطارية قوية',
      comment: 'البطارية جلست معي أسبوعين بدون شحن. تمنيت لو كان فيه كابل إضافي.',
      date: '2026-10-15',
      verifiedPurchase: true,
      helpfulCount: 8,
      recommended: true,
    },
    {
      id: 'rev-3',
      productId: 1,
      authorName: 'طارق الدوسري',
      rating: 3,
      title: 'جيد لكن يحتاج تعود على الارتفاع',
      comment: 'الكيبورد ممتاز تقنياً بس يحتاج مسند معصم عشان ترتاح بالكامل.',
      date: '2026-09-01',
      verifiedPurchase: false,
      helpfulCount: 2,
      recommended: false,
    },
  ];

  it('empty reviews array must return default 5.0 rating and zero counts safely', () => {
    const breakdown = calculateRatingBreakdown([]);
    expect(breakdown.average).toBe(5.0);
    expect(breakdown.totalCount).toBe(0);
    expect(breakdown.recommendedPercentage).toBe(100);
    expect(breakdown.distribution[5]).toBe(0);
  });

  it('populated reviews must calculate accurate weighted average, distribution, and recommendation percentage', () => {
    const breakdown = calculateRatingBreakdown(sampleReviews);
    // (5 + 4 + 3) / 3 = 4.0
    expect(breakdown.average).toBe(4.0);
    expect(breakdown.totalCount).toBe(3);
    expect(breakdown.distribution[5]).toBe(1);
    expect(breakdown.distribution[4]).toBe(1);
    expect(breakdown.distribution[3]).toBe(1);
    expect(breakdown.distribution[2]).toBe(0);
    // 2 out of 3 recommended = 67%
    expect(breakdown.recommendedPercentage).toBe(67);
  });

  it('filtering by star rating or positive/critical must filter accurately without mutating original array', () => {
    const fives = filterReviews(sampleReviews, '5');
    expect(fives.length).toBe(1);
    expect(fives[0].id).toBe('rev-1');

    const positive = filterReviews(sampleReviews, 'positive');
    expect(positive.length).toBe(2);

    const critical = filterReviews(sampleReviews, 'critical');
    expect(critical.length).toBe(1);
    expect(critical[0].id).toBe('rev-3');

    // Original array must remain untouched
    expect(sampleReviews.length).toBe(3);
  });

  it('sorting by newest, highest rating, or helpfulness must order correctly without in-place mutation', () => {
    const byNewest = sortReviews(sampleReviews, 'newest');
    expect(byNewest[0].id).toBe('rev-2'); // 2026-10-15

    const byHelpful = sortReviews(sampleReviews, 'helpful');
    expect(byHelpful[0].id).toBe('rev-1'); // 14 helpful votes

    const byLowest = sortReviews(sampleReviews, 'lowest');
    expect(byLowest[0].id).toBe('rev-3'); // rating 3
  });

  it('validating incomplete review input must return specific error alerts', () => {
    const invalidInput: CreateReviewInput = {
      productId: 1,
      authorName: '',
      rating: 0,
      title: 'أ',
      comment: 'قصير',
      recommended: true,
    };

    const res = validateReviewInput(invalidInput);
    expect(res.isValid).toBe(false);
    expect(res.errors.authorName).toBeDefined();
    expect(res.errors.rating).toBeDefined();
    expect(res.errors.title).toBeDefined();
    expect(res.errors.comment).toBeDefined();
  });

  it('validating complete review input must pass with zero errors', () => {
    const validInput: CreateReviewInput = {
      productId: 1,
      authorName: 'عبدالرحمن الشهري',
      rating: 5,
      title: 'تجربة شرائية استثنائية',
      comment: 'المنتج فاق توقعاتي من حيث جودة التغليف والدقة في التصنيع وسرعة التوصيل.',
      recommended: true,
    };

    const res = validateReviewInput(validInput);
    expect(res.isValid).toBe(true);
    expect(Object.keys(res.errors).length).toBe(0);
  });
});

