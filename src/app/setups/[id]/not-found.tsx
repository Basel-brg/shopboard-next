import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Layers } from 'lucide-react';

export default function SetupNotFound() {
  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-xl">
      <div className="inline-flex p-4 rounded-3xl bg-[var(--accent-coral-soft)] text-[var(--accent-coral)] border border-[var(--accent-coral)]/20 mb-4">
        <Layers className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold font-readex text-[var(--foreground)] mb-2">
        بيئة العمل غير موجودة
      </h1>
      <p className="text-sm text-[var(--muted-foreground)] mb-6">
        عذراً، لم نتمكن من العثور على بيئة العمل المطلوبة. ربما تم تعديل الرابط أو تحديث التشكيلة.
      </p>
      <Link
        href="/setups"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent-coral)] text-white font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        <span>العودة لبيئات العمل</span>
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </div>
  );
}

