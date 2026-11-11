import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  asLink = true,
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const content = (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      dir="ltr"
    >
      {/* Vermilion Seal Badge with white Arabic text: شوب / بورد */}
      <span
        className={`shrink-0 flex flex-col items-center justify-center rounded-xl bg-[var(--vermilion-seal,#ea5e3c)] text-white shadow-xs font-bold leading-none select-none border border-[#b23b20]/40 ${
          isSm ? 'w-8 h-8 rounded-lg' : isLg ? 'w-12 h-12 rounded-2xl' : 'w-10 h-10'
        }`}
        aria-hidden="true"
      >
        <span
          className={`font-bold leading-none font-readex ${
            isSm ? 'text-[9px]' : isLg ? 'text-xs' : 'text-[11px]'
          }`}
        >
          شوب
        </span>
        <span
          className={`font-bold leading-none font-readex mt-0.5 ${
            isSm ? 'text-[9px]' : isLg ? 'text-xs' : 'text-[11px]'
          }`}
        >
          بورد
        </span>
      </span>

      {/* Brand Titles: ShopBoard & شوب بورد */}
      <div className="flex flex-col items-end leading-none text-right">
        <span
          className={`font-extrabold tracking-tight text-[var(--charcoal-deep)] font-readex ${
            isSm ? 'text-base' : isLg ? 'text-2xl' : 'text-xl'
          }`}
        >
          ShopBoard
        </span>
        <span
          className={`font-bold text-[var(--charcoal-ink)] font-readex mt-0.5 ${
            isSm ? 'text-[9px]' : isLg ? 'text-xs' : 'text-[11px]'
          }`}
        >
          شوب بورد
        </span>
      </div>
    </div>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="flex items-center transition-opacity hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--charcoal-ink)] rounded-md"
        aria-label="ShopBoard شوب بورد - العودة للرئيسية"
      >
        {content}
      </Link>
    );
  }

  return content;
};

