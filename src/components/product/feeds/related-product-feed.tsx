'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { useRelatedProductsQuery } from '@framework/product/get-related-product';
import { LIMITS } from '@framework/utils/limits';

interface RelatedProductsProps {
  lang: string;
  carouselBreakpoint?: {} | any;
  className?: string;
  uniqueKey?: string;
}

const RelatedProductFeed: React.FC<RelatedProductsProps> = ({
  lang,
  carouselBreakpoint,
  className,
  uniqueKey = 'related-product-popup',
}) => {
  const { data, isLoading, error } = useBestSellerProductsQuery({
    page: 1,
    limit: 10,
    sort: 'desc',
  });

  // const { data, isLoading, error } = useRelatedProductsQuery({
  //   limit: LIMITS.RELATED_PRODUCTS_LIMITS,
  // });

  const products = data?.data || [];

  return (
    <ProductsCarousel
      sectionHeading="text-related-products"
      categorySlug="/search"
      className={className}
      products={products}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.RELATED_PRODUCTS_LIMITS}
      uniqueKey={uniqueKey}
      carouselBreakpoint={carouselBreakpoint}
      lang={lang}
    />
  );
};

export default RelatedProductFeed;
