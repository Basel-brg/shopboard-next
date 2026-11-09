import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { OrdersContainer } from '@/modules/orders/components/OrdersContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'سجل طلباتي | ShopBoard أتيليه أكاري للأثاث المكتبي',
  description: 'متابعة وتتبع طلباتك السابقة والحالية، تفاصيل الفواتير، وحالة الشحن والتوصيل.',
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--washi-ivory)]">
      <Header />

      <main className="flex-1 w-full">
        <OrdersContainer />
      </main>

      <Footer />
    </div>
  );
}

