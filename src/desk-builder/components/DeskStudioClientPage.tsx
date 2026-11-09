'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const DeskStudioPageView = dynamic(
  () => import('./DeskStudioPageView').then((mod) => mod.DeskStudioPageView),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-[#171614] text-[var(--washi-ivory)]">
        <div className="animate-spin text-4xl mb-4">⚙️</div>
        <p className="text-sm font-semibold">جاري تهيئة الاستوديو ثلاثي الأبعاد وعناصر WebGL...</p>
      </div>
    ),
  }
);

export function DeskStudioClientPage() {
  return <DeskStudioPageView />;
}

