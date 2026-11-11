import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { fetchAllSetups } from '@/modules/setups/setups.api';
import { SetupsDirectory } from '@/modules/setups/components/SetupsDirectory';

export const metadata: Metadata = {
  title: 'بيئات العمل والـ Setups | Shop The Look | متجر ShopBoard',
  description:
    'استكشف بيئات عمل متكاملة مصممة بعناية فائقة للمطورين والمصممين وصناع المحتوى. اختر حزمتك المفضلة بخصم حزمة يصل إلى 15%.',
  openGraph: {
    title: 'بيئات العمل والـ Setups | Shop The Look',
    description: 'استكشف بيئات عمل متكاملة مصممة بعناية فائقة للمطورين والمصممين.',
  },
};

export default async function SetupsPage() {
  const setups = await fetchAllSetups();

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
      {/* Breadcrumb / Page Header */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)] mb-3">
          <Link href="/" className="hover:text-[var(--accent-coral)] transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">بيئات العمل (Shop The Look)</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-coral)] text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مساحات عمل منسقة هندسياً</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-readex text-[var(--foreground)] tracking-tight">
              بيئات العمل المتكاملة (Shop The Look)
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              تصفح مكاتب حقيقية متناسقة في المواد والألوان والتنظيم. يمكنك شراء الحزمة كاملة بخصم خاص أو تخصيص كل قطعة على حدة حسب مساحة مكتبك وميزانيتك.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/gift-guide"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-xs sm:text-sm font-semibold hover:border-[var(--accent-coral)] transition-colors"
            >
              <span>دليل هدايا المكاتب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <span>تصفح كل المنتجات</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Directory Component */}
      <SetupsDirectory initialSetups={setups} />
    </div>
  );
}
