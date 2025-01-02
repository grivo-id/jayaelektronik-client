import Container from '@components/ui/container';
import {
    homeFiveHeroSlider as heroSlider,
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

export const metadata: Metadata = {
  title: 'Home 5',
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

        <Container className={"sm:max-w-[1730px]"}>
            <HeroSliderBlock
                lang={lang}
                heroBanner={heroSlider}
                showHeroContent={false}
                className={`mb-7 mt-6 2xl:ms-80`}
                contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 md:min-h-[250px] xl:min-h-[280px] 2xl:min-h-[438px]"
            />
            <FeatureCarousel
                lang={lang}
                className={"home4-featuredCarousel"}
                classNameCarousel={"bg-white"}
            />
            <BannerGrid
                lang={lang}
                data={bannerGrid}
                grid={3}
                className="mb-8 lg:mb-12"
            />
            <SuppercategoryPopular lang={lang} className="mb-8 lg:mb-12" rowCarousel={2} showBanner={true}/>

            <BannerGrid
                lang={lang}
                data={bannerGrid2}
                grid={3}
                className="mb-8 lg:mb-12"
            />
            <ListingTabsElectronicFeed lang={lang}/>
            <ListingTabsClothFeed lang={lang}/>
            <LatestblogCarousel lang={lang} className="mb-8 lg:mb-12"/>
            <BannerAllCarousel
                lang={lang}
                data={bannerBrand}
                className="mb-8 lg:mb-10"
                layout={"home4"}
            />
      </Container>

    </>
  );
}
