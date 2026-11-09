import { NotFoundState } from '@/shared/components/feedback/NotFoundState';

export default function ProductNotFound() {
  return (
    <NotFoundState
      title="المنتج غير موجود في الكتالوج"
      description="عذراً، لم نتمكن من العثور على هذا المنتج في أركان الأتيليه. ربما نفد المخزون أو تم تغيير رقمه التسلسلي."
      backHref="/products"
      backLabel="العودة لكتالوج المنتجات"
    />
  );
}
