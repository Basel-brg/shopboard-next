import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Gift, ArrowLeft } from 'lucide-react';
import { fetchAllGifts } from '@/modules/gift-guide/gift-guide.api';
import { GiftGuideView } from '@/modules/gift-guide/components/GiftGuideView';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/shared/components/Footer/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

export const metadata: Metadata = {
  title: 'دليل هدايا المكاتب الفاخرة | متجر ShopBoard',
  description:
    'دليل هدايا استثنائي للمطورين والمصممين والمديرين. اختر أفضل هدايا بيئات العمل حسب ميزانيتك مع خدمة تغليف الهدايا المجانية.',
  openGraph: {
    title: 'دليل هدايا المكاتب الفاخرة | ShopBoard',
    description: 'اختر أفضل هدايا بيئات العمل حسب ميزانيتك مع خدمة تغليف الهدايا المجانية.',
  },
};

export default async function GiftGuidePage() {
  const gifts = await fetchAllGifts();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted-foreground)] mb-3">
            <Link href="/" className="hover:text-[var(--accent-coral)] transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)]">دليل هدايا المكاتب</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-coral)] text-xs font-bold">
                <Gift className="w-3.5 h-3.5" />
                <span>أفكار هدايا استثنائية لسطح المكتب</span>
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-readex text-[var(--foreground)] tracking-tight">
                دليل هدايا المكاتب الفاخرة
              </h1>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                سواء كنت تبحث عن هدية راقية لمطور برمجيات، مصمم مبدع، أو مدير تنفيذي؛ قمنا بتنسيق قائمة الهدايا الأكثر طلباً وفائدة مع تصنيف الميزانيات وتغليف الإهداء الفاخر.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/setups"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] text-xs sm:text-sm font-semibold hover:border-[var(--accent-coral)] transition-colors"
              >
                <span>بيئات العمل المتكاملة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Gift Guide View */}
        <GiftGuideView initialGifts={gifts} />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
