import Container from '@components/ui/container';
import { Metadata } from 'next';
import FeatureCarousel from '@components/common/featured-carousel';
import BannerGridTwo from '@components/common/banner-grid-two';
import HeroSliderBlock from '@components/hero/hero-slider-block';
import BannerAllCarousel from '@components/common/banner-all-carousel';
import CategoryGridListBlock from '@components/common/category-grid-list-block';
import BestSellerProductFeed from '@components/product/feeds/best-seller-top-product';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import SupperCategoryElectronicFeed from '@components/product/feeds/suppercategory-electronic-feed';
import SupperCategoryClothFeed from '@components/product/feeds/suppercategory-cloth-feed';
import {
  bannerBrand,
  homeOnesGridHero as bannerTwo,
  homeOnesGridHero2 as bannerTwo2,
  homeSixHeroSlider as heroSlider,
} from '@framework/static/banner';
import ProductWithBestDeals from '@components/product/product-with-best-deals';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS.',
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
        <BannerAllCarousel
          lang={lang}
          data={bannerBrand}
          className="mb-8 lg:mb-12"
        />
        {/* <ProductWithBestDeals lang={lang} /> */}
        <BestSellerProductFeed lang={lang} variant={`cardv2`} />
        <BannerGridTwo
          lang={lang}
          data={bannerTwo}
          className="mb-8 lg:mb-12"
          girdClassName="xl:gap-5 "
        />
        {/* <SupperCategoryElectronicFeed lang={lang} /> */}
        {/* <BannerGridTwo
          lang={lang}
          data={bannerTwo2}
          className="mb-8 lg:mb-12"
          girdClassName="xl:gap-5 2xl:grid-cols-[minmax(1138px,_1fr)_1fr] "
        /> */}
        {/* <SupperCategoryClothFeed lang={lang} /> */}
        {/* <CategoryGridListBlock lang={lang} className="mb-6 lg:mb-8" /> */}
      </Container>
    </>
  );
}
