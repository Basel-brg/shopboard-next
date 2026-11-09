import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { ProductsContainer } from '@/modules/products/components/ProductsContainer';
import { Footer } from '@/shared/components/Footer/Footer';

export const metadata: Metadata = {
  title: 'كتالوج المنتجات | ShopBoard أتيليه',
  description: 'تصفح تشكيلة الأثاث المكتبي، لوحات المفاتيح الميكانيكية، وأنظمة الإضاءة المعمارية الموزونة.',
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--washi-ivory)]">
      <Header />

      {/* Catalog Header Banner */}
      <section className="border-b border-[var(--bamboo-border)] bg-[var(--washi-cream)] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="text-xs text-[var(--muted-umeboshi)] mb-2 font-mono" aria-label="مسار التنقل">
            <span className="opacity-70">الرئيسية</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-[var(--charcoal-ink)]">الكتالوج الكامل</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
            مجموعة أثاث الأتيليه
          </h1>
          <p className="mt-2 text-base text-[var(--muted-umeboshi)] max-w-2xl font-[family-name:var(--font-ibm-plex)]">
            معدات مكتبية منتقاة بعناية فائقة تجمع بين المتانة التكتيكية وهدوء الأتيليه الياباني.
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
