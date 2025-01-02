import Container from '@components/ui/container';
import {
    homeSixHeroSlider as heroSlider,
    homeFourGridHero as bannerGrid,
    homeFourGridHero2 as bannerGrid2, bannerBrand,
} from '@framework/static/banner';
import { Metadata } from 'next';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import FeatureCarousel from "@components/common/featured-carousel-four";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import LatestblogCarousel from "@components/common/latestblog-four";
import SuppercategoryPopular from "@components/product/feeds/suppercategory-popular";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-v2";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-v2";
import BestSellerProductFeed from "@components/product/feeds/best-seller-top-product";

export const metadata: Metadata = {
  title: 'Home 6',
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
      <Container className={'sm:max-w-[1730px]'}>
        <FeatureCarousel
          lang={lang}
          className={'home4-featuredCarousel'}
          classNameCarousel={'bg-white'}
        />
        <BannerGrid
          lang={lang}
          data={bannerGrid}
          grid={3}
          className="mb-8 lg:mb-12"
        />
        <BestSellerProductFeed lang={lang} variant={'cardv2'} />
        <ListingTabsElectronicFeed lang={lang} />

        <BannerGrid
          lang={lang}
          data={bannerGrid2}
          grid={3}
          className="mb-8 lg:mb-12"
        />

        <ListingTabsClothFeed lang={lang} />
        <LatestblogCarousel lang={lang} className="mb-8 lg:mb-12" />
      </Container>
    </>
  );
}
