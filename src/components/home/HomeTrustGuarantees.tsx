'use client';

import React from 'react';
import { Truck, ShieldCheck, Sparkles, Gift } from 'lucide-react';

export function HomeTrustGuarantees() {
  const guarantees = [
    {
      icon: Truck,
      title: 'شحن سريع ومجاني',
      desc: 'توصيل مجاني للطلبات فوق 300 ر.س لكافة مدن المملكة بتغليف آمن ومحكم.',
      badge: 'توصيل آمن',
    },
    {
      icon: ShieldCheck,
      title: 'ضمان ذهبي سنتين',
      desc: 'استبدال فوري ودعم فني معتمد لكافة الأجهزة والملحقات الإلكترونية.',
      badge: 'ضمان شامل',
    },
    {
      icon: Sparkles,
      title: 'خصم الحزم حتى 15%',
      desc: 'توفير فوري وتلقائي عند اختيار وتجميع قطع السيت أب المتناسقة معاً.',
      badge: 'Shop The Look',
    },
    {
      icon: Gift,
      title: 'تغليف هدايا فاخر مجاناً',
      desc: 'صناديق هدايا فاخرة مع كرت إهداء شخصي بخط مميز عند الطلب.',
      badge: 'خدمة إهداء VIP',
    },
  ];

  return (
    <section className="py-2" aria-label="مزايا متجر ShopBoard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {guarantees.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group p-5 sm:p-6 rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="p-3 rounded-2xl bg-[var(--accent)] text-[var(--accent-coral)] group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold font-readex text-[var(--foreground)] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
