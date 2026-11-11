import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { ProductsContainer } from '@/modules/products/components/ProductsContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'كتالوج المنتجات | ShopBoard',
  description: 'تصفح تشكيلة الأثاث المكتبي، لوحات المفاتيح الميكانيكية، وأنظمة الإضاءة المعمارية الموزونة.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      {/* Catalog Header Banner */}
      <section className="border-b border-[var(--border)] bg-[var(--card)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-[var(--muted-foreground)] mb-2 font-mono" aria-label="مسار التنقل">
            <span className="opacity-70">الرئيسية</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-[var(--foreground)]">الكتالوج الكامل</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-readex">
            مجموعة أثاث ومعدات ShopBoard
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted-foreground)] max-w-2xl font-sans">
            معدات مكتبية منتقاة بعناية فائقة تجمع بين المتانة التكتيكية والأناقة والعملية.
          </p>
        </div>
      </section>

      {/* Catalog Container with Filters, Search, and Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsContainer />
      </main>

      <Footer />
    </div>
  );
}
