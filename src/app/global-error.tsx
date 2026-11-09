'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Critical Root Layout Error:', error);
  }, [error]);

  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          backgroundColor: '#f2eada',
          color: '#252522',
          display: 'flex',
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '480px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              backgroundColor: 'rgba(194, 56, 40, 0.15)',
              color: '#c23828',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            !
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', fontWeight: 'bold' }}>
            تعذر تحميل التطبيق
          </h1>
          <p style={{ color: '#686358', lineHeight: 1.6, marginBottom: '2rem' }}>
            حدث خطأ جسيم غير متوقع أثناء معالجة الإطار الرئيسي للموقع.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              backgroundColor: '#252522',
              color: '#f2eada',
              border: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            إعادة تحميل التطبيق
          </button>
        </div>
      </body>
    </html>
  );
}
