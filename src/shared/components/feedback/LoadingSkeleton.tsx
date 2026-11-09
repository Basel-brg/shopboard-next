import React from 'react';

export const LoadingSkeleton: React.FC<{ message?: string }> = ({
  message = 'جاري التحميل والتنسيق...',
}) => {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center"
      style={{
        backgroundColor: 'var(--washi-ivory)',
        color: 'var(--charcoal-ink)',
      }}
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative mb-6 h-12 w-12">
        <div
          className="absolute inset-0 animate-ping rounded-full opacity-20"
          style={{ backgroundColor: 'var(--bamboo-tan)' }}
        />
        <div
          className="h-12 w-12 animate-spin rounded-full border-3 border-transparent"
          style={{
            borderTopColor: 'var(--charcoal-ink)',
            borderRightColor: 'var(--bamboo-tan)',
          }}
        />
      </div>
      <p className="text-sm font-medium tracking-wide opacity-75 font-[family-name:var(--font-ibm-plex)]">
        {message}
      </p>
    </div>
  );
};
