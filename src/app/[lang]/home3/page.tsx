import HeroBannerCard from '@components/hero/hero-banner-card';
import Container from '@components/ui/container';
import { Metadata } from 'next';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import {
  homeOnesGridHero2 as bannerTwo2,
  homeOnesGridHero as bannerTwo,
  homeThreeHeroCarousel as bannerHeroCarousel,
  homeThreeHeroSlider as heroSlider, bannerBrand,
} from '@framework/static/banner';
import BannerGrid from "@components/common/banner-grid";
import FeatureCarousel from "@components/common/featured-carousel";
import BestSellerProductFeed from "@components/product/feeds/best-seller-product-feed";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import CategoryGridListBlock from "@components/common/category-grid-list-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import BannerGridTwo from "@components/common/banner-grid-two";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-feed";


export const metadata: Metadata = {
  title: 'Home3',
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
      <Container>
        <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(65%,_1fr)_1fr] 2xl:grid-cols-[minmax(68%,_1fr)_1fr]">
          <HeroSliderBlock
              lang={lang}
              heroBanner={heroSlider}
              showHeroContent={false}
              className={`lg:mb-7 mt-6`}
              contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[320px] xl:min-h-[360px] 2xl:min-h-[448px]"
          />
          <BannerGrid
              lang={lang}
              data={bannerHeroCarousel}
              grid={1}
              className="mb-7 mt-3 lg:mt-6 staticBanner--slider"
              girdClassName={"xl:gap-6"}
          />
        </div>
        <FeatureCarousel lang={lang}/>
        <BestSellerProductFeed lang={lang}/>
        <BannerGridTwo
            lang={lang}
            data={bannerTwo}
            className="mb-8 lg:mb-12"
            girdClassName="xl:gap-5 "
        />
        <ListingTabsElectronicFeed
            lang={lang}
            colSiderbar={false}
        />
        <BannerGridTwo
            lang={lang}
            data={bannerTwo2}
            className="mb-8 lg:mb-12"
            girdClassName="xl:gap-5 2xl:grid-cols-[minmax(1140px,_1fr)_1fr] "
        />
        <ListingTabsClothFeed
            lang={lang}
            colSiderbar={false}
        />
        <CategoryGridListBlock  lang={lang} className="mb-8 lg:mb-8" />
        <BannerAllCarousel
            lang={lang}
            data={bannerBrand}
            className="mb-8 lg:mb-10"
        />
      </Container>
    </>
  );
}
