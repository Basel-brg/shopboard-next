import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { SettingsContainer } from '@/modules/settings/components/SettingsContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'الإعدادات وتفضيلات الحساب | ShopBoard أتيليه أكاري',
  description: 'تخصيص الملف الشخصي، عنوان الشحن الافتراضي، تفضيلات الاستوديو ثلاثي الأبعاد، وإعدادات التنبيهات.',
};

export default function SettingsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 w-full">
        <SettingsContainer />
      </main>

      <Footer />
    </div>
  );
}

