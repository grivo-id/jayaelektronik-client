import { Rubik } from 'next/font/google';
import { Metadata } from 'next';
import './[lang]/globals.css';
import GoogleAnalytics from '@settings/google-analytics';

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Jaya Elektronik',
};

export default function RootLayout({
  children,
  lang = 'ina',
}: {
  children: React.ReactNode;
  lang?: string;
}) {
  const GA_MEASUREMENT_ID = 'G-FCPVSKMZGJ';
  return (
    <html lang={lang} suppressHydrationWarning={true}>
      <body className={`${rubik.variable}`} suppressHydrationWarning={true}>
        <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        {children}
      </body>
    </html>
  );
}
