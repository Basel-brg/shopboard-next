'use client';

import React from 'react';
import { LayoutGrid, Keyboard, Headphones, Sparkles, Package } from 'lucide-react';
import { useProducts } from '@/modules/products/context/useProducts';

export function CategoryIconsRail() {
  const { filters, setCategory } = useProducts();

  const categories = [
    {
      id: 'الكل',
      label: 'الكل',
      icon: LayoutGrid,
      bgLight: 'bg-[#fef3c7]',
      textColor: 'text-[#b45309] dark:text-[#fde68a]',
      darkBg: 'dark:bg-[#78350f]/30',
    },
    {
      id: 'لوحات مفاتيح',
      label: 'كيبورد',
      icon: Keyboard,
      bgLight: 'bg-[#ffe4e6]',
      textColor: 'text-[#e11d48] dark:text-[#fecdd3]',
      darkBg: 'dark:bg-[#881337]/30',
    },
    {
      id: 'صوتيات المكتب',
      label: 'صوتيات',
      icon: Headphones,
      bgLight: 'bg-[#dbeafe]',
      textColor: 'text-[#1d4ed8] dark:text-[#bfdbfe]',
      darkBg: 'dark:bg-[#1e3a8a]/30',
    },
    {
      id: 'إضاءة المكتب',
      label: 'إضاءة',
      icon: Sparkles,
      bgLight: 'bg-[#d1fae5]',
      textColor: 'text-[#047857] dark:text-[#a7f3d0]',
      darkBg: 'dark:bg-[#064e3b]/30',
    },
    {
      id: 'تنظيم المكتب',
      label: 'تنظيم',
      icon: Package,
      bgLight: 'bg-[#ede9fe]',
      textColor: 'text-[#6d28d9] dark:text-[#ddd6fe]',
      darkBg: 'dark:bg-[#4c1d95]/30',
    },
  ];

  const handleCategorySelect = (catId: string) => {
    setCategory(catId);
    // Smooth scroll to catalog section
    const catalogElem = document.getElementById('products-section');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="my-8" aria-label="أقسام المتجر السريعة">
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 scrollbar-none px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = filters.category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategorySelect(cat.id)}
              className={`flex flex-col items-center gap-2 min-w-[70px] sm:min-w-[85px] p-2 rounded-2xl transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'scale-105'
                  : 'hover:opacity-85 opacity-90'
              }`}
              aria-label={`تصفية حسب ${cat.label}`}
              aria-pressed={isSelected}
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all shadow-xs ${
                  cat.bgLight
                } ${cat.darkBg} ${
                  isSelected
                    ? 'ring-3 ring-[var(--accent-coral)] shadow-md'
                    : 'border border-[var(--border)]'
                }`}
              >
                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${cat.textColor}`} strokeWidth={2.2} />
              </div>
              <span
                className={`text-xs font-semibold text-center transition-colors font-readex ${
                  isSelected
                    ? 'text-[var(--accent-coral)] font-bold'
                    : 'text-[var(--foreground)]'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

