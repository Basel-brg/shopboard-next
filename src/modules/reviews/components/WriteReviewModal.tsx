import React, { useState } from 'react';
import { Star, X, AlertCircle } from 'lucide-react';
import type { CreateReviewInput } from '../reviews.types';
import { validateReviewInput } from '../reviews.logic';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WriteReviewModalProps {
  productId: number;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: CreateReviewInput) => Promise<void>;
}

export function WriteReviewModal({
  productId,
  productName,
  isOpen,
  onClose,
  onSubmit,
}: WriteReviewModalProps) {
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [recommended, setRecommended] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateReviewInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input: CreateReviewInput = {
      productId,
      authorName,
      rating,
      title,
      comment,
      recommended,
    };

    const validation = validateReviewInput(input);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    try {
      await onSubmit(input);
      onClose();
    } catch {
      setErrors({ comment: 'حدث خطأ أثناء إرسال التقييم، يرجى المحاولة مرة أخرى' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-50 duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-[var(--card)] border border-[var(--border)] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
          <div>
            <h3 id="review-modal-title" className="text-lg sm:text-xl font-bold font-readex text-[var(--foreground)]">
              أضف تقييمك للمنتج
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] mt-0.5 line-clamp-1">
              {productName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--secondary)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors cursor-pointer"
            aria-label="إغلاق نافذة التقييم"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Rating Stars Picker */}
          <div>
            <label className="block text-xs font-semibold text-[var(--foreground)] mb-2">
              تقييمك الإجمالي: <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="اختر عدد النجوم">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 cursor-pointer transition-transform hover:scale-115 focus:outline-hidden"
                  aria-label={`${star} من 5 نجوم`}
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-[var(--border)]'
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-mono font-bold text-[var(--muted-foreground)] mr-2">
                {rating} من 5 نجوم
              </span>
            </div>
            {errors.rating && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.rating}</span>
              </p>
            )}
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="review-author" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
              اسمك الكريم: <span className="text-red-500">*</span>
            </label>
            <Input
              id="review-author"
              type="text"
              placeholder="مثال: تركي التميمي"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="bg-[var(--background)] rounded-xl text-xs sm:text-sm h-10"
            />
            {errors.authorName && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.authorName}</span>
              </p>
            )}
          </div>

          {/* Review Title */}
          <div>
            <label htmlFor="review-title" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
              عنوان التقييم: <span className="text-red-500">*</span>
            </label>
            <Input
              id="review-title"
              type="text"
              placeholder="مثال: خامات استثنائية وثبات مذهل على المكتب"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-[var(--background)] rounded-xl text-xs sm:text-sm h-10"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="review-comment" className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
              تفاصيل تجربتك ورأيك: <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-comment"
              rows={4}
              placeholder="اكتب عن دقة التصنيع، سهولة الاستخدام، تناسق المواد، وأي ملاحظات تساعد المشترين..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-2xl bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] focus:outline-hidden focus:ring-1 focus:ring-[var(--accent-coral)]"
            />
            {errors.comment && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.comment}</span>
              </p>
            )}
          </div>

          {/* Recommendation Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="review-recommend"
              checked={recommended}
              onChange={(e) => setRecommended(e.target.checked)}
              className="w-4 h-4 rounded-md accent-[var(--accent-coral)] cursor-pointer"
            />
            <label htmlFor="review-recommend" className="text-xs text-[var(--foreground)] font-medium cursor-pointer">
              نعم، أوصي باقتناء هذا المنتج لبيئات العمل والمكاتب
            </label>
          </div>

          {/* Actions */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[var(--border)]">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-full text-xs cursor-pointer"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="rounded-full bg-[var(--accent-coral)] hover:bg-[#d95232] text-white text-xs font-bold px-6 cursor-pointer"
            >
              {isSubmitting ? 'جاري الإرسال...' : 'نشر التقييم'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

