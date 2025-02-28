import Container from '@components/ui/container';
import { Metadata } from 'next';
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
  description: 'Best Online Electronic Store in Jayapura, Papua',
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

        {/* <CategoryGridListBlock lang={lang} className="mb-6 lg:mb-8" /> */}
      </Container>
    </>
  );
}
