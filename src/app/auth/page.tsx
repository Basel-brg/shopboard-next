import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { AuthPageContainer } from '@/modules/auth/components/AuthPageContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'تسجيل الدخول وبوابة الحساب | ShopBoard أتيليه أكاري',
  description: 'تسجيل الدخول أو إنشاء حساب جديد لمتابعة طلباتك وتخصيص مكتبك في استوديو أكاري.',
};

export default function AuthPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 w-full flex items-center justify-center">
        <AuthPageContainer />
      </main>

      <Footer />
    </div>
  );
}

