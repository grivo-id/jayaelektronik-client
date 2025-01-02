import Container from '@components/ui/container';
import {
    homeFourHeroCarousel as bannerHeroCarousel,
    homeFourHeroSlider as heroSlider,
    homeFourGridHero as bannerGrid,
    homeFourGridHero2 as bannerGrid2, bannerBrand,
} from '@framework/static/banner';
import { Metadata } from 'next';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import FeatureCarousel from "@components/common/featured-carousel-four";
import CategoryGridBlock from "@components/common/category-grid-block";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import LatestblogCarousel from "@components/common/latestblog-four";
import NewProductFeed from "@components/product/feeds/new-product-feed";
import BestSellerProductFeed from "@components/product/feeds/best-seller-top-product";
import SuppercategoryPopular from "@components/product/feeds/suppercategory-popular";

export const metadata: Metadata = {
  title: 'Home 4',
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
      <Container className={'sm:max-w-[1730px]'}>
        <div className="grid gap-4 grid-cols-1 xl:gap-5 lg:grid-cols-[minmax(70%,_1fr)_1fr] 2xl:grid-cols-[minmax(73%,_1fr)_1fr]">
          <HeroSliderBlock
            lang={lang}
            heroBanner={heroSlider}
            showHeroContent={false}
            className={`lg:mb-7 mt-6`}
            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[310px] xl:min-h-[410px] 2xl:min-h-[450px]"
          />
          <BannerGrid
            lang={lang}
            data={bannerHeroCarousel}
            grid={1}
            className="mb-7 mt-0 lg:mt-6 staticBanner--slider"
            girdClassName={'xl:gap-5'}
          />
        </div>
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
        <CategoryGridBlock lang={lang} className="mb-8 lg:mb-12" />
        <SuppercategoryPopular lang={lang} className="mb-8 lg:mb-12" />
        <BestSellerProductFeed lang={lang} variant={'cardv2'} />

        <BannerGrid
          lang={lang}
          data={bannerGrid2}
          grid={3}
          className="mb-8 lg:mb-12"
        />
        <NewProductFeed lang={lang} className="mb-8 lg:mb-12" />
        <LatestblogCarousel lang={lang} className="mb-8 lg:mb-12" />
        <BannerAllCarousel
          lang={lang}
          data={bannerBrand}
          className="mb-8 lg:mb-10"
          layout={'home4'}
        />
      </Container>
    </>
  );
}
