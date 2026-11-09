import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ShopBoard | أتيليه أكاري للأثاث المكتبي',
    short_name: 'ShopBoard',
    description: 'متجر وتجربة تفاعلية ثلاثية الأبعاد لتنسيق مساحات العمل المكتبية بأناقة وتناغم.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f2eada',
    theme_color: '#252522',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}

