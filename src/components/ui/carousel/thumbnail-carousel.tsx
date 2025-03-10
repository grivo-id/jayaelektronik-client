import {
  Swiper,
  SwiperSlide,
  SwiperOptions,
  Navigation,
  Thumbs,
} from '@components/ui/carousel/slider';
import Image from '@components/ui/image';
import { useRef, useState } from 'react';
import cn from 'classnames';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { getDirection } from '@utils/get-direction';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ImageLightBox from '@components/ui/image-lightbox';

interface Props {
  gallery: any[];
  thumbnailClassName?: string;
  galleryClassName?: string;
  lang: string;
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  1280: {
    slidesPerView: 4,
    direction: 'vertical',
  },
  767: {
    slidesPerView: 4,
    direction: 'horizontal',
  },
  0: {
    slidesPerView: 3,
    direction: 'horizontal',
  },
};

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
};

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = 'xl:w-[480px] 2xl:w-[650px]',
  galleryClassName = 'xl:w-[100px] 2xl:w-[120px]',
  lang,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const dir = getDirection(lang);

  return (
    <div className="w-full xl:flex xl:flex-row-reverse relative">
      <ImageLightBox gallery={gallery} />
      <div
        className={cn(
          'w-full xl:ltr:ml-5 xl:rtl:mr-5 mb-2.5 md:mb-3  overflow-hidden rounded-md relative',
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery && gallery.length > 0 ? (
            gallery.map((item: string, index: number) => (
              <SwiperSlide
                key={`product-gallery-${index}`}
                className="flex items-center justify-center"
              >
                <Image
                  src={item || productGalleryPlaceholder}
                  alt={`Product gallery ${index}`}
                  width={650}
                  height={590}
                  className="mx-auto rounded-lg"
                  priority
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="flex items-center justify-center">
              <Image
                src={productGalleryPlaceholder}
                alt="Default product gallery placeholder"
                width={650}
                height={590}
                className="mx-auto rounded-lg"
                priority
              />
            </SwiperSlide>
          )}
        </Swiper>
        <div className="flex items-center justify-between w-full absolute top-2/4 z-10 px-2.5">
          <div
            ref={prevRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
          <div
            ref={nextRef}
            className="flex items-center justify-center text-base transition duration-300 transform -translate-y-1/2 rounded-full cursor-pointer w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 lg:text-lg xl:text-xl bg-brand-light hover:bg-brand hover:text-brand-light focus:outline-none shadow-navigation"
          >
            {dir === 'rtl' ? <IoIosArrowBack /> : <IoIosArrowForward />}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          watchSlidesProgress={true}
          freeMode={true}
          effect={'slide'}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              direction: 'vertical',
            },
            767: {
              slidesPerView: 4,
              direction: 'horizontal',
            },
            0: {
              slidesPerView: 3,
              direction: 'horizontal',
            },
          }}
        >
          {gallery && gallery.length > 0 ? (
            gallery.map((item: string, index: number) => (
              <SwiperSlide
                key={`product-thumb-gallery-${index}`}
                className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
              >
                <Image
                  src={item || productGalleryPlaceholder}
                  alt={`Product thumb gallery ${index}`}
                  width={170}
                  height={170}
                  style={{ width: 'auto' }}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide
              key={`product-thumb-gallery-placeholder`}
              className="flex items-center justify-center cursor-pointer rounded overflow-hidden border border-border-base transition hover:opacity-75"
            >
              <Image
                src={productGalleryPlaceholder}
                alt="Default product gallery placeholder"
                width={170}
                height={170}
                style={{ width: 'auto' }}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbnailCarousel;
