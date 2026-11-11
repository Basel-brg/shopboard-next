import { PRODUCTS } from '../products/products.api';
import type { DeskSetup } from './setups.types';

export const DESK_SETUPS: readonly DeskSetup[] = [
  {
    id: 'developer-station',
    title: 'محطة المطور الخارقة',
    subtitle: 'Dark Minimalist Developer Station',
    category: 'developer',
    categoryLabel: 'بيئة المطورين',
    description:
      'بيئة عمل برمجية مصممة للتركيز العميق في كتابة الأكواد وجلسات العمل الماراثونية. تعتمد على شاشة منحنية عريضة مريحة للنظر ولوحة مفاتيح ميكانيكية متوافقة مع Mac و Windows.',
    image: '/assets/setups/developer-station.jpg',
    bundleDiscountPct: 15,
    tags: ['برمجة وتطوير', 'شاشة عريضة', 'عزل ضوضاء', 'راحة المعصم'],
    vibe: 'أسود كربوني ورمادي حجري هادئ',
    items: [
      { productId: 10, product: PRODUCTS.find((p) => p.id === 10) || PRODUCTS[0], isRequired: true },
      { productId: 1, product: PRODUCTS.find((p) => p.id === 1) || PRODUCTS[0], isRequired: true },
      { productId: 4, product: PRODUCTS.find((p) => p.id === 4) || PRODUCTS[1], isRequired: false },
      { productId: 6, product: PRODUCTS.find((p) => p.id === 6) || PRODUCTS[2], isRequired: false },
      { productId: 8, product: PRODUCTS.find((p) => p.id === 8) || PRODUCTS[3], isRequired: false },
    ],
  },
  {
    id: 'creator-studio',
    title: 'أتيليه المصممين وصناع المحتوى',
    subtitle: 'Warm Creator & Visual Studio',
    category: 'creator',
    categoryLabel: 'استوديو الإبداع',
    description:
      'مساحة استوديو بصرية دافئة تجمع بين دفء خشب البلوط الطبيعي وإضاءة النحاس المعماري الخالية من الوميض، مع سماعات عزل نشط للمونتاج وتدقيق الصوت.',
    image: '/assets/setups/creator-studio.jpg',
    bundleDiscountPct: 12,
    tags: ['تصميم ومونتاج', 'إضاءة دافئة 3000K', 'خشب بلوط', 'نحاس مصمت'],
    vibe: 'خشب طبيعي ونحاس مصقول دافئ',
    items: [
      { productId: 3, product: PRODUCTS.find((p) => p.id === 3) || PRODUCTS[2], isRequired: true },
      { productId: 2, product: PRODUCTS.find((p) => p.id === 2) || PRODUCTS[1], isRequired: true },
      { productId: 6, product: PRODUCTS.find((p) => p.id === 6) || PRODUCTS[0], isRequired: false },
      { productId: 5, product: PRODUCTS.find((p) => p.id === 5) || PRODUCTS[3], isRequired: false },
    ],
  },
  {
    id: 'zen-minimalist',
    title: 'محطة الهدوء والتركيز الخالص',
    subtitle: 'Zen Minimalist Deep Work',
    category: 'minimalist',
    categoryLabel: 'بساطة التركيز',
    description:
      'أقل عدد ممكن من القطع بأعلى درجات الجودة والمتانة. مكتب نظيف تماماً من الكابلات يعزز صفاء الذهن والتفكير الاستراتيجي الهادئ.',
    image: '/assets/setups/zen-minimalist.jpg',
    bundleDiscountPct: 10,
    tags: ['بساطة يابانية', 'مكتب خالٍ من الكابلات', 'نحاس مصمت', 'تنظيم سريع'],
    vibe: 'عاجي طبيعي ولمسات نحاسية ناعمة',
    items: [
      { productId: 1, product: PRODUCTS.find((p) => p.id === 1) || PRODUCTS[0], isRequired: true },
      { productId: 4, product: PRODUCTS.find((p) => p.id === 4) || PRODUCTS[1], isRequired: true },
      { productId: 5, product: PRODUCTS.find((p) => p.id === 5) || PRODUCTS[2], isRequired: false },
      { productId: 7, product: PRODUCTS.find((p) => p.id === 7) || PRODUCTS[3], isRequired: false },
    ],
  },
  {
    id: 'executive-command',
    title: 'مكتب القيادة والتنظيم الذكي',
    subtitle: 'Executive Desk & Workspace',
    category: 'executive',
    categoryLabel: 'مكاتب تنفيذية',
    description:
      'محطة إدارة شاملة مزودة بمنصة توصيل Hub سريعة لكافة الأجهزة، مع رف شاشة عريض وحامل نحاسي لتنظيم القرطاسية والمستندات بأسلوب قيادي راقٍ.',
    image: '/assets/setups/executive-command.jpg',
    bundleDiscountPct: 15,
    tags: ['محطة تحكم', 'توصيل شاشات متعددة', 'فخامة خشب البلوط', 'جاهز للمؤتمرات'],
    vibe: 'فخامة رسمية مع حرفية يابانية',
    items: [
      { productId: 6, product: PRODUCTS.find((p) => p.id === 6) || PRODUCTS[0], isRequired: true },
      { productId: 7, product: PRODUCTS.find((p) => p.id === 7) || PRODUCTS[1], isRequired: true },
      { productId: 2, product: PRODUCTS.find((p) => p.id === 2) || PRODUCTS[2], isRequired: false },
      { productId: 3, product: PRODUCTS.find((p) => p.id === 3) || PRODUCTS[3], isRequired: false },
    ],
  },
];

export async function fetchAllSetups(): Promise<readonly DeskSetup[]> {
  return DESK_SETUPS;
}

export async function fetchSetupById(id: string): Promise<DeskSetup | null> {
  const found = DESK_SETUPS.find((s) => s.id === id);
  return found || null;
}

