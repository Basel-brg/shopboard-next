import { describe, it, expect } from 'vitest';
import { calculateBundlePrice, filterSetups } from '@/modules/setups/setups.logic';
import type { Product } from '@/modules/products/products.types';
import type { DeskSetup } from '@/modules/setups/setups.types';

const mockProductA: Product = {
  id: 1,
  sku: 'A',
  name: 'Product A',
  category: 'Tech',
  price: 200,
  image: '/test.jpg',
};

const mockProductB: Product = {
  id: 2,
  sku: 'B',
  name: 'Product B',
  category: 'Tech',
  price: 300,
  image: '/test.jpg',
};

describe('calculateBundlePrice', () => {
  it('calculates bundle with 15% discount when at least 2 items are selected', () => {
    const res = calculateBundlePrice([mockProductA, mockProductB], 15);
    expect(res.selectedCount).toBe(2);
    expect(res.totalOriginalPrice).toBe(500);
    expect(res.discountAmount).toBe(75); // 15% of 500
    expect(res.finalPrice).toBe(425);
  });

  it('does not apply bundle discount when only 1 item is selected', () => {
    const res = calculateBundlePrice([mockProductA], 15);
    expect(res.selectedCount).toBe(1);
    expect(res.totalOriginalPrice).toBe(200);
    expect(res.discountAmount).toBe(0);
    expect(res.finalPrice).toBe(200);
  });

  it('handles empty selections gracefully', () => {
    const res = calculateBundlePrice([], 15);
    expect(res.selectedCount).toBe(0);
    expect(res.totalOriginalPrice).toBe(0);
    expect(res.discountAmount).toBe(0);
    expect(res.finalPrice).toBe(0);
  });
});

describe('filterSetups', () => {
  const mockSetups: DeskSetup[] = [
    {
      id: 'dev-1',
      title: 'Dev Setup',
      subtitle: 'Sub',
      category: 'developer',
      categoryLabel: 'مطورين',
      description: 'Desc',
      image: '/img1.jpg',
      items: [],
      bundleDiscountPct: 15,
      tags: ['code'],
      vibe: 'Dark',
    },
    {
      id: 'creator-1',
      title: 'Creator Setup',
      subtitle: 'Sub',
      category: 'creator',
      categoryLabel: 'صناع محتوى',
      description: 'Desc',
      image: '/img2.jpg',
      items: [],
      bundleDiscountPct: 15,
      tags: ['design'],
      vibe: 'Warm',
    },
  ];

  it('filters by category when specified', () => {
    const res = filterSetups(mockSetups, 'developer');
    expect(res.length).toBe(1);
    expect(res[0].id).toBe('dev-1');
  });

  it('returns all setups when category is all or empty', () => {
    expect(filterSetups(mockSetups, 'all').length).toBe(2);
    expect(filterSetups(mockSetups, 'الكل').length).toBe(2);
  });
});

