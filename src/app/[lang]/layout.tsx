import ManagedModal from '@components/common/modal/managed-modal';
import { ManagedUIContext } from '@contexts/ui.context';
import { dir } from 'i18next';
import { languages } from '../i18n/settings';
import ManagedDrawer from '@components/common/drawer/managed-drawer';
import { Metadata } from 'next';
import ToasterProvider from 'src/app/provider/toaster-provider';
import Providers from 'src/app/provider/provider';
import { Rubik } from 'next/font/google';
// external
import 'react-toastify/dist/ReactToastify.css';

// base css file
import '@assets/css/scrollbar.css';
import '@assets/css/swiper-carousel.css';
import '@assets/css/custom-plugins.css';
import './globals.css';
import '@assets/css/rc-drawer.css';
import '@assets/css/themes.scss';
import BannerPopupProvider from '../provider/banner-provider';

const rubik = Rubik({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: {
    template: 'Jaya Elektronik | %s',
    default: 'Jaya Elektronik',
  },
};

export async function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const validLanguages = ['ina', 'en'];
  const lang = params.lang;
  const isValidLang = validLanguages.includes(lang);
  const actualLang = isValidLang ? lang : 'ina';

  return (
    <html lang={actualLang} dir={dir(lang)}>
      <body className={`${rubik.variable}`}>
        <Providers>
          <ManagedUIContext>
            {children}
            <ManagedModal lang={lang} />
            <ManagedDrawer lang={lang} />
            <BannerPopupProvider />
            <ToasterProvider />
          </ManagedUIContext>
        </Providers>
      </body>
    </html>
  );
}
