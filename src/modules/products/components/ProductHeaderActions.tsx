'use client';

import React, { useState } from 'react';
import { Share2, Heart, Check } from 'lucide-react';
import { useToast } from '@/shared/components/Toast/ToastContext';

interface ProductHeaderActionsProps {
  productName: string;
}

export function ProductHeaderActions({ productName }: ProductHeaderActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        showToast(`تم نسخ رابط "${productName}" إلى الحافظة!`);
        setTimeout(() => setCopied(false), 2000);
      } else {
        showToast('تم نسخ الرابط بنجاح');
      }
    } catch {
      showToast('تعذر نسخ الرابط');
    }
  };

  const handleWishlist = () => {
    const next = !isWishlisted;
    setIsWishlisted(next);
    showToast(
      next
        ? `تمت إضافة "${productName}" إلى قائمة المفضلة`
        : `تمت إزالة "${productName}" من قائمة المفضلة`,
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors shadow-xs cursor-pointer"
        aria-label="مشاركة المنتج"
        title="مشاركة المنتج"
      >
        {copied ? (
          <Check className="w-4 h-4 text-emerald-600" />
        ) : (
          <Share2 className="w-4 h-4" />
        )}
      </button>
      <button
        type="button"
        onClick={handleWishlist}
        className={`w-9 h-9 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
          isWishlisted
            ? 'text-[var(--accent-coral)]'
            : 'text-[var(--muted-foreground)] hover:text-[var(--accent-coral)]'
        }`}
        aria-label={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
        title="المفضلة"
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[var(--accent-coral)]' : ''}`} />
      </button>
    </div>
  );
}
