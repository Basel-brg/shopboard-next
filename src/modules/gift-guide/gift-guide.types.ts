import type { Product } from '../products/products.types';

export type BudgetTier = 'under-200' | '200-to-500' | 'over-500';
export type RecipientPersona = 'all' | 'developer' | 'creator' | 'executive';

export interface GiftItem {
  id: string;
  product: Product;
  giftTag: string;
  whyItsAGreatGift: string;
  recipientPersona: 'developer' | 'creator' | 'executive';
  budgetTier: BudgetTier;
  recommendedPackaging?: string;
}

export interface GiftFilterOptions {
  tier?: BudgetTier | 'all';
  persona?: RecipientPersona;
}

