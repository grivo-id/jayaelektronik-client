import Container from '@components/ui/container';
import { Metadata } from 'next';
import Script from 'next/script';
import FeatureCarousel from '@components/common/featured-carousel';
import BannerGridTwo from '@components/common/banner-grid-two';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import BestSellerProductFeed from '@components/product/feeds/best-seller-top-product';
import {
  homeOnesGridHero as bannerTwo,
  homeOnesGridHero2 as bannerTwo2,
  homeJayaHeroSlider as heroSlider,
} from '@framework/static/banner';
import ProductWithBestDeals from '@components/product/product-with-best-deals';
import NewArrivalProductFeed from '@components/product/feeds/new-arrival-product';
import SupperCategoryAcFeed from '@components/product/feeds/supercategory-ac-feed';
import SuperCategoryTelevisionFeed from '@components/product/feeds/supercategory-television-feed';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'A modern electronics retail store with the first after-sales service in Jayapura. We sell office and household electronic products from various brands with warranties and high quality at affordable prices. ',
  keywords:
    'jayaelektronik, jaya, elektronik, papua, jayapura, percetakan, abepura, toko elektronik, electronic store, after-sales service, household electronics, office electronics, electronics warranty, affordable electronics, appliances, tv shop, audio systems, air conditioner, refrigerator, washing machine, electronic repair, electronics service center, jayapura electronics, papua electronics, best price electronics, branded electronics, premium electronics',
  authors: [
    {
      name: 'Jaya Elektronik & Grivo.id',
      url: 'https://www.jayaelektronik.com',
    },
  ],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://www.jayaelektronik.com',
    title: 'Jaya Elektronik | Best Electronics Retail Store',
    description:
      'A modern electronics retail store with the first after-sales service in Jayapura. We sell office and household electronic products from various brands with warranties and high quality at affordable prices. ',

    siteName: 'Jaya Elektronik',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
        alt: 'Jaya Elektronik - Electronics Store in Jayapura',
      },
    ],
  },
  twitter: {
    title: 'Jaya Elektronik | Best Electronics Retail Store',
    card: 'summary_large_image',
    site: 'https://www.jayaelektronik.com',
    creator: 'Jaya Elektronik & Grivo.id',
    images:
      'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  },
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
      <Script id="homepage-jsonld" type="application/ld+json">
        {JSON.stringify(HomepageJSONLD)}
      </Script>
      <HeroSliderBlock
        lang={lang}
        heroBanner={heroSlider}
        showHeroContent={false}
        className={`mb-8 mt-8 `}
        contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 min-h-[140px] md:min-h-[240px] xl:min-h-[360px] 2xl:min-h-[450px]"
      />
      <Container>
        <FeatureCarousel lang={lang} />
        <BannerAllCarousel lang={lang} className="mb-2 lg:mb-4" />
        <ProductWithBestDeals lang={lang} />
        <BannerGridTwo
          lang={lang}
          data={bannerTwo}
          className="mb-8 lg:mb-12"
          girdClassName="xl:gap-5 "
        />
        <BestSellerProductFeed lang={lang} variant={`cardv2`} />
        <NewArrivalProductFeed lang={lang} variant={`cardv2`} />
        <BannerGridTwo
          lang={lang}
          data={bannerTwo2}
          className="mb-0 lg:mb-12"
          girdClassName="xl:gap-5 "
        />
        <SupperCategoryAcFeed lang={lang} />
        <SuperCategoryTelevisionFeed lang={lang} />
      </Container>
    </>
  );
}

const HomepageJSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.jayaelektronik.com',
  name: 'JayaElektronik | Best Online Electronic Store in Jayapura, Papua',
  // potentialAction: {
  //   '@type': 'SearchAction',
  //   target: {
  //     '@type': 'EntryPoint',
  //     urlTemplate: `https://www.jayaelektronik.com/`,
  //   },
  //   'query-input': 'required name=search_term_string',
  // },
};
