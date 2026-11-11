'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/useCart';
import { CartItemRow } from './CartItemRow';
import { CheckoutForm } from './CheckoutForm';
import { OrderConfirmationModal, type ConfirmedOrderData } from './OrderConfirmationModal';
import { IconBag, IconTrash } from '@/shared/components/Icons/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrderData | null>(null);
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
    const orderData: ConfirmedOrderData = {
      orderNumber: 'SB-' + Math.floor(1000 + Math.random() * 9000),
      customerName: formData.customerName,
      customerCity: formData.customerCity,
      itemsCount: state.count,
      total: state.total,
    };

    setConfirmedOrder(orderData);
    clearCart();
  };

  if (state.items.length === 0) {
    return (
      <>
        {confirmedOrder && (
          <OrderConfirmationModal
            order={confirmedOrder}
            onClose={() => {
              setConfirmedOrder(null);
              router.push('/products');
            }}
          />
        )}
        <Card className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center bg-[var(--washi-cream)] border-[var(--bamboo-border)]">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bamboo-tan)]/20 text-[var(--charcoal-ink)]">
            <IconBag size={36} />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
            سلة المشتريات فارغة
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-umeboshi)] max-w-sm font-[family-name:var(--font-ibm-plex)]">
            لم تقم بإضافة أي قطع من أثاث أو إكسسوارات متجر ShopBoard بعد.
          </p>
          <Button asChild className="mt-6 gap-2 bg-[var(--charcoal-ink)] hover:bg-[var(--charcoal-deep)] text-[var(--washi-ivory)]">
            <Link href="/products">
              <span>←</span>
              <span>تصفح كتالوج ShopBoard</span>
            </Link>
          </Button>
        </Card>
      </>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Items Section (Right side in RTL) */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--bamboo-border)]">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              المنتجات المحددة
            </h2>
            <Badge variant="secondary" className="font-mono">
              {state.count}
            </Badge>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-xs text-[var(--vermilion-seal)] hover:text-[var(--vermilion-seal)] hover:bg-[var(--vermilion-seal)]/10 gap-1.5 cursor-pointer h-8"
          >
            <IconTrash size={14} />
            <span>تفريغ السلة بالكامل</span>
          </Button>
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
        <Card className="border-[var(--bamboo-border)] bg-[var(--washi-cream)] shadow-none">
          <CardContent className="p-4 space-y-3">
            <label
              htmlFor="coupon-code-input"
              className="block text-xs font-bold uppercase tracking-wider text-[var(--muted-umeboshi)]"
            >
              قسيمة التخفيض أو الرمز الترويجي
            </label>
            {state.appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--bamboo-green)] bg-[var(--bamboo-green)]/10 text-[var(--bamboo-green)]">
                <span className="text-sm font-bold font-mono">
                  كوبون نشط: {state.appliedCoupon.code} ({state.appliedCoupon.percent}% خصم)
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeCoupon}
                  className="h-7 text-xs text-[var(--vermilion-seal)] hover:text-[var(--vermilion-seal)] hover:bg-[var(--vermilion-seal)]/10"
                >
                  إلغاء
                </Button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <Input
                  id="coupon-code-input"
                  type="text"
                  placeholder="أدخل رمز الكوبون (مثل: SHOP20)"
                  aria-label="أدخل رمز الكوبون"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-white border-[var(--bamboo-border)]"
                />
                <Button
                  type="submit"
                  className="bg-[var(--charcoal-ink)] hover:bg-[var(--charcoal-deep)] text-[var(--washi-ivory)] px-5 text-xs font-bold"
                >
                  تطبيق
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Summary & Checkout Section (Left side in RTL) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Order Totals Card */}
        <Card className="border-[var(--bamboo-border)] bg-[var(--washi-cream)] shadow-xs">
          <CardHeader className="pb-3 border-b border-[var(--bamboo-border)]">
            <CardTitle className="text-lg font-bold text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
              ملخص الحساب
            </CardTitle>
          </CardHeader>

          <CardContent className="pt-4 space-y-3 text-sm font-[family-name:var(--font-ibm-plex)]">
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
                  <Badge variant="secondary" className="bg-[var(--bamboo-green)]/15 text-[var(--bamboo-green)] font-semibold">
                    شحن مجاني
                  </Badge>
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
          </CardContent>
        </Card>

        {/* Embedded Checkout Form */}
        <div className="p-6 rounded-2xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] shadow-xs">
          <CheckoutForm onSubmitOrder={handleOrderSubmit} />
        </div>
      </div>
    </div>
  );
}
