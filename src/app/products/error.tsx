'use client';

import { useEffect } from 'react';
import { ErrorState } from '@/shared/components/feedback/ErrorState';

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Products route error:', error);
  }, [error]);

  return (
    <ErrorState
      title="تعذر تحميل كتالوج المنتجات"
      message="واجهنا صعوبة أثناء جلب قائمة المنتجات والمواصفات من الخادم."
      onRetry={() => reset()}
      showHomeLink={true}
    />
  );
}
