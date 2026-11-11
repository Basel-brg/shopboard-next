import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Check } from 'lucide-react';
import { ALL_PRODUCTS } from '@/modules/products/products.api';
import { getDiscountPercent } from '@/modules/products/products.logic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/shared/components/Footer/Footer';
import { ProductDetailActions } from '@/modules/products/components/ProductDetailActions';
import { ProductHeaderActions } from '@/modules/products/components/ProductHeaderActions';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => String(p.id) === id);

  if (!product) {
    return {
      title: 'المنتج غير موجود | ShopBoard',
    };
  }

  return {
    title: `${product.name} | ShopBoard أتيليه`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  const discountPct = getDiscountPercent(product.price, product.originalPrice);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Navigation & Action Strip */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--card)] hover:bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" />
            <span>العودة للكتالوج</span>
          </Link>

          <ProductHeaderActions productName={product.name} />
        </div>

        {/* Product Details Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Gallery / Image */}
          <div className="relative rounded-[28px] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-6 overflow-hidden shadow-sm">
            <figure className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#fbf9f5] dark:bg-[#201e1b] flex items-center justify-center p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover aspect-square transition-transform duration-500 hover:scale-105"
              />
            </figure>

            {/* Micro Gallery Dot Indicators */}
            <div className="flex items-center justify-center gap-2 mt-4" aria-hidden="true">
              <span className="w-6 h-1.5 rounded-full bg-[var(--accent-coral)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)]" />
            </div>

            {/* Badges Overlay */}
            <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-1.5 pointer-events-none">
              {discountPct > 0 && (
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-[var(--accent-coral)] text-white shadow-sm">
                  خصم {discountPct}%
                </span>
              )}
              {product.tag && (
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] shadow-xs backdrop-blur-xs">
                  {product.tag}
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Information, Specs, Colors & Cart Stepper */}
          <div className="flex flex-col space-y-5">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--secondary)] text-[var(--accent-coral)] font-readex">
                  {product.category}
                </span>
                <span className="text-xs font-mono text-[var(--muted-foreground)]">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] font-readex">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="mt-1 text-xs sm:text-sm text-[var(--muted-foreground)] font-mono">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Price & Rating Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-[var(--border)]">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-[var(--accent-coral)] font-readex">
                  {product.price}
                </span>
                <span className="text-sm font-semibold text-[var(--foreground)]">ر.س</span>

                {product.originalPrice && product.originalPrice > product.price && (
                  <s className="text-sm text-[var(--muted-foreground)] line-through mr-1 font-mono">
                    {product.originalPrice} ر.س
                  </s>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)]">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <strong className="text-[var(--foreground)] font-bold text-sm">{product.rating}</strong>
                <span>({product.reviewsCount} تقييم)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--foreground)]/85 leading-relaxed font-sans">
              {product.description}
            </p>

            {/* Technical Specifications Chips */}
            {product.specs && product.specs.length > 0 && (
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-xs">
                <h2 className="text-xs font-bold text-[var(--foreground)] mb-2.5 font-readex flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-coral)]" />
                  <span>المواصفات التقنية والخامات</span>
                </h2>
                <ul className="space-y-1.5 text-xs text-[var(--muted-foreground)] font-sans">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Actions (Swatches, Stepper, Cart CTA) */}
            <ProductDetailActions product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
