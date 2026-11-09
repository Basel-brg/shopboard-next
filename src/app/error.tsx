'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to observability service in production
    console.error('Next.js Root Error Boundary caught:', error);
  }, [error]);

  return (
    <ErrorState
      title="حدث خطأ في النظام"
      message={
        process.env.NODE_ENV === 'development'
          ? error.message || 'حدث خطأ أثناء تحميل الصفحة.'
          : 'نعتذر، واجهنا مشكلة غير متوقعة أثناء معالجة طلبك.'
      }
      onRetry={() => reset()}
      showHomeLink={true}
    />
  );
}
