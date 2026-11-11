'use client';

import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import { validateInput } from '../../../shared/validation/validation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    <Card className="checkout-card p-6 rounded-3xl border border-[var(--border)] bg-[var(--card)] shadow-xs" onContextMenu={(e) => e.stopPropagation()}>
      <CardHeader className="p-0 pb-5 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)]">
            بيانات التوصيل والدفع
          </CardTitle>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-coral)] bg-[var(--accent)] px-2.5 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            <span>دفع آمن ومشفّر</span>
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-5">
        <form id="checkout-form" className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div>
            <label htmlFor="customer-name" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
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
              className="bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
              }}
            />
            {errors.name && (
              <span className="field-error text-xs text-red-500 mt-1 font-medium block" id="customer-name-error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="customer-phone" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
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
              className="bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
              }}
            />
            {errors.phone && (
              <span className="field-error text-xs text-red-500 mt-1 font-medium block" id="customer-phone-error" role="alert">
                {errors.phone}
              </span>
            )}
          </div>

          {/* City & Address */}
          <div>
            <label htmlFor="customer-city" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
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
              className="bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]"
              onChange={(e) => {
                setCity(e.target.value);
                if (errors.city) setErrors((prev) => ({ ...prev, city: '' }));
              }}
            />
            {errors.city && (
              <span className="field-error text-xs text-red-500 mt-1 font-medium block" id="customer-city-error" role="alert">
                {errors.city}
              </span>
            )}
          </div>

          {/* Payment Method Select */}
          <div>
            <label htmlFor="payment-method" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
              وسيلة الدفع المفضلة:
            </label>
            <div className="relative">
              <select
                id="payment-method"
                name="payment"
                aria-label="وسيلة الدفع المفضلة"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-3.5 py-2.5 text-xs sm:text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-coral)] cursor-pointer"
              >
                <option value="cod">الدفع عند الاستلام (COD) - متوفر لكافة مدن المملكة</option>
                <option value="card">بطاقة مدى / البطاقات الائتمانية (Visa / Mastercard)</option>
                <option value="apple-pay">Apple Pay (دفع سريع وآمن بنقرة واحدة)</option>
                <option value="tamara">تمارا (قسّم فاتورتك على 4 دفعات بدون فوائد)</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 rounded-2xl bg-[var(--accent-coral)] hover:bg-[#d95232] text-white font-bold text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>تأكيد وإتمام الطلب ({cartState.total} ر.س)</span>
            </Button>
          </div>
        </form>

        {/* Guarantees Mini Footer */}
        <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-center gap-4 text-[11px] text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ضمان استبدال سنتين</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
            <span>دفع مشفّر 256-bit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
