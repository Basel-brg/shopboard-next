'use client';

import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import { validateInput } from '../../../shared/validation/validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface CheckoutFormProps {
  onSubmitOrder: (formData: {
    customerName: string;
    customerPhone: string;
    customerCity: string;
    paymentMethod: string;
  }) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmitOrder }) => {
  const { state: cartState } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameErr = validateInput('name', name);
    if (nameErr) newErrors.name = nameErr;

    const phoneErr = validateInput('phone', phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const cityErr = validateInput('city', city);
    if (cityErr) newErrors.city = cityErr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmitOrder({
      customerName: name,
      customerPhone: phone,
      customerCity: city,
      paymentMethod,
    });
  };

  return (
    <Card className="checkout-card p-6" onContextMenu={(e) => e.stopPropagation()}>
      <CardHeader className="p-0 pb-4">
        <CardTitle className="text-xl font-bold font-[family-name:var(--font-readex)]">
          بيانات التوصيل والدفع
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <form id="checkout-form" className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="customer-name" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
              الاسم الثلاثي:
            </label>
            <Input
              type="text"
              id="customer-name"
              name="name"
              autoComplete="name"
              required
              placeholder="مثال: خالد العتيبي"
              value={name}
              hasError={Boolean(errors.name)}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
            />
            {errors.name && (
              <span className="field-error text-xs text-[var(--vermilion-seal)] mt-1 font-medium block" id="customer-name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="customer-phone" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
              رقم الجوال للتواصل:
            </label>
            <Input
              type="tel"
              id="customer-phone"
              name="phone"
              autoComplete="tel"
              required
              placeholder="05XXXXXXXX"
              dir="ltr"
              value={phone}
              hasError={Boolean(errors.phone)}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
            />
            {errors.phone && (
              <span className="field-error text-xs text-[var(--vermilion-seal)] mt-1 font-medium block" id="customer-phone-error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="customer-city" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
              المدينة والعنوان التفصيلي:
            </label>
            <Input
              type="text"
              id="customer-city"
              name="city"
              autoComplete="street-address"
              required
              placeholder="الرياض، حي العليا، شارع التحلية"
              value={city}
              hasError={Boolean(errors.city)}
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
              }}
            />
            {errors.city && (
              <span className="field-error text-xs text-[var(--vermilion-seal)] mt-1 font-medium block" id="customer-city-error" role="alert">
                {errors.city}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="payment-method" className="block text-xs font-semibold text-[var(--charcoal-ink)] mb-1.5">
              وسيلة الدفع المفضلة:
            </label>
            <select
              id="payment-method"
              name="payment"
              aria-label="وسيلة الدفع المفضلة"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-[var(--bamboo-border)] bg-white px-3.5 py-2 text-sm text-[var(--charcoal-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] cursor-pointer"
            >
              <option value="cod">الدفع عند الاستلام</option>
              <option value="card">بطاقة مدى / بطاقة ائتمانية</option>
              <option value="applepay">Apple Pay</option>
            </select>
          </div>

          <dl className="order-summary rounded-xl bg-black/5 p-4 space-y-2 mt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-[var(--muted-umeboshi)]">المجموع الفرعي</dt>
              <dd id="summary-subtotal" className="font-semibold">{cartState.subtotal} ر.س</dd>
            </div>
            {cartState.discountAmount > 0 && (
              <div className="flex justify-between text-[var(--bamboo-green)] font-semibold" id="summary-discount-row">
                <dt>قيمة الخصم</dt>
                <dd id="summary-discount">-{cartState.discountAmount} ر.س</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-[var(--muted-umeboshi)]">رسوم التوصيل</dt>
              <dd id="summary-shipping" className="font-semibold">
                {cartState.shipping === 0 ? 'مجاني' : `${cartState.shipping} ر.س`}
              </dd>
            </div>
            <div className="flex justify-between border-t border-[var(--bamboo-border)]/50 pt-2 text-base">
              <dt className="font-bold text-[var(--charcoal-ink)]">الإجمالي المستحق</dt>
              <dd>
                <strong id="summary-total" className="font-bold text-lg text-[var(--charcoal-ink)]">{cartState.total} ر.س</strong>
              </dd>
            </div>
          </dl>

          <Button type="submit" id="checkout-submit-btn" size="lg" className="w-full mt-4">
            تأكيد وإتمام الطلب
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
