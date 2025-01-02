import Container from '@components/ui/container';
import {
    homeSevenHeroSlider as heroSlider,
    homeFourGridHero as bannerGrid,
    homeFourGridHero2 as bannerGrid2, bannerBrand,
    homeSevenHeroCarousel as bannerHeroCarousel,
} from '@framework/static/banner';
import { Metadata } from 'next';
import HeroSliderBlock from "@components/hero/hero-slider-block";
import BannerGrid from "@components/common/banner-grid";
import FeatureCarousel from "@components/common/featured-carousel-four";
import BannerAllCarousel from "@components/common/banner-all-carousel";
import LatestblogCarousel from "@components/common/latestblog-four";
import ListingTabsElectronicFeed from "@components/product/feeds/listingtabs-electronic-v2";
import ListingTabsPhonesFeed from "@components/product/feeds/listingtabs-phones-v2";
import ListingTabsComputerFeed from "@components/product/feeds/listingtabs-computer-v2";
import ListingTabsClothFeed from "@components/product/feeds/listingtabs-cloth-v2";

export const metadata: Metadata = {
  title: 'Home 7',
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
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <HeroSliderBlock
            lang={lang}
            heroBanner={heroSlider}
            showHeroContent={false}
            className={`lg:mb-7 mt-6 border border-black/10 border-r-0 rounded-l overflow-hidden `}
            contentClassName="p-7 sm:pb-24 xl:pb-32 sm:pt-16 xl:pt-24 min-h-[180px] md:min-h-[300px] xl:min-h-[342px] 2xl:min-h-[421px]"
          />
          <BannerGrid
            lang={lang}
            data={bannerHeroCarousel}
            grid={2}
            className="mb-7 mt-6 md:mt-6 staticBanner--slider"
            girdClassName={'gap-px xl:gap-px border border-black/5 bg-black/5'}
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
        <ListingTabsPhonesFeed lang={lang} showBanner={'left'} />
        <ListingTabsComputerFeed lang={lang} showBanner={'right'} />

        <BannerGrid
          lang={lang}
          data={bannerGrid2}
          grid={3}
          className="mb-8 lg:mb-12"
        />

        <ListingTabsElectronicFeed lang={lang} showBanner={'left'} />
        <ListingTabsClothFeed lang={lang} showBanner={'right'} />
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
