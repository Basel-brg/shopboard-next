import React from 'react';
import Link from 'next/link';

interface NotFoundStateProps {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  title = 'الصفحة غير موجودة',
  description = 'عذراً، لم نتمكن من العثور على الصفحة أو المنتج المطلوب. ربما تم نقله أو حذفه.',
  backHref = '/',
  backLabel = 'العودة للرئيسية',
}) => {
  return (
    <main
      className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: 'var(--washi-ivory)',
        color: 'var(--charcoal-ink)',
      }}
    >
      <div
        className="mb-6 flex h-24 w-24 items-center justify-center rounded-full"
        style={{
          backgroundColor: 'rgba(204, 182, 147, 0.2)',
          border: '1px solid var(--bamboo-border)',
          color: 'var(--bamboo-tan)',
        }}
        aria-hidden="true"
      >
        <span className="text-4xl font-extrabold tracking-wider font-mono text-[var(--charcoal-ink)]">
          404
        </span>
      </div>

      <h1 className="text-2xl font-bold tracking-tight md:text-3xl font-[family-name:var(--font-readex)]">
        {title}
      </h1>

      <p className="mt-3 max-w-md text-base opacity-80 leading-relaxed font-[family-name:var(--font-ibm-plex)]">
        {description}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold shadow-sm transition-all"
          style={{
            backgroundColor: 'var(--charcoal-ink)',
            color: 'var(--washi-ivory)',
          }}
        >
          <span>←</span>
          <span>{backLabel}</span>
        </Link>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold transition-all hover:bg-black/5"
          style={{
            borderColor: 'var(--bamboo-border)',
            color: 'var(--charcoal-ink)',
          }}
        >
          تصفح المنتجات
        </Link>
      </div>
    </main>
  );
};
