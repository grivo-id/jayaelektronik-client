'use client';

import MobileNavigation from '@layouts/mobile-navigation/mobile-navigation';
import { useIsMounted } from '@utils/use-is-mounted';
import Footer from '@layouts/footer/footer';
import Header from '@layouts/default/header';
import ClientRenderedHighLightedBar from './client-highlighbar';

export default function ModernLayout({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}) {
  const isMounted = useIsMounted();

  return (
    <div className="flex flex-col min-h-screen">
      {isMounted && <ClientRenderedHighLightedBar lang={lang} />}
      {/* End of highlighted bar  */}

      <Header lang={lang} />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer lang={lang} />
      <MobileNavigation lang={lang} />
    </div>
  );
}
