'use client';
import type { FC } from 'react';
import { useFlexProductsNoPaginationQueries } from '@framework/product/get-flex-product-no-pagination';
import ProductsCarousel from '@components/product/products-carousel';

interface ProductFeedProps {
  lang: string;
  className?: string;
  variant?: string;
}

const NewArrivalProductFeed: FC<ProductFeedProps> = ({
  lang,
  className,
  variant,
}) => {
  const query = {
    page: 1,
    limit: 25,
    sort: 'desc',
    product_is_new_arrival: true,
    product_is_bestseller: false,
    product_is_show: true,
  };

  const { data, isLoading, error } = useFlexProductsNoPaginationQueries(query);

  const products = data?.data || [];

  const breakpoints = {
    '1536': {
      slidesPerView: 6,
    },
    '1280': {
      slidesPerView: 5,
    },
    '1024': {
      slidesPerView: 4,
    },
    '640': {
      slidesPerView: 3,
    },
    '360': {
      slidesPerView: 2,
    },
    '0': {
      slidesPerView: 1,
    },
  };

  return (
    <ProductsCarousel
      sectionHeading="text-new-arrivals-product"
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={10}
      uniqueKey="new-arrival"
      className="mb-8 lg:mb-12"
      borderCarousel={true}
      rowCarousel={2}
      carouselBreakpoint={breakpoints}
      variant={variant}
      lang={lang}
    />
  );
};
export default NewArrivalProductFeed;
