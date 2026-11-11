export interface Review {
  id: string;
  productId: number;
  authorName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string; // ISO or formatted date e.g. "2026-10-15"
  verifiedPurchase: boolean;
  helpfulCount: number;
  recommended: boolean;
  userVotedHelpful?: boolean;
}

export interface RatingBreakdownData {
  average: number;
  totalCount: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  recommendedPercentage: number;
}

export type ReviewFilter = 'all' | '5' | '4' | '3' | 'positive' | 'critical';
export type ReviewSort = 'newest' | 'highest' | 'lowest' | 'helpful';

export interface CreateReviewInput {
  productId: number;
  authorName: string;
  rating: number;
  title: string;
  comment: string;
  recommended: boolean;
}

export type ReviewsLoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Review[] }
  | { status: 'error'; message: string }
  | { status: 'empty'; reason: 'no-reviews' | 'no-match' };

