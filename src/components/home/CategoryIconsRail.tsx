'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LayoutGrid, Keyboard, Headphones, Sparkles, Package, ArrowLeft } from 'lucide-react';
import { useProducts } from '@/modules/products/context/useProducts';

export function CategoryIconsRail() {
  const router = useRouter();
  const { filters, setCategory } = useProducts();

  const categories = [
    {
      id: 'الكل',
      label: 'كافة التصنيفات',
      icon: LayoutGrid,
      count: '12 منتج',
    },
    {
      id: 'لوحات مفاتيح',
      label: 'لوحات المفاتيح',
      icon: Keyboard,
      count: 'ميكانيكية ولاسلكية',
    },
    {
      id: 'صوتيات المكتب',
      label: 'صوتيات وعزل',
      icon: Headphones,
      count: 'سماعات احترافية',
    },
    {
      id: 'إضاءة المكتب',
      label: 'إضاءة معمارية',
      icon: Sparkles,
      count: 'دافئة 3000K',
    },
    {
      id: 'تنظيم المكتب',
      label: 'تنظيم وإكسسوارات',
      icon: Package,
      count: 'حوامل ولباد طبيعي',
    },
  ];

  const handleCategorySelect = (catId: string) => {
    setCategory(catId);
    router.push('/products');
  };

  return (
    <section className="py-2" aria-label="أقسام المنتجات السريعة">
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <span className="text-xs font-bold text-[var(--accent-coral)] flex items-center gap-1.5">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>تصفح حسب القسم</span>
          </span>
          <h2 className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)]">
            أقسام المتجر المتخصصة
          </h2>
        </div>

        <button
          onClick={() => handleCategorySelect('الكل')}
          className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-coral)] hover:underline cursor-pointer"
        >
          <span>تصفح كل الأقسام</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = filters.category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`group p-4 rounded-3xl border transition-all duration-300 text-right cursor-pointer flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'bg-[var(--accent-coral)] text-white border-[var(--accent-coral)] shadow-md'
                  : 'bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:border-[var(--accent-coral)]/60 hover:shadow-xs hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`p-2.5 rounded-2xl transition-all ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--accent)] text-[var(--accent-coral)] group-hover:scale-110'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowLeft
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    isSelected
                      ? 'text-white'
                      : 'text-[var(--muted-foreground)] group-hover:-translate-x-1 group-hover:text-[var(--accent-coral)]'
                  }`}
                />
              </div>

              <div className="mt-3">
                <span className="block text-xs sm:text-sm font-bold font-readex truncate">
                  {cat.label}
                </span>
                <span
                  className={`block text-[10px] mt-0.5 truncate ${
                    isSelected ? 'text-white/80' : 'text-[var(--muted-foreground)]'
                  }`}
                >
                  {cat.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
