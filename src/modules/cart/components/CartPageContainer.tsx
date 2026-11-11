'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/useCart';
import { CartItemRow } from './CartItemRow';
import { CheckoutForm } from './CheckoutForm';
import { OrderConfirmationModal, type ConfirmedOrderData } from './OrderConfirmationModal';
import { IconTrash } from '@/shared/components/Icons/Icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Truck, Tag, Sparkles } from 'lucide-react';

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

  const FREE_SHIPPING_THRESHOLD = 300;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - state.subtotal);
  const freeShippingProgress = Math.min(100, (state.subtotal / FREE_SHIPPING_THRESHOLD) * 100);

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

        <div className="py-20 text-center max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/20 flex items-center justify-center shadow-xs">
            <ShoppingBag className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-readex text-[var(--foreground)]">
              سلة المشتريات فارغة
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              لم تقم بإضافة أي قطع بعد. استكشف بيئات العمل المنسقة أو تصفح الكتالوج لاختيار ما يناسب مكتبك.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/setups"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--accent-coral)] text-white text-xs sm:text-sm font-bold shadow-xs hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              استكشف بيئات العمل (Shop The Look)
            </Link>
            <Link
              href="/products"
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] text-xs sm:text-sm font-semibold hover:bg-[var(--secondary)] transition-colors whitespace-nowrap"
            >
              تصفح كتالوج ShopBoard
            </Link>
          </div>
        </div>
      </>
    );
  }

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

      {/* Free Shipping Progress Alert */}
      <div className="mb-8 p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[var(--accent-coral)]" />
            {remainingForFreeShipping > 0 ? (
              <span>
                أضف بقيمة <strong className="text-[var(--accent-coral)] font-mono">{remainingForFreeShipping} ر.س</strong> إضافية للحصول على <strong className="text-emerald-600">شحن مجاني</strong>!
              </span>
            ) : (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span>مبروك! لقد حصلت على شحن مجاني لكافة مدن المملكة</span>
              </span>
            )}
          </div>
          <span className="font-mono text-[var(--muted-foreground)]">
            {state.subtotal} / {FREE_SHIPPING_THRESHOLD} ر.س
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[var(--secondary)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent-coral)] transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Items List & Coupon */}
        <div className="lg:col-span-7 space-y-6">
          {/* Header & Clear Button */}
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold font-readex text-[var(--foreground)]">
                المنتجات المحددة
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/20">
                {state.count}
              </span>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 gap-1.5 cursor-pointer h-8"
            >
              <IconTrash size={14} />
              <span>تفريغ السلة بالكامل</span>
            </Button>
          </div>

          {/* Items List */}
          <ul className="space-y-3" aria-label="قائمة عناصر السلة">
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
          <Card className="rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
            <CardContent className="p-4 space-y-3">
              <label
                htmlFor="coupon-code-input"
                className="block text-xs font-bold text-[var(--foreground)] flex items-center gap-1.5"
              >
                <Tag className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
                <span>قسيمة التخفيض أو الرمز الترويجي</span>
              </label>

              {state.appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-bold font-mono">
                      كوبون نشط: {state.appliedCoupon.code} (خصم {state.appliedCoupon.percent}%)
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeCoupon}
                    className="h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
                  >
                    إلغاء الكوبون
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <Input
                    id="coupon-code-input"
                    type="text"
                    placeholder="أدخل رمز الكوبون (مثل: WELCOME10)"
                    aria-label="أدخل رمز الكوبون"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-[var(--background)] border-[var(--border)] text-xs sm:text-sm"
                  />
                  <Button
                    type="submit"
                    className="px-5 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs sm:text-sm font-bold hover:opacity-90 cursor-pointer"
                  >
                    تطبيق
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column (5 cols): Order Summary & Checkout Form */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* Order Summary Card */}
          <Card className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xs space-y-4">
            <CardHeader className="p-0 pb-3 border-b border-[var(--border)]">
              <CardTitle className="text-base font-bold font-readex text-[var(--foreground)]">
                ملخص الطلب والحساب
              </CardTitle>
            </CardHeader>

            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>المجموع الفرعي ({state.count} قطع):</span>
                <span className="font-mono font-bold text-[var(--foreground)]">{state.subtotal} ر.س</span>
              </div>

              {state.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>قيمة الخصم</span>
                  </span>
                  <span className="font-mono">-{state.discountAmount} ر.س</span>
                </div>
              )}

              <div className="flex justify-between text-[var(--muted-foreground)]">
                <span>قيمة الشحن والتوصيل:</span>
                <span className="font-mono font-bold text-[var(--foreground)]">
                  {state.shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">مجاني</span>
                  ) : (
                    `${state.shipping} ر.س`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-[var(--foreground)] block">
                    المجموع النهائي:
                  </span>
                  <span className="text-[11px] text-[var(--muted-foreground)]">
                    شامل ضريبة القيمة المضافة (15%)
                  </span>
                </div>
                <div className="text-left">
                  <span className="text-2xl font-black font-readex text-[var(--accent-coral)]">
                    {state.total}
                  </span>
                  <span className="text-xs font-bold text-[var(--foreground)] mr-1">ر.س</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Checkout Form */}
          <CheckoutForm onSubmitOrder={handleOrderSubmit} />
        </div>
      </div>
    </>
  );
}
