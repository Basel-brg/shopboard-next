import { describe, it, expect } from 'vitest';
import {
  classifyProductBudgetTier,
  filterGifts,
  getBudgetTierStats,
} from '@/modules/gift-guide/gift-guide.logic';
import type { GiftItem } from '@/modules/gift-guide/gift-guide.types';
import type { Product } from '@/modules/products/products.types';

const mockProduct = (id: number, price: number): Product => ({
  id,
  name: `Product ${id}`,
  description: 'Test',
  price,
  category: 'accessories',
  image: '/test.jpg',
  rating: 5,
  reviewsCount: 10,
  inStock: true,
});

const mockGifts: GiftItem[] = [
  {
    id: 'g1',
    product: mockProduct(1, 149),
    giftTag: 'هدية سريعة',
    whyItsAGreatGift: 'عملية جداً',
    recipientPersona: 'developer',
    budgetTier: 'under-200',
  },
  {
    id: 'g2',
    product: mockProduct(2, 380),
    giftTag: 'هدية مكتبية مميزة',
    whyItsAGreatGift: 'أناقة يومية',
    recipientPersona: 'creator',
    budgetTier: '200-to-500',
  },
  {
    id: 'g3',
    product: mockProduct(3, 1450),
    giftTag: 'هدية ملكية',
    whyItsAGreatGift: 'ترقية ثورية لبيئة العمل',
    recipientPersona: 'developer',
    budgetTier: 'over-500',
  },
];

describe('Gift Guide Logic Unit Tests', () => {
  it('classifyProductBudgetTier must classify prices under 200 as under-200', () => {
    expect(classifyProductBudgetTier(199)).toBe('under-200');
    expect(classifyProductBudgetTier(50)).toBe('under-200');
  });

  it('classifyProductBudgetTier must classify prices 200-500 as 200-to-500', () => {
    expect(classifyProductBudgetTier(200)).toBe('200-to-500');
    expect(classifyProductBudgetTier(350)).toBe('200-to-500');
    expect(classifyProductBudgetTier(500)).toBe('200-to-500');
  });

  it('classifyProductBudgetTier must classify prices over 500 as over-500', () => {
    expect(classifyProductBudgetTier(501)).toBe('over-500');
    expect(classifyProductBudgetTier(1200)).toBe('over-500');
  });

  it('filterGifts must filter by budget tier accurately', () => {
    const under200 = filterGifts(mockGifts, { tier: 'under-200' });
    expect(under200).toHaveLength(1);
    expect(under200[0].id).toBe('g1');

    const all = filterGifts(mockGifts, { tier: 'all' });
    expect(all).toHaveLength(3);
  });

  it('filterGifts must filter by persona accurately without mutation', () => {
    const creators = filterGifts(mockGifts, { persona: 'creator' });
    expect(creators).toHaveLength(1);
    expect(creators[0].id).toBe('g2');

    // Original array intact
    expect(mockGifts).toHaveLength(3);
  });

  it('getBudgetTierStats must return correct counts across tiers', () => {
    const stats = getBudgetTierStats(mockGifts);
    expect(stats['under-200']).toBe(1);
    expect(stats['200-to-500']).toBe(1);
    expect(stats['over-500']).toBe(1);
  });
});

