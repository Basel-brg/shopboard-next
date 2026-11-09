import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { DeskStudioClientPage } from '@/desk-builder/components/DeskStudioClientPage';

export const metadata: Metadata = {
  title: 'استوديو تكوين مساحة العمل 3D | ShopBoard أتيليه أكاري',
  description: 'تجربة تفاعلية ثلاثية الأبعاد لتنسيق مساحة مكتبك، وضع الشاشات، لوحات المفاتيح، والإضاءة مباشرة على السطح.',
};

export default function DeskBuilderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#171614]">
      <Header />

      <main className="flex-1 w-full flex flex-col">
        <DeskStudioClientPage />
      </main>
    </div>
  );
}
