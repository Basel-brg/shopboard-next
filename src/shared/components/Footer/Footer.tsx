'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '../Toast/ToastContext';
import { validateInput } from '../../validation/validation';
import { BrandLogo } from '@/components/ui/BrandLogo';
import { ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateInput('email', email);
    if (err) {
      setEmailError(err);
      return;
    }

    setEmailError('');
    showToast('تم اشتراكك بنجاح! استخدم الكود WELCOME10 لخصم 10%');
    setEmail('');
  };

  return (
    <footer className="mt-16 border-t border-[var(--border)] bg-[var(--card)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <BrandLogo asLink size="md" />
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed font-sans">
              متجر متخصص في تجهيز مساحات العمل الاحترافية ومعدات المكتب الموزونة هندسياً، مستوحى من هدوء الخامات اليابانية وحرفية خشب البلوط والنحاس المصمت.
            </p>
            <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)] pt-2">
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمان سنتين</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[var(--accent-coral)]" />
                <span>شحن سريع</span>
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
                <span>إرجاع ميسر</span>
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-readex text-[var(--foreground)]">
              صفحات المتجر
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--accent-coral)] transition-colors block">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/setups" className="hover:text-[var(--accent-coral)] transition-colors block">
                  بيئات العمل (Shop The Look)
                </Link>
              </li>
              <li>
                <Link href="/gift-guide" className="hover:text-[var(--accent-coral)] transition-colors block">
                  دليل هدايا المكاتب
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[var(--accent-coral)] transition-colors block">
                  جميع المنتجات والكتالوج
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[var(--accent-coral)] transition-colors block">
                  سلة المشتريات وإنهاء الطلب
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-readex text-[var(--foreground)]">
              أقسام وتجهيزات المكتب
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--muted-foreground)]">
              <li>
                <Link
                  href="/products"
                  onClick={() => onSelectCategory?.('لوحات مفاتيح')}
                  className="hover:text-[var(--accent-coral)] transition-colors block"
                >
                  لوحات المفاتيح الميكانيكية
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => onSelectCategory?.('صوتيات المكتب')}
                  className="hover:text-[var(--accent-coral)] transition-colors block"
                >
                  صوتيات الاستوديو والعزل
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => onSelectCategory?.('إضاءة المكتب')}
                  className="hover:text-[var(--accent-coral)] transition-colors block"
                >
                  إضاءة المكتب المعمارية
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  onClick={() => onSelectCategory?.('تنظيم المكتب')}
                  className="hover:text-[var(--accent-coral)] transition-colors block"
                >
                  حوامل وتنظيم الكابلات
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold font-readex text-[var(--foreground)]">
              النشرة البريدية الحصرية
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              انضم لمجتمع ShopBoard واحصل على كود خصم فوري 10% على طلبك الأول.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-2" noValidate>
              <div className="relative flex items-center">
                <input
                  type="email"
                  id="newsletter-email"
                  name="email"
                  aria-label="البريد الإلكتروني للاشتراك في النشرة"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  dir="ltr"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  className={`w-full rounded-2xl border px-3.5 py-2.5 text-xs text-[var(--foreground)] bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-coral)] ${
                    emailError ? 'border-red-500' : 'border-[var(--border)]'
                  }`}
                />
              </div>

              {emailError && (
                <span className="text-xs text-red-500 block font-medium" role="alert">
                  {emailError}
                </span>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-2xl bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
              >
                اشتراك واستلام الخصم
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="mt-12 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <p>© 2026 ShopBoard (شوب بورد). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>الأسعار شاملة ضريبة القيمة المضافة (15%)</span>
            <span>•</span>
            <span>سجل تجاري معتمد</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
