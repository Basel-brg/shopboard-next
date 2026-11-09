import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PRODUCTS } from '@/modules/products/products.api';
import { getDiscountPercent } from '@/modules/products/products.logic';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/shared/components/Footer/Footer';
import { ProductDetailActions } from '@/modules/products/components/ProductDetailActions';
import { IconStar } from '@/shared/components/Icons/Icons';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => String(p.id) === id);

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
  const product = PRODUCTS.find((p) => String(p.id) === id);

  if (!product) {
    notFound();
  }

  const discountPct = getDiscountPercent(product.price, product.originalPrice);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--washi-ivory)]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[var(--muted-umeboshi)] mb-8 font-mono" aria-label="مسار التنقل">
          <Link href="/" className="hover:underline opacity-70">
            الرئيسية
          </Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:underline opacity-70">
            المنتجات
          </Link>
          <span className="mx-2">/</span>
          <span className="font-semibold text-[var(--charcoal-ink)]">{product.name}</span>
        </nav>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Media / Image Column */}
          <div className="relative rounded-2xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)] p-6 overflow-hidden shadow-xs">
            <figure className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-black/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>

            {/* Badges Overlay */}
            <div className="absolute top-9 right-9 flex flex-col gap-2">
              {product.tag && (
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--charcoal-ink)] text-[var(--washi-ivory)] shadow-sm">
                  {product.tag}
                </span>
              )}
              {discountPct > 0 && (
                <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-[var(--vermilion-seal)] text-white shadow-sm">
                  خصم {discountPct}%
                </span>
              )}
            </div>
          </div>

          {/* Product Information Column */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-[var(--muted-umeboshi)] font-mono">
                  {product.category}
                </span>
                <span className="text-xs font-mono text-[var(--muted-umeboshi)]">
                  رمز المنتج: {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--charcoal-ink)] font-[family-name:var(--font-readex)]">
                {product.name}
              </h1>

              {product.subtitle && (
                <p className="mt-1 text-sm text-[var(--muted-umeboshi)] italic font-mono">
                  {product.subtitle}
                </p>
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 py-2 border-y border-[var(--bamboo-border)]/60 text-sm">
              <div className="flex items-center gap-1 text-[var(--bamboo-tan)]">
                <IconStar size={18} fill="currentColor" />
                <span className="font-bold text-[var(--charcoal-ink)] font-mono">{product.rating}</span>
              </div>
              <span className="text-[var(--bamboo-border)]">|</span>
              <span className="text-[var(--muted-umeboshi)]">({product.reviewsCount} تقييم معتمد)</span>
              <span className="text-[var(--bamboo-border)]">|</span>
              <span className="text-xs font-semibold text-[var(--bamboo-green)]">جاهز للشحن الفوري</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-black text-[var(--charcoal-ink)] font-mono">
                {product.price}
              </span>
              <span className="text-lg font-medium text-[var(--charcoal-ink)]">ر.س</span>

              {product.originalPrice && product.originalPrice > product.price && (
                <s className="text-lg text-[var(--muted-umeboshi)] font-mono">
                  {product.originalPrice} ر.س
                </s>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-[var(--charcoal-ink)]/85 leading-relaxed font-[family-name:var(--font-ibm-plex)]">
              {product.description}
            </p>

            {/* Technical Specifications */}
            {product.specs && product.specs.length > 0 && (
              <div className="rounded-xl border border-[var(--bamboo-border)] bg-[var(--washi-cream)]/70 p-4">
                <h2 className="text-sm font-bold text-[var(--charcoal-ink)] mb-3 font-[family-name:var(--font-readex)]">
                  المواصفات التقنية والخامات:
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm text-[var(--charcoal-ink)]/80 font-[family-name:var(--font-ibm-plex)]">
                  {product.specs.map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-[var(--bamboo-green)] font-bold">✓</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Interactive Client Actions (Quantity, Add to Cart, Toast) */}
            <ProductDetailActions product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
