import type { Review, CreateReviewInput } from './reviews.types';

const INITIAL_REVIEWS: Record<number, Review[]> = {
  1: [
    {
      id: 'rev-101',
      productId: 1,
      authorName: 'سعود الشمري',
      rating: 5,
      title: 'أفضل كيبورد ميكانيكي مخصص للمبرمجين',
      comment:
        'المفاتيح الخطية ناعمة جداً ومسبقة التشحيم، لا يوجد أي صوت رنين معدني. الاتصال اللاسلكي فوري مع نظام macOS ونظام Windows، وخامات الـ PBT لا تجمع الزيوت إطلاقاً.',
      date: '2026-10-14',
      verifiedPurchase: true,
      helpfulCount: 24,
      recommended: true,
    },
    {
      id: 'rev-102',
      productId: 1,
      authorName: 'فيصل الغامدي',
      rating: 5,
      title: 'خامات يابانية راقية وتجربة كتابة إدمانية',
      comment:
        'الوزن ثقيل وثابت على سطح المكتب، الإضاءة خافتة ومريحة للعين، والتبديل السريع Hot-Swap ميزة رائعة لمن يرغب في تخصيص المفاتيح لاحقاً.',
      date: '2026-10-02',
      verifiedPurchase: true,
      helpfulCount: 16,
      recommended: true,
    },
    {
      id: 'rev-103',
      productId: 1,
      authorName: 'منى العتيبي',
      rating: 4,
      title: 'جودة استثنائية وبطارية تدوم لأسابيع',
      comment:
        'التصميم المينيماليست رائع جداً. الشيء الوحيد الذي تمنيته هو وجود مسند معصم متناسق في الصندوق، لكني طلبت اللباد الصوفي المرفق واكتمل السيت أب.',
      date: '2026-09-18',
      verifiedPurchase: true,
      helpfulCount: 9,
      recommended: true,
    },
  ],
  2: [
    {
      id: 'rev-201',
      productId: 2,
      authorName: 'عبدالرحمن الشهري',
      rating: 5,
      title: 'عزل الضوضاء خارق والصوت نقي واستوديو حقيقي',
      comment:
        'العزل الهجين يجعلك في عالم آخر تماماً أثناء جلسات العمل وكتابة الأكواد. لا يوجد أي ضغط مزعج على الأذنين حتى بعد 6 ساعات متواصلة.',
      date: '2026-10-18',
      verifiedPurchase: true,
      helpfulCount: 31,
      recommended: true,
    },
    {
      id: 'rev-202',
      productId: 2,
      authorName: 'ياسر القحطاني',
      rating: 5,
      title: 'استجابة الباس دقيقة جداً للمونتاج والصوتيات',
      comment:
        'سماعة مرجعية مريحة وتستحق كل ريال. الميكروفون المدمج للمكالمات صوته واضح وخالٍ من الصدى.',
      date: '2026-10-05',
      verifiedPurchase: true,
      helpfulCount: 18,
      recommended: true,
    },
  ],
  3: [
    {
      id: 'rev-301',
      productId: 3,
      authorName: 'نواف الدوسري',
      rating: 5,
      title: 'تحفة معمارية تضيف وقاراً فورياً للمكتب',
      comment:
        'النحاس المصقول ثقيل ومصمت بجودة عالية جداً، والإضاءة الدافئة غير الوامضة مريحة للغاية للقراءة والعمل الليلي.',
      date: '2026-10-11',
      verifiedPurchase: true,
      helpfulCount: 19,
      recommended: true,
    },
  ],
  4: [
    {
      id: 'rev-401',
      productId: 4,
      authorName: 'خالد السبيعي',
      rating: 5,
      title: 'أنقذ معصمي من آلام ساعات العمل الطويلة',
      comment:
        'الزاوية 57 درجة طبيعية جداً لموضع اليد، وعجلة التمرير المعدنية دقيقة وناعمة الملمس.',
      date: '2026-10-08',
      verifiedPurchase: true,
      helpfulCount: 22,
      recommended: true,
    },
  ],
  6: [
    {
      id: 'rev-601',
      productId: 6,
      authorName: 'بندر الشريف',
      rating: 5,
      title: 'خشب بلوط حقيقي وتشطيب استثنائي',
      comment:
        'الرف عريض واستوعب شاشتي الـ 34 بوصة بكل ثبات مع فراغ سفلي مثالي لإخفاء الكيبورد والماوس عند نهاية اليوم.',
      date: '2026-10-12',
      verifiedPurchase: true,
      helpfulCount: 15,
      recommended: true,
    },
  ],
};

const STORAGE_KEY_PREFIX = 'shopboard_product_reviews_';

export async function fetchReviewsByProductId(productId: number): Promise<Review[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 80));

  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(`${STORAGE_KEY_PREFIX}${productId}`);
    if (cached) {
      try {
        return JSON.parse(cached) as Review[];
      } catch {
        // ignore parse error and fallback
      }
    }
  }

  const base = INITIAL_REVIEWS[productId] || [
    {
      id: `rev-default-${productId}`,
      productId,
      authorName: 'عميل موثّق',
      rating: 5,
      title: 'جودة استثنائية وخامات مطابقة للوصف',
      comment:
        'المنتج وصل بتغليف آمن ومحكم للغاية، الخامات ملموسة الجودة وتستحق الاقتناء ضمن تجهيزات المكتب.',
      date: '2026-10-16',
      verifiedPurchase: true,
      helpfulCount: 5,
      recommended: true,
    },
  ];

  return base;
}

export async function submitReview(input: CreateReviewInput): Promise<Review> {
  await new Promise((resolve) => setTimeout(resolve, 120));

  const newReview: Review = {
    id: `rev-${Date.now()}`,
    productId: input.productId,
    authorName: input.authorName.trim(),
    rating: input.rating,
    title: input.title.trim(),
    comment: input.comment.trim(),
    date: new Date().toISOString().split('T')[0],
    verifiedPurchase: true,
    helpfulCount: 0,
    recommended: input.recommended,
  };

  if (typeof window !== 'undefined') {
    const current = await fetchReviewsByProductId(input.productId);
    const updated = [newReview, ...current];
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${input.productId}`,
      JSON.stringify(updated)
    );
  }

  return newReview;
}

export async function toggleReviewHelpful(
  productId: number,
  reviewId: string
): Promise<{ updatedReviews: Review[]; newCount: number }> {
  const current = await fetchReviewsByProductId(productId);
  let newCount = 0;

  const updated = current.map((rev) => {
    if (rev.id === reviewId) {
      const isVoted = rev.userVotedHelpful;
      const count = isVoted ? rev.helpfulCount - 1 : rev.helpfulCount + 1;
      newCount = Math.max(0, count);
      return {
        ...rev,
        helpfulCount: newCount,
        userVotedHelpful: !isVoted,
      };
    }
    return rev;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${productId}`,
      JSON.stringify(updated)
    );
  }

  return { updatedReviews: updated, newCount };
}

