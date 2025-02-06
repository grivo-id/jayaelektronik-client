'use client';
import type { FC } from 'react';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import ProductsCarousel from '@components/product/products-carousel';
import { useFlexProductsNoPaginationQueries } from '@framework/product/get-flex-product-no-pagination';

interface ProductFeedProps {
  lang: string;
  className?: string;
  variant?: string;
}

const BestSellerProductFeed: FC<ProductFeedProps> = ({
  lang,
  className,
  variant,
}) => {
  const { data, isLoading, error } = useFlexProductsNoPaginationQueries({
    page: 1,
    limit: 25,
    sort: 'desc',
    product_is_new_arrival: false,
    product_is_bestseller: true,
  });

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
      sectionHeading="text-best-sellers-product"
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={10}
      uniqueKey="best-sellers"
      className="mb-8 lg:mb-12"
      borderCarousel={true}
      rowCarousel={2}
      carouselBreakpoint={breakpoints}
      variant={variant}
      lang={lang}
    />
  );
};
export default BestSellerProductFeed;
