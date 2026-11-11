import type { Product } from '../products/products.types';
import type { DeskSetup, SetupBundleCalculation } from './setups.types';

/**
 * Calculates bundle totals with discount
 */
export function calculateBundlePrice(
  selectedProducts: readonly Product[],
  discountPct: number = 0,
): SetupBundleCalculation {
  const selectedCount = selectedProducts.length;
  const totalOriginalPrice = selectedProducts.reduce((sum, p) => sum + p.price, 0);

  // Discount applies when at least 2 items are selected
  const activeDiscountPct = selectedCount >= 2 ? Math.max(0, Math.min(100, discountPct)) : 0;
  const discountAmount = Math.round((totalOriginalPrice * activeDiscountPct) / 100);
  const finalPrice = Math.max(0, totalOriginalPrice - discountAmount);

  return {
    selectedCount,
    totalOriginalPrice,
    discountAmount,
    finalPrice,
  };
}

/**
 * Filters setups by category or returns all
 */
export function filterSetups(
  setups: readonly DeskSetup[],
  category: string = 'all',
): DeskSetup[] {
  if (!category || category === 'all' || category === 'الكل') {
    return [...setups];
  }
  return setups.filter((s) => s.category === category);
}

