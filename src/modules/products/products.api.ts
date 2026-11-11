import type { Product, CategoryType, ApiProduct } from './products.types';
import { apiClient } from '../../shared/api/client';

export const PRODUCTS: readonly Product[] = [
  {
    id: 1,
    sku: 'SB-KEY-01',
    name: 'لوحة مفاتيح ميكانيكية لاسلكية',
    subtitle: 'Minimalist wireless mechanical keyboard',
    category: 'لوحات مفاتيح',
    price: 310,
    originalPrice: 380,
    rating: 4.9,
    reviewsCount: 140,
    description:
      'لوحة مفاتيح ميكانيكية لاسلكية مدمجة 75% بأغطية مفاتيح PBT دافئة ومفاتيح خطية ناعمة قابلة للتبديل السريع.',
    specs: [
      'اتصال ثلاثي بلوتوث + 2.4GHz + سلكي',
      'مفاتيح Hot-Swap مسبقة التشحيم',
      'متوافقة مع Mac و Windows',
    ],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/keyboard.jpg',
    plateId: 'card-1',
    tag: 'الأعلى تقييماً',
    colors: [
      { name: 'عاجي ريترو Vintage Ivory', hex: '#f5f0e6' },
      { name: 'رمادي جرافيت فلكي Graphite Gray', hex: '#2d3139' },
      { name: 'أخضر خيزران غابات Forest Sage', hex: '#3b4e43' },
    ],
    variantGroups: [
      {
        id: 'switches',
        title: 'نوع المفاتيح (Switches)',
        options: [
          { id: 'red', label: 'مفاتيح حمراء خطية صامتة (Linear Red)' },
          { id: 'brown', label: 'مفاتيح بنية لمسية ناعمة (Tactile Brown)' },
          { id: 'blue', label: 'مفاتيح زرقاء نقرية (Clicky Blue)' },
        ],
      },
      {
        id: 'layout',
        title: 'تخطيط لغة الأحرف',
        options: [
          { id: 'ar-en', label: 'عربي + إنجليزي ليزر دائم' },
          { id: 'en', label: 'إنجليزي فقط مينيماليست' },
        ],
      },
    ],
  },
  {
    id: 2,
    sku: 'SB-AUDIO-02',
    name: 'سماعة استوديو ANC احترافية',
    subtitle: 'ANC-400m studio headphones',
    category: 'صوتيات المكتب',
    price: 389,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 124,
    description:
      'سماعة رأس استوديو احترافية بعزل ضوضاء نشط هجين ومحركات صوتية مقاس 45 ملم لتركيز عميق طوال اليوم.',
    specs: ['عزل ضوضاء نشط ANC هجين', 'بطارية تدوم 40 ساعة', 'وسائد جلدية مريحة للاستخدام الطويل'],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/headphones.jpg',
    plateId: 'card-2',
    tag: 'الأكثر مبيعاً',
    colors: [
      { name: 'أسود أونيكس غير لامع Matte Black', hex: '#18181b' },
      { name: 'فضي بلاتيني ناصع Platinum Silver', hex: '#d1d5db' },
      { name: 'كحلي ليلي عميق Midnight Navy', hex: '#1e293b' },
    ],
    variantGroups: [
      {
        id: 'pads',
        title: 'نوع وسائد الأذن',
        options: [
          { id: 'leather', label: 'جلد بروتيني عازل للضوضاء' },
          { id: 'velour', label: 'قماش مخملي مهوّى للتنفس (Velour)' },
        ],
      },
      {
        id: 'bundle',
        title: 'الملحقات الإضافية',
        options: [
          { id: 'std', label: 'الحزمة القياسية (كيبل + محول 6.3mm)' },
          { id: 'stand', label: 'مع حامل سماعة نحاسي فاخر للمكتب', priceModifier: 75 },
        ],
      },
    ],
  },
  {
    id: 3,
    sku: 'SB-LAMP-03',
    name: 'مصباح مكتب معماري نحاسي',
    subtitle: 'Architectural brass desk lamp',
    category: 'إضاءة المكتب',
    price: 275,
    originalPrice: 340,
    rating: 4.8,
    reviewsCount: 64,
    description:
      'مصباح مكتب مفصلي من النحاس المصقول يمنح إضاءة دافئة خالية من الوميض ومريحة للعين أثناء ساعات العمل.',
    specs: ['نحاس مصقول مقاوم للأكسدة', 'إضاءة دافئة 3000K CRI 95+', 'ذراع مفصلي قابل للتوجيه'],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/lamp.jpg',
    plateId: 'card-3',
    tag: 'إصدار خاص',
    colors: [
      { name: 'نحاس أصفر مصقول Brushed Brass', hex: '#d4af37' },
      { name: 'نحاس برونزي معتق Antique Bronze', hex: '#785434' },
      { name: 'أسود فحمي بلمسات نحاسية Black/Brass', hex: '#1c1917' },
    ],
    variantGroups: [
      {
        id: 'mount',
        title: 'طريقة التثبيت',
        options: [
          { id: 'base', label: 'قاعدة دائرية مصمتة ثقيلة' },
          { id: 'clamp', label: 'مشبك تثبيت جانبي (Desk Clamp)' },
        ],
      },
      {
        id: 'kelvin',
        title: 'درجة حرارة الإضاءة',
        options: [
          { id: '2700k', label: 'إضاءة دافئة مريحة 2700K' },
          { id: '4000k', label: 'إضاءة نهارية محايدة 4000K' },
        ],
      },
    ],
  },
  {
    id: 4,
    sku: 'SB-MOUSE-04',
    name: 'ماوس عمودي هندسي مريح',
    subtitle: 'Ergonomic vertical mouse',
    category: 'ملحقات التحكم',
    price: 220,
    originalPrice: 265,
    rating: 4.8,
    reviewsCount: 92,
    description:
      'ماوس لاسلكي عمودي بزاوية مصممة هندسياً بـ 57 درجة لتقليل إجهاد المعصم مع عجلة تمرير معدنية دقيقة.',
    specs: ['مستشعر بصري 4000 DPI', 'عجلة تمرير من النحاس والألمنيوم', 'شحن سريع عبر منفذ USB-C'],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/mouse.jpg',
    plateId: 'card-4',
    tag: 'تصميم هندسي',
    colors: [
      { name: 'رمادي حجري ناعم Slate Gray', hex: '#4b5563' },
      { name: 'أبيض عاجي Off-White', hex: '#f3f4f6' },
      { name: 'أسود كربوني Carbon Black', hex: '#111827' },
    ],
    variantGroups: [
      {
        id: 'hand',
        title: 'جهة الاستخدام',
        options: [
          { id: 'right', label: 'يد يمنى قياسية (Right Hand)' },
          { id: 'left', label: 'يد يسرى مخصصة (Left Hand)' },
        ],
      },
      {
        id: 'connectivity',
        title: 'نوع الاتصال والشحن',
        options: [
          { id: 'std', label: 'بلوتوث + 2.4GHz وشحن Type-C' },
          { id: 'qi', label: 'مع دعم الشحن اللاسلكي السريع Qi', priceModifier: 45 },
        ],
      },
    ],
  },
  {
    id: 5,
    sku: 'SB-ORG-05',
    name: 'منظم المكتب النحاسي',
    subtitle: 'Brass desk pen cup',
    category: 'تنظيم المكتب',
    price: 145,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 53,
    description:
      'وحدة تنظيم مكتبية أسطوانية من النحاس المصمت المصقول لحفظ الأقلام والأدوات الهندسية بثبات وأناقة.',
    specs: [
      'نحاس مصمت بوزن متوازن 420 جرام',
      'قاعدة مبطنة بالفلين لحماية الخشب',
      'تشطيب يدوي دافئ',
    ],
    warranty: 'ضمان مدى الحياة ضد الصدأ',
    image: '/assets/products/brass-organizer.jpg',
    plateId: 'sidebar-featured',
    tag: 'قطعة مختارة',
    colors: [
      { name: 'نحاس أصفر طبيعي Natural Brass', hex: '#d4af37' },
      { name: 'نحاس أسود داكن Gunmetal Brass', hex: '#374151' },
    ],
    variantGroups: [
      {
        id: 'design',
        title: 'شكل المنظم والتصميم',
        options: [
          { id: 'single', label: 'أسطوانة أقلام فردية مدمجة' },
          { id: 'tray', label: 'صينية أدوات ومذكرات مكتبية متكاملة', priceModifier: 35 },
        ],
      },
    ],
  },
  {
    id: 6,
    sku: 'SB-STAND-06',
    name: 'حامل شاشة مكتبي من خشب البلوط',
    subtitle: 'Solid oak monitor riser shelf',
    category: 'تنظيم المكتب',
    price: 340,
    originalPrice: 410,
    rating: 4.9,
    reviewsCount: 78,
    description:
      'رف شاشة مكتبي عريض من خشب البلوط الطبيعي مع مساحة سفلية مخصصة لتخزين لوحة المفاتيح والملحقات.',
    specs: ['خشب بلوط طبيعي معالج بالزيت', 'يتحمل وزن حتى 25 كجم', 'فتحة خلفية لتمرير الكابلات'],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/monitor-stand.jpg',
    tag: 'وصل حديثاً',
    colors: [
      { name: 'خشب بلوط طبيعي فاتح Natural Oak', hex: '#c8a575' },
      { name: 'خشب جوز داكن فاخر Dark Walnut', hex: '#4a3728' },
      { name: 'خشب أسود رمادي Ash Black', hex: '#1f2421' },
    ],
    variantGroups: [
      {
        id: 'width',
        title: 'عرض الحامل والمقاس',
        options: [
          { id: '80cm', label: 'شاشة واحدة (عرض 80 سم)' },
          { id: '115cm', label: 'شاشتان أو شاشة عريضة (عرض 115 سم)', priceModifier: 80 },
        ],
      },
      {
        id: 'drawer',
        title: 'درج التخزين السفلي',
        options: [
          { id: 'none', label: 'بدون درج (مساحة مفتوحة للوحة المفاتيح)' },
          { id: 'felt', label: 'مع درج سحب مبطن باللباد الصوفي', priceModifier: 60 },
        ],
      },
    ],
  },
  {
    id: 7,
    sku: 'SB-DOCK-07',
    name: 'موزع منافذ Thunderbolt 4 الاحترافي',
    subtitle: '12-in-1 Aluminum Desktop Dock',
    category: 'ملحقات التحكم',
    price: 480,
    originalPrice: 560,
    rating: 4.8,
    reviewsCount: 47,
    description:
      'محطة توصيل مكتبية متكاملة بهيكل ألمنيوم مؤكسد تدعم شاشتين 4K وشحن الحاسب المحمول بقدرة 96 واط.',
    specs: [
      '12 منفذاً احترافياً شاملاً SD 4.0',
      'شحن PD بقدرة 96W',
      'منفذ إيثرنت 2.5GbE فائق السرعة',
    ],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/dock.jpg',
    tag: 'أداء فائق',
    colors: [
      { name: 'رمادي فلكي Space Gray', hex: '#4b5563' },
      { name: 'فضي ألمنيوم مؤكسد Silver', hex: '#e5e7eb' },
    ],
    variantGroups: [
      {
        id: 'cable',
        title: 'طول كيبل Thunderbolt 4 المرفق',
        options: [
          { id: '0.8m', label: 'كيبل بطول 0.8 متر عالي السرعة 40Gbps' },
          { id: '1.8m', label: 'كيبل بطول 1.8 متر مضفر فائق المتانة', priceModifier: 90 },
        ],
      },
    ],
  },
  {
    id: 8,
    sku: 'SB-MAT-08',
    name: 'لباد مكتب من الصوف الطبيعي والفلين',
    subtitle: 'Merino wool & cork desk mat',
    category: 'تنظيم المكتب',
    price: 125,
    originalPrice: 160,
    rating: 4.7,
    reviewsCount: 84,
    description:
      'لباد مكتب واسع الملمس يعزل البرودة ويوفر سطحاً متوازناً لحركة الماوس وثبات لوحة المفاتيح.',
    specs: ['أبعاد واسعة 90 × 40 سم', 'قاعدة فلين طبيعي مانعة للانزلاق', 'مقاوم للتنسيل والبقع'],
    warranty: 'ضمان سنة شاملة',
    image: '/assets/products/desk-mat.jpg',
    tag: '',
    colors: [
      { name: 'رمادي صوف فحمي Anthracite', hex: '#33373b' },
      { name: 'رمادي صوف فاتح Heather Gray', hex: '#9ca3af' },
      { name: 'بيج قمح دافئ Oat Beige', hex: '#d2b48c' },
    ],
    variantGroups: [
      {
        id: 'size',
        title: 'المقاس المكتبي',
        options: [
          { id: 'm', label: 'قياسي متوسط (80 × 30 سم)' },
          { id: 'l', label: 'كبير واسع (90 × 40 سم)', priceModifier: 35 },
          { id: 'xl', label: 'كامل سطح المكتب (100 × 50 سم)', priceModifier: 65 },
        ],
      },
    ],
  },
  {
    id: 9,
    sku: 'SB-PC-09',
    name: 'صندوق حاسب ألعاب Aorus الاحترافي',
    subtitle: 'Custom Aorus Tempered Glass Gaming PC',
    category: 'أجهزة ألعاب',
    price: 4850,
    originalPrice: 5400,
    rating: 5.0,
    reviewsCount: 38,
    description:
      'كيسة حاسوب ألعاب احترافية بواجهة زجاجية مقساة وثلاث مراوح RGB أمامية متزامنة، مع دعم بطاقات الشاشة العملاقة وتبريد مائي متقدم.',
    specs: [
      'واجهة زجاجية شفافة Tempered Glass',
      '3 مراوح ARGB 120mm مدمجة',
      'دعم لوحات ATX والتبريد السائل 360mm',
    ],
    warranty: 'ضمان سنتين شامل',
    image: '/assets/products/pc-case.jpg',
    tag: 'الأعلى أداءً',
    colors: [
      { name: 'أسود أونيكس مع زجاج مقسّى Dark Glass Black', hex: '#111111' },
      { name: 'أبيض جليدي Glacier White', hex: '#f8fafc' },
    ],
    variantGroups: [
      {
        id: 'cooling',
        title: 'نظام التبريد المسبق',
        options: [
          { id: 'air', label: '3 مراوح ARGB 120mm أمامية عالية التدفق' },
          { id: 'aio', label: 'نظام تبريد مائي مغلق AIO 360mm متزامن', priceModifier: 450 },
        ],
      },
      {
        id: 'panel',
        title: 'اللوحة الجانبية',
        options: [
          { id: 'glass', label: 'زجاج مقسّى فائق الشفافية' },
          { id: 'mesh', label: 'شبكة تهوية هوائية تبريدية Mesh' },
        ],
      },
    ],
  },
  {
    id: 10,
    sku: 'SB-MON-10',
    name: 'شاشة ألعاب منحنية Gigabyte 34 بوصة',
    subtitle: 'Gigabyte G34WQC Ultrawide Curved Monitor',
    category: 'شاشات العرض',
    price: 2750,
    originalPrice: 3100,
    rating: 4.9,
    reviewsCount: 71,
    description:
      'شاشة ألعاب فائقة العرض بدقة WQHD بمعدل تحديث 144Hz وانحناء 1500R لبيئة عمل وألعاب غامرة وواسعة.',
    specs: [
      'دقة WQHD (3440 x 1440) بمعدل 144Hz',
      'انحناء 1500R وزاوية رؤية واسعة',
      'حامل معدني متين قابل لتعديل الارتفاع',
    ],
    warranty: 'ضمان ثلاث سنوات شامل',
    image: '/assets/products/curved-monitor.jpg',
    tag: 'سيت أب احترافي',
    colors: [
      { name: 'أسود استوديو غير عاكس Matte Black', hex: '#18181b' },
    ],
    variantGroups: [
      {
        id: 'mount',
        title: 'خيار الحامل والتثبيت',
        options: [
          { id: 'desk-stand', label: 'حامل مكتبي هيدروليكي أصلي قابل لضبط الارتفاع' },
          { id: 'vesa-arm', label: 'مع ذراع تثبيت VESA غازي يثبت على حافة المكتب', priceModifier: 190 },
        ],
      },
    ],
  },
];

export const CATEGORIES: readonly CategoryType[] = [
  'الكل',
  'أجهزة ألعاب',
  'شاشات العرض',
  'لوحات مفاتيح',
  'صوتيات المكتب',
  'إضاءة المكتب',
  'ملحقات التحكم',
  'تنظيم المكتب',
];

const API_PRODUCT_IMAGES: Record<number, string> = {
  1: '/assets/products/api-leather-tote.jpg',
  2: '/assets/products/api-canvas-backpack.jpg',
  3: '/assets/products/api-crossbody-bag.jpg',
  4: '/assets/products/api-white-sneakers.jpg',
  5: '/assets/products/api-running-shoes.jpg',
  6: '/assets/products/api-suede-loafers.jpg',
  7: '/assets/products/api-wool-scarf.jpg',
  8: '/assets/products/api-silver-watch.jpg',
  9: '/assets/products/api-sunglasses.jpg',
  10: '/assets/products/api-travel-duffel.jpg',
  11: '/assets/products/api-rain-boots.jpg',
  12: '/assets/products/api-leather-belt.jpg',
};

const CATEGORY_NAMES_AR: Record<string, string> = {
  Bags: 'تنظيم المكتب',
  Shoes: 'ملحقات التحكم',
  Accessories: 'صوتيات المكتب',
};

export function toProduct(api: ApiProduct): Product {
  const image = API_PRODUCT_IMAGES[api.id] || '/assets/products/api-leather-tote.jpg';
  const category = CATEGORY_NAMES_AR[api.category_name] || api.category_name;

  let colors: { name: string; hex: string }[] | undefined;
  let variantGroups: { id: string; title: string; options: { id: string; label: string; priceModifier?: number }[] }[] | undefined;

  if (api.category_name === 'Bags') {
    colors = [
      { name: 'جملي طبيعي Classic Tan', hex: '#c28b58' },
      { name: 'أسود ملكي Royal Black', hex: '#1c1917' },
      { name: 'بني إسبريسو Espresso', hex: '#452c1e' },
    ];
    variantGroups = [
      {
        id: 'size',
        title: 'مقاس الحقيبة وسعة الحاسب',
        options: [
          { id: '13', label: 'حجم 13-14 بوصة مدمج' },
          { id: '15', label: 'حجم 15-16 بوصة احترافي', priceModifier: 40 },
        ],
      },
    ];
  } else if (api.category_name === 'Shoes') {
    colors = [
      { name: 'أبيض كلاسيكي Crisp White', hex: '#f8fafc' },
      { name: 'أسود فحمي Charcoal Black', hex: '#18181b' },
      { name: 'بني جلدي Warm Leather', hex: '#5c3d2e' },
    ];
    variantGroups = [
      {
        id: 'size',
        title: 'المقاس (EU)',
        options: [
          { id: '40', label: '40 EU' },
          { id: '41', label: '41 EU' },
          { id: '42', label: '42 EU' },
          { id: '43', label: '43 EU' },
          { id: '44', label: '44 EU' },
        ],
      },
    ];
  } else {
    colors = [
      { name: 'فضي بلاتيني Platinum', hex: '#cbd5e1' },
      { name: 'ذهبي دافئ Brass/Gold', hex: '#d4af37' },
      { name: 'أسود مطفي Matte Black', hex: '#27272a' },
    ];
    variantGroups = [
      {
        id: 'edition',
        title: 'طراز الإصدار',
        options: [
          { id: 'std', label: 'إصدار قياسي' },
          { id: 'gift', label: 'طراز إهداء مع علبة خشبية مخصصة', priceModifier: 35 },
        ],
      },
    ];
  }

  return {
    id: 1000 + api.id,
    sku: `SB-API-${api.id}`,
    name: api.title,
    category,
    price: api.price_cents / 100,
    originalPrice: Math.round((api.price_cents / 100) * 1.3),
    inStock: api.in_stock,
    stock: api.in_stock ? 10 : 0,
    rating: 4.8,
    reviewsCount: 15 + api.id * 3,
    description: `منتج عالي الجودة بتصميم أنيق وخامات متينة تناسب مساحة العمل اليومية.`,
    image,
    colors,
    variantGroups,
    specs: ['خامات متينة عالية الجودة', api.in_stock ? 'متوفر للشحن الفوري' : 'غير متوفر حالياً'],
    tag: api.in_stock ? 'جديد' : undefined,
    badge: api.in_stock ? 'متوفر' : 'غير متوفر',
    toneClass: 'tone-studio-slate',
    artKey: 'audio',
    isFromApi: true,
  };
}

export const API_PRODUCTS_RAW: readonly ApiProduct[] = [
  { id: 1, title: 'حقيبة مكتب توت جلدية (Leather Tote Bag)', category_name: 'Bags', price_cents: 8900, in_stock: true },
  { id: 2, title: 'حقيبة ظهر قماشية كانفاس (Canvas Backpack)', category_name: 'Bags', price_cents: 4900, in_stock: true },
  { id: 3, title: 'حقيبة كتف مدمجة (Mini Crossbody Bag)', category_name: 'Bags', price_cents: 3900, in_stock: false },
  { id: 4, title: 'حذاء سنيكرز أبيض مريح (White Sneakers)', category_name: 'Shoes', price_cents: 7500, in_stock: true },
  { id: 5, title: 'حذاء رياضي مرن للاستوديو (Running Shoes)', category_name: 'Shoes', price_cents: 11000, in_stock: true },
  { id: 6, title: 'حذاء لوفر سويد كلاسيكي (Suede Loafers)', category_name: 'Shoes', price_cents: 9500, in_stock: true },
  { id: 7, title: 'وشاح صوف ميرينو دافئ (Wool Scarf)', category_name: 'Accessories', price_cents: 2500, in_stock: true },
  { id: 8, title: 'ساعة مكتب فضية أنيقة (Silver Watch)', category_name: 'Accessories', price_cents: 15000, in_stock: true },
  { id: 9, title: 'نظارة استوديو واقية (Sunglasses)', category_name: 'Accessories', price_cents: 3500, in_stock: false },
  { id: 10, title: 'حقيبة سفر دافل جلدية (Travel Duffel Bag)', category_name: 'Bags', price_cents: 12000, in_stock: true },
  { id: 11, title: 'حذاء مطري مقاوم للماء (Rain Boots)', category_name: 'Shoes', price_cents: 6000, in_stock: true },
  { id: 12, title: 'حزام جلد طبيعي بإبزيم نحاسي (Leather Belt)', category_name: 'Accessories', price_cents: 3000, in_stock: true },
];

export const API_PRODUCTS: readonly Product[] = API_PRODUCTS_RAW.map(toProduct);

export const ALL_PRODUCTS: readonly Product[] = [...PRODUCTS, ...API_PRODUCTS];

export async function fetchRemoteProducts(endpoint: string = '/api/products'): Promise<Product[]> {
  try {
    const json = await apiClient<{ items: ApiProduct[]; total: number }>(endpoint);
    if (!json.items) return [...API_PRODUCTS];
    return json.items.map(toProduct);
  } catch {
    return [...API_PRODUCTS];
  }
}

export async function fetchProducts(): Promise<readonly Product[]> {
  return ALL_PRODUCTS;
}
