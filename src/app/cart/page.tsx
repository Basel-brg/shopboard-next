import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { CartPageContainer } from '@/modules/cart/components/CartPageContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'سلة المشتريات وإنهاء الطلب | ShopBoard أتيليه',
  description: 'مراجعة المنتجات المختارة، تطبيق كوبونات الخصم، وتأكيد بيانات الشحن والدفع.',
};

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--washi-ivory)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal-ink)] mb-8 font-[family-name:var(--font-readex)]">
          سلة المشتريات وإتمام الطلب
        </h1>

        <CartPageContainer />
      </main>

      <Footer />
    </div>
  );
}
