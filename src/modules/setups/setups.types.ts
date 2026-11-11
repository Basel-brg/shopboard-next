import type { Product } from '../products/products.types';

export interface SetupItem {
  productId: number;
  product: Product;
  isRequired?: boolean;
}

export interface DeskSetup {
  id: string;
  title: string;
  subtitle: string;
  category: 'developer' | 'creator' | 'minimalist' | 'executive';
  categoryLabel: string;
  description: string;
  image: string;
  items: SetupItem[];
  bundleDiscountPct: number;
  tags: string[];
  vibe: string;
}

export interface SetupBundleCalculation {
  selectedCount: number;
  totalOriginalPrice: number;
  discountAmount: number;
  finalPrice: number;
}

