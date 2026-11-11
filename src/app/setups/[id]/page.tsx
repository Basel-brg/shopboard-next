import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchSetupById, fetchAllSetups } from '@/modules/setups/setups.api';
import { SetupDetailView } from '@/modules/setups/components/SetupDetailView';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/shared/components/Footer/Footer';
import { MobileBottomNav } from '@/components/layout/MobileBottomNav';

interface SetupDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SetupDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const setup = await fetchSetupById(id);

  if (!setup) {
    return {
      title: 'بيئة العمل غير موجودة | ShopBoard',
    };
  }

  return {
    title: `${setup.title} | Shop The Look | ShopBoard`,
    description: setup.description,
    openGraph: {
      title: setup.title,
      description: setup.description,
      images: [
        {
          url: setup.image,
          alt: setup.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const setups = await fetchAllSetups();
  return setups.map((s) => ({ id: s.id }));
}

export default async function SetupDetailPage({ params }: SetupDetailPageProps) {
  const { id } = await params;
  const setup = await fetchSetupById(id);

  if (!setup) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <SetupDetailView setup={setup} />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
