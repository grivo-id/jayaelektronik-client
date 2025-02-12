import ShopsPageContent from '@components/shops/shops-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import { shops } from './shops';

export const metadata: Metadata = {
  title: 'Shops',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <PageHeroSection heroTitle="text-shop-page" lang={lang} />
      <ShopsPageContent shops={shops} lang={lang} />
    </>
  );
}
