import type { Metadata } from 'next';
import { Readex_Pro, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const readexPro = Readex_Pro({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-readex',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ShopBoard | استوديو أثاث مكتبي مستوحى من فلسفة أكاري',
  description: 'متجر وتجربة تفاعلية ثلاثية الأبعاد لتنسيق مساحات العمل المكتبية بأناقة وتناغم.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${readexPro.variable} ${ibmPlexArabic.variable}`}>
      <body className="antialiased min-h-screen bg-[var(--washi-ivory)] text-[var(--charcoal-ink)] font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
