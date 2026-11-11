import type { BudgetTier, GiftFilterOptions, GiftItem } from './gift-guide.types';

/**
 * Classifies a price into one of the 3 gift budget tiers
 */
export function classifyProductBudgetTier(price: number): BudgetTier {
  if (price < 200) {
    return 'under-200';
  }
  if (price <= 500) {
    return '200-to-500';
  }
  return 'over-500';
}

/**
 * Filters gift items by budget tier and/or recipient persona without mutating
 */
export function filterGifts(
  items: readonly GiftItem[],
  filters: GiftFilterOptions,
): GiftItem[] {
  const { tier = 'all', persona = 'all' } = filters;

  return items.filter((item) => {
    const matchesTier = tier === 'all' || item.budgetTier === tier;
    const matchesPersona = persona === 'all' || item.recipientPersona === persona;
    return matchesTier && matchesPersona;
  });
}

/**
 * Counts items in each budget tier
 */
export function getBudgetTierStats(
  items: readonly GiftItem[],
): Record<BudgetTier, number> {
  const counts: Record<BudgetTier, number> = {
    'under-200': 0,
    '200-to-500': 0,
    'over-500': 0,
  };

  for (const item of items) {
    counts[item.budgetTier] = (counts[item.budgetTier] || 0) + 1;
  }

  return counts;
}
