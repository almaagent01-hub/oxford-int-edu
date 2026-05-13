import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter, Fraunces } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Oxford International Education Group — Study MBBS Abroad',
  description:
    'Official admissions partner for government medical universities in Uzbekistan and Kazakhstan. Study MBBS at WHO-listed, MCI-recognised universities with zero donation fees.',
  keywords: 'MBBS abroad, medical university Uzbekistan, medical university Kazakhstan, Tashkent State Medical Academy, study medicine abroad, government medical university',
  openGraph: {
    title: 'Oxford International Education Group',
    description: 'Your Medical Career. Our Proven Path.',
    type: 'website',
    url: 'https://oxfordinternationaleducationalgroup.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
