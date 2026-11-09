import { NotFoundState } from '@/shared/components/feedback/NotFoundState';

export default function RootNotFound() {
  return (
    <NotFoundState
      title="الصفحة غير موجودة"
      description="عذراً، لم نتمكن من العثور على المسار الذي تبحث عنه في أركان الأتيليه."
      backHref="/"
      backLabel="العودة للرئيسية"
    />
  );
}
