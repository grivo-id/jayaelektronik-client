'use client';

import ProductsCarousel from '@components/product/products-carousel';
import { useUI } from '@contexts/ui.context';
import { useBestSellerProductsQuery } from '@framework/product/get-all-best-seller-products';
import { useProductTagsQuery } from '@framework/product/get-product-by-tag';
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
  const { product_tags } = useUI();
  const productTagNames =
    product_tags?.map((tag: any) => tag.product_tag_name) || [];
  const { data, isLoading, error } = useProductTagsQuery({
    tags: productTagNames,
  });

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
