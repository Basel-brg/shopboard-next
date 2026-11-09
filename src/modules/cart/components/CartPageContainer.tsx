'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/useCart';
import { useOrders } from '../../orders/context/useOrders';
import { CartItemRow } from './CartItemRow';
import { CheckoutForm } from './CheckoutForm';
import { IconBag, IconTrash } from '@/shared/components/Icons/Icons';

export function CartPageContainer() {
  const router = useRouter();
  const {
    state,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { createOrder } = useOrders();
  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const ok = applyCoupon(couponCode);
    if (ok) setCouponCode('');
  };

  const handleOrderSubmit = (formData: {
    customerName: string;
    customerPhone: string;
    customerCity: string;
    paymentMethod: string;
  }) => {
    createOrder({
      ...formData,
      items: state.items.map((item) => ({
        id: item.id,
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: state.subtotal,
      discount: state.discountAmount,
      shipping: state.shipping,
      total: state.total,
    });

    clearCart();
    router.push('/orders');
  };

  if (state.items.length === 0) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center bg-[var(--washi-cream)] rounded-2xl border border-[var(--bamboo-border)]">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bamboo-tan)]/20 text-[var(--charcoal-ink)]">
          <IconBag size={36} />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
          سلة المشتريات فارغة
        </h2>
        <p className="mt-2 text-sm text-[var(--muted-umeboshi)] max-w-sm font-[family-name:var(--font-ibm-plex)]">
          لم تقم بإضافة أي قطع من أثاث أو إكسسوارات الأتيليه بعد.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--charcoal-ink)] px-6 py-2.5 text-sm font-semibold text-[var(--washi-ivory)] hover:bg-[var(--charcoal-deep)] transition-all shadow-sm"
        >
          <span>←</span>
          <span>تصفح كتالوج الأتيليه</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Items Section (Right side in RTL) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--bamboo-border)]">
          <h2 className="text-xl font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
            المنتجات المحددة ({state.count})
          </h2>
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--vermilion-seal)] hover:underline cursor-pointer"
          >
            <IconTrash size={14} />
            <span>تفريغ السلة بالكامل</span>
          </button>
        </div>

        {/* Items List */}
        <ul className="space-y-4" aria-label="قائمة عناصر السلة">
          {state.items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          ))}
        </ul>

        {/* Coupon Code Section */}
        <div className="p-4 rounded-xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--muted-umeboshi)] mb-3">
            قسيمة التخفيض أو الرمز الترويجي
          </h3>
          {state.appliedCoupon ? (
            <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--bamboo-green)] bg-[var(--bamboo-green)]/10 text-[var(--bamboo-green)]">
              <span className="text-sm font-bold font-mono">
                كوبون نشط: {state.appliedCoupon.code} ({state.appliedCoupon.percent}% خصم)
              </span>
              <button
                type="button"
                onClick={removeCoupon}
                className="text-xs text-[var(--vermilion-seal)] hover:underline cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                placeholder="أدخل رمز الكوبون (مثل: AKARI10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1 rounded-lg border border-[var(--bamboo-border)] bg-white px-3.5 py-2 text-sm text-[var(--charcoal-ink)] focus:outline-none focus:ring-1 focus:ring-[var(--charcoal-ink)]"
              />
              <button
                type="submit"
                className="rounded-lg bg-[var(--charcoal-ink)] px-5 py-2 text-xs font-bold text-[var(--washi-ivory)] hover:bg-[var(--charcoal-deep)] transition-colors cursor-pointer"
              >
                تطبيق
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Summary & Checkout Section (Left side in RTL) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Order Totals Card */}
        <div className="p-6 rounded-2xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] space-y-4 shadow-xs">
          <h3 className="text-lg font-bold text-[var(--charcoal-ink)] pb-3 border-b border-[var(--bamboo-border)] font-[family-name:var(--font-readex)]">
            ملخص الحساب
          </h3>

          <div className="space-y-2 text-sm font-[family-name:var(--font-ibm-plex)]">
            <div className="flex justify-between text-[var(--muted-umeboshi)]">
              <span>المجموع الفرعي:</span>
              <span className="font-mono font-semibold text-[var(--charcoal-ink)]">
                {state.subtotal} ر.س
              </span>
            </div>

            {state.discountAmount > 0 && (
              <div className="flex justify-between text-[var(--vermilion-seal)] font-semibold">
                <span>الخصم المطبق:</span>
                <span className="font-mono">- {state.discountAmount} ر.س</span>
              </div>
            )}

            <div className="flex justify-between text-[var(--muted-umeboshi)]">
              <span>الشحن والتوصيل:</span>
              <span className="font-mono">
                {state.shipping === 0 ? (
                  <span className="text-[var(--bamboo-green)] font-semibold">شحن مجاني</span>
                ) : (
                  `${state.shipping} ر.س`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-[var(--bamboo-border)] flex justify-between items-baseline text-base font-bold text-[var(--charcoal-ink)]">
              <span>الإجمالي النهائي:</span>
              <span className="text-2xl font-black font-mono text-[var(--charcoal-ink)]">
                {state.total} ر.س
              </span>
            </div>
          </div>
        </div>

        {/* Embedded Checkout Form */}
        <div className="p-6 rounded-2xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] shadow-xs">
          <CheckoutForm cartState={state} onSubmitOrder={handleOrderSubmit} />
        </div>
      </div>
    </div>
  );
}
