import FeatureGrid from '@components/common/featured-grid';
import Container from '@components/ui/container';
import FeatureCarousel from "@components/common/featured-carousel";
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import Latestblog from '@components/common/latestblog';
import NewSidebarProductFeed from "@components/product/feeds/new-sidebar-product-feed";
import Testimonial from '@components/common/testimonial';
import BestSellerSidebarProductFeed from '@components/product/feeds/best-seller-sidebar-product-feed';
import BannerAllCarousel from "@components/common/banner-all-carousel";
import BannerGridTwo from '@components/common/banner-grid-two';
import {
  homeTwoGridHero2 ,
  homeTwoGridHero ,
  homeTwoHeroCarousel as bannerHeroCarousel,
  homeTwoHeroSlider as heroBanner,
  homeTwoSidebar as heroSidebar, bannerBrand,
} from '@framework/static/banner';
import { Metadata } from 'next';
import CategoryGridListBlock from "@components/common/category-grid-list-block";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-feed";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-feed";
import ProductWithBestDeals from "@components/product/product-with-best-deals";

export const metadata: Metadata = {
  title: 'Home2',
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
        <div
          className={` grid gap-4 grid-cols-1 xl:gap-6 lg:grid-cols-[minmax(72%,_1fr)_1fr] xl:grid-cols-[minmax(71%,_1fr)_1fr] 2xl:ps-[20rem]`}
        >
          <HeroSliderBlock
            lang={lang}
            heroBanner={heroBanner}
            showHeroContent={false}
            className={`lg:mb-7 mt-6`}
            contentClassName="p-5 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[380px]  xl:min-h-[510px] 2xl:min-h-[560px]"
          />
          <BannerGrid
            lang={lang}
            data={bannerHeroCarousel}
            grid={1}
            className="mb-7 mt-3 lg:mt-6 staticBanner--slider"
          />
        </div>
        <FeatureCarousel lang={lang} />
      </Container>
      <Container>
        <div className="grid grid-cols-12 gap-4 xl:gap-8">
          <div className="maincontent-left col-span-12 lg:col-span-3 2xl:col-span-2">
            <BannerGrid
              lang={lang}
              data={heroSidebar}
              grid={1}
              className="relative mb-8"
            />
            <BestSellerSidebarProductFeed lang={lang} />
            <Latestblog lang={lang}  />
            <NewSidebarProductFeed lang={lang}/>
            <Testimonial lang={lang}/>
          </div>
          <div className="maincontent-right col-span-12  lg:col-span-9 2xl:col-span-10">
            <ProductWithBestDeals lang={lang} />
            <ListingTabsElectronicFeed lang={lang}/>
            <BannerGridTwo
                lang={lang}
                data={homeTwoGridHero}
                className="mb-8 lg:mb-12"
                girdClassName="xl:gap-6 "
            />
            <ListingTabsClothFeed lang={lang}/>
            <BannerGridTwo
                lang={lang}
                data={homeTwoGridHero2}
                className="mb-8 lg:mb-12"
                girdClassName="xl:gap-6 xl:grid-cols-[minmax(654px,_1fr)_1fr] 2xl:grid-cols-[minmax(935px,_1fr)_1fr] "
            />
            <CategoryGridListBlock  lang={lang} className="mb-6 lg:mb-8" />
            <BannerAllCarousel
                lang={lang}
                data={bannerBrand}
                className="mb-8 lg:mb-12"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
