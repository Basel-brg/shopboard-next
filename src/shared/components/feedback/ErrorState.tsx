'use client';

import React from 'react';
import Link from 'next/link';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeLink?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'حدث خطأ غير متوقع',
  message = 'نعتذر عن هذا الخلل. فريقنا يعمل على معالجة المشكلة، يمكنك المحاولة مرة أخرى.',
  onRetry,
  showHomeLink = true,
}) => {
  return (
    <div
      role="alert"
      className="flex min-h-[50vh] flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundColor: 'var(--washi-ivory)',
        color: 'var(--charcoal-ink)',
      }}
    >
      <div
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
        style={{
          backgroundColor: 'rgba(194, 56, 40, 0.12)',
          color: 'var(--vermilion-seal)',
          border: '1px solid rgba(194, 56, 40, 0.25)',
        }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          width="36"
          height="36"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold tracking-tight md:text-3xl font-[family-name:var(--font-readex)]">
        {title}
      </h1>

      <p className="mt-3 max-w-md text-base opacity-80 leading-relaxed font-[family-name:var(--font-ibm-plex)]">
        {message}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold transition-all shadow-sm cursor-pointer"
            style={{
              backgroundColor: 'var(--charcoal-ink)',
              color: 'var(--washi-ivory)',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>إعادة المحاولة</span>
          </button>
        )}

        {showHomeLink && (
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border px-6 py-2.5 text-sm font-semibold transition-all hover:bg-black/5"
            style={{
              borderColor: 'var(--bamboo-border)',
              color: 'var(--charcoal-ink)',
            }}
          >
            العودة للرئيسية
          </Link>
        )}
      </div>
    </div>
  );
};
