'use client';
import React from 'react';
import { useBestDealProductsQuery } from '@framework/product/get-all-best-deals-products';
import SectionHeader from '@components/common/section-header';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import ProductFlashSellCard from '@components/product/product-cards/product-flash-sell-card';
import Carousel from '@components/ui/carousel/carousel';
import { SwiperSlide } from '@components/ui/carousel/slider';
import { useFlexProductsNoPaginationQueries } from '@framework/product/get-flex-product-no-pagination';

interface ProductFeedProps {
  lang?: string;
  className?: string;
  uniqueKey?: string;
}

const breakpoints = {
  '1280': {
    slidesPerView: 2,
  },
  '1024': {
    slidesPerView: 1,
  },
  '640': {
    slidesPerView: 1,
  },
  '0': {
    slidesPerView: 1,
  },
};

const ProductWithBestDeals: React.FC<ProductFeedProps> = ({
  lang = 'ina',
  className = '',
  uniqueKey,
}) => {
  const limit = 10;
  const { data, isLoading, error } = useFlexProductsNoPaginationQueries({
    page: 1,
    limit: limit,
    sort: 'desc',
    product_is_show: true,
    product_is_bestdeal: true,
  });
  const now = new Date();
  const validProducts = (data?.data || []).filter((product) => {
    if (!product.product_promo) return false;
    const createdDate = new Date(
      product.product_promo.product_promo_created_date
    );
    const expiredDate = new Date(
      product.product_promo.product_promo_expired_date
    );
    return now >= createdDate && now < expiredDate;
  });

  // console.log(validProducts);

  return (
    <div className={`mb-8 ${className}`}>
      {!isLoading && validProducts.length > 0 && (
        <SectionHeader
          lang={lang}
          sectionHeading="text-deals-of-the-week"
          className="mb-6 block-title"
        />
      )}

      {error ? (
        <Alert message={error?.message} className="col-span-full" />
      ) : (
        <div className="heightFull relative">
          <Carousel
            lang={lang}
            breakpoints={breakpoints}
            className=""
            prevButtonClassName="start-3  -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
            nextButtonClassName={`end-3  -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 xl:-translate-x-2.5`}
          >
            {isLoading && !validProducts ? (
              Array.from({ length: limit! }).map((_, idx) => (
                <ProductCardLoader
                  uniqueKey={`${uniqueKey}-${idx}`}
                  key={`popular-product-${idx}`}
                />
              ))
            ) : (
              <>
                {validProducts?.slice(0, limit).map((product: any) => (
                  <SwiperSlide
                    key={`${uniqueKey}-${product.product_id}`}
                    className="py-1.5 "
                  >
                    <ProductFlashSellCard
                      lang={lang}
                      key={`popular-product-${product.product_id}`}
                      product={product}
                      date={Date.now() + 4000000 * 60}
                    />
                  </SwiperSlide>
                ))}
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductWithBestDeals;
