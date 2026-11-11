import { PRODUCTS } from '../products/products.api';
import type { GiftItem } from './gift-guide.types';
import { classifyProductBudgetTier } from './gift-guide.logic';

export const GIFT_ITEMS: readonly GiftItem[] = [
  {
    id: 'gift-desk-mat',
    product: PRODUCTS.find((p) => p.id === 4) || PRODUCTS[0],
    giftTag: 'هدية مكتبية كلاسيكية',
    whyItsAGreatGift: 'تغير ملمس سطح المكتب فوراً وتمنح شعوراً فاخراً وهدوءاً أثناء الكتابة وتحريك الفأرة.',
    recipientPersona: 'developer',
    budgetTier: classifyProductBudgetTier(145),
    recommendedPackaging: 'صندوق كرافت أسطواني مع شريط قطني',
  },
  {
    id: 'gift-brass-organizer',
    product: PRODUCTS.find((p) => p.id === 5) || PRODUCTS[0],
    giftTag: 'لمسة تنظيم فاخرة',
    whyItsAGreatGift: 'مصنوع من النحاس المصمت الثقيل، يضفي هيبة وفخامة وينهي فوضى الكابلات والبطاقات.',
    recipientPersona: 'executive',
    budgetTier: classifyProductBudgetTier(129),
    recommendedPackaging: 'علبة هدايا سوداء مع بطاقة تهنئة مختومة',
  },
  {
    id: 'gift-ergonomic-mouse',
    product: PRODUCTS.find((p) => p.id === 8) || PRODUCTS[0],
    giftTag: 'هدية الراحة والإنتاجية',
    whyItsAGreatGift: 'تصميم مريح لليد يقلل إجهاد المعصم خلال ساعات العمل والبرمجة الطويلة.',
    recipientPersona: 'developer',
    budgetTier: classifyProductBudgetTier(185),
    recommendedPackaging: 'تغليف هدايا أنيق مع شريط ساتان',
  },
  {
    id: 'gift-leather-mat',
    product: PRODUCTS.find((p) => p.id === 9) || PRODUCTS[0],
    giftTag: 'جلد طبيعي فاخر',
    whyItsAGreatGift: 'جلد نباتي إيطالي مصبوغ يكتسب رونقاً وجمالاً مع الاستخدام والزمن.',
    recipientPersona: 'creator',
    budgetTier: classifyProductBudgetTier(165),
    recommendedPackaging: 'غلاف قماشي مطرز برباط قطني',
  },
  {
    id: 'gift-keyboard',
    product: PRODUCTS.find((p) => p.id === 1) || PRODUCTS[0],
    giftTag: 'الهدية الأكثر طلباً',
    whyItsAGreatGift: 'صوت كتابة ناعم ومريح ومظهر مينيمالي أنيق يرفع مستوى أي مكتب برمجيات.',
    recipientPersona: 'developer',
    budgetTier: classifyProductBudgetTier(310),
    recommendedPackaging: 'صندوق فاخر مخصص للهدايا مع بطاقة إهداء',
  },
  {
    id: 'gift-headphones',
    product: PRODUCTS.find((p) => p.id === 2) || PRODUCTS[0],
    giftTag: 'هدية التركيز المطلق',
    whyItsAGreatGift: 'عزل ضوضاء فعال يضمن صفاء الذهن والتركيز في بيئات العمل المفتوحة والمنزلية.',
    recipientPersona: 'creator',
    budgetTier: classifyProductBudgetTier(389),
    recommendedPackaging: 'حقيبة سفر مدمجة مع تغليف شريطي راقٍ',
  },
  {
    id: 'gift-lamp',
    product: PRODUCTS.find((p) => p.id === 3) || PRODUCTS[0],
    giftTag: 'دفء الإضاءة المعمارية',
    whyItsAGreatGift: 'إضاءة دافئة مريحة للعين مع تشطيب نحاسي مصقول يزين زاوية المكتب.',
    recipientPersona: 'creator',
    budgetTier: classifyProductBudgetTier(275),
    recommendedPackaging: 'صندوق حماية هدايا مع ملصق الشمع الفاخر',
  },
  {
    id: 'gift-monitor-stand',
    product: PRODUCTS.find((p) => p.id === 6) || PRODUCTS[0],
    giftTag: 'صحة العمود الفقري والمكتب',
    whyItsAGreatGift: 'يرفع الشاشة لمستوى العين الطبيعي ويخلق مساحة تخزين سفلية ذكية من خشب البلوط الطبيعي.',
    recipientPersona: 'executive',
    budgetTier: classifyProductBudgetTier(295),
    recommendedPackaging: 'تغليف بيئي أنيق من ورق الواشي الياباني',
  },
  {
    id: 'gift-dock',
    product: PRODUCTS.find((p) => p.id === 7) || PRODUCTS[0],
    giftTag: 'الهدية التقنية المتكاملة',
    whyItsAGreatGift: 'منفذ واحد يشحن الحاسوب ويوصل الشاشات والملحقات بكفاءة وأمان كامل.',
    recipientPersona: 'executive',
    budgetTier: classifyProductBudgetTier(420),
    recommendedPackaging: 'علبة هدايا بريميوم مع كابل ثندربولت مدمج',
  },
  {
    id: 'gift-curved-monitor',
    product: PRODUCTS.find((p) => p.id === 10) || PRODUCTS[0],
    giftTag: 'الهدية الملكية الاستثنائية',
    whyItsAGreatGift: 'ترقية بصرية مذهلة تحول المكتب إلى منصة عمل ومراقبة احترافية لا مثيل لها.',
    recipientPersona: 'developer',
    budgetTier: classifyProductBudgetTier(1490),
    recommendedPackaging: 'توصيل هدايا VIP خاص حتى باب الغرفة',
  },
  {
    id: 'gift-pc-case',
    product: PRODUCTS.find((p) => p.id === 11) || PRODUCTS[0],
    giftTag: 'تحفة معمارية خشبية',
    whyItsAGreatGift: 'مزيج فريد من خشب الجوز المصمت وشبك التهوية الدقيق لمحبي الفخامة الحاسوبية.',
    recipientPersona: 'creator',
    budgetTier: classifyProductBudgetTier(680),
    recommendedPackaging: 'صندوق هدايا خشبي محفور مخصص',
  },
];

export async function fetchAllGifts(): Promise<readonly GiftItem[]> {
  return GIFT_ITEMS;
}
