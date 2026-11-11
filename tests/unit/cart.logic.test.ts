import { describe, it, expect } from 'vitest';
import { calculateCartState, VALID_COUPONS } from '../../src/modules/cart/cart.logic';
import type { CartItem } from '../../src/modules/cart/cart.types';

describe('cart.logic', () => {
  it('cart subtotal under 300 SAR must charge 25 SAR shipping and calculate item count accurately', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'كيبورد',
        price: 100,
        category: 'لوحات مفاتيح',
        image: '',
        quantity: 2,
      },
    ];

    // subtotal = 200 (< 300, so shipping = 25)
    const state = calculateCartState(items, null);
    expect(state.count).toBe(2);
    expect(state.subtotal).toBe(200);
    expect(state.discountAmount).toBe(0);
    expect(state.shipping).toBe(25);
    expect(state.total).toBe(225);
    expect(state.remainingForFreeShipping).toBe(100);
  });

  it('cart subtotal reaching or exceeding 300 SAR threshold must unlock free shipping with zero charge', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'شاشة',
        price: 400,
        category: 'شاشات',
        image: '',
        quantity: 1,
      },
    ];

    const state = calculateCartState(items, null);
    expect(state.subtotal).toBe(400);
    expect(state.shipping).toBe(0);
    expect(state.remainingForFreeShipping).toBe(0);
    expect(state.shippingProgress).toBe(100);
    expect(state.total).toBe(400);
  });

  it('valid 20 percent coupon must discount the cart subtotal by 20 percent', () => {
    const items: CartItem[] = [
      {
        id: 1,
        name: 'سماعة',
        price: 500,
        category: 'صوتيات',
        image: '',
        quantity: 1,
      },
    ];

    const coupon = VALID_COUPONS.SHOP20; // 20%
    const state = calculateCartState(items, coupon);
    expect(state.subtotal).toBe(500);
    expect(state.discountAmount).toBe(100);
    // discounted = 400 >= 300 -> shipping = 0
    expect(state.shipping).toBe(0);
    expect(state.total).toBe(400);
  });
});
