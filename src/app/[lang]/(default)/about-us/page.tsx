import AboutPageContent from '@components/about/about-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
    console.log('lang' , lang)
  return (
    <>
      <PageHeroSection
        heroTitle="text-about-page"
        lang={lang}
      />
      <AboutPageContent lang={lang} />
    </>
  );
}
