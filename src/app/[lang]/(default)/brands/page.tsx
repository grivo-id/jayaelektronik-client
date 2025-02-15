import BrandsPageContent from '@components/brands/brands-page-content';
import ShopsPageContent from '@components/shops/shops-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brands',
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
      <PageHeroSection heroTitle="text-brands-page" lang={lang} />
      <BrandsPageContent lang='lang' />
    </>
  );
}
