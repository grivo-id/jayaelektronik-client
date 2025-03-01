import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import ProductCardAlpine from '@components/product/product-cards/product-card';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import ProductCardList from '@components/product/product-cards/product-list-view';
import { Product } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';
import { useFlexProductsQuery } from '@framework/product/get-flex-products';

interface ProductGridProps {
  lang: string;
  className?: string;
  viewAs: boolean;
}

interface SortTranslation {
  product_is_new_arrival?: string;
  product_is_bestseller?: string;
  priceSort?: string;
}

const translateNewQuerySortBy: Record<string, SortTranslation> = {
  'new-arrival': {
    product_is_new_arrival: 'true',
    product_is_bestseller: 'false',
    priceSort: 'asc',
  },
  'best-seller': {
    product_is_new_arrival: 'false',
    product_is_bestseller: 'true',
    priceSort: 'asc',
  },
  lowest: {
    priceSort: 'asc',
  },
  highest: {
    priceSort: 'desc',
  },
  '': {},
};

export const ProductGrid: FC<ProductGridProps> = ({
  className = '',
  lang,
  viewAs,
}) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const { getParams, query } = useQueryParam(pathname ?? '/');
  const newQuery: any = getParams(
    // @ts-ignore
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}${query}`
  );
  // console.log('new query', newQuery);
  const sortTranslation = translateNewQuerySortBy[newQuery.sort_by || ''] || {};
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useFlexProductsQuery({
    page: 1,
    limit: 25,
    sort: 'desc',
    product_is_show: true,
    category: newQuery.category,
    brand: newQuery.brand,
    ...sortTranslation,
  });

  // console.log(newQuery)
  // console.log(data);

  return (
    <>
      <div
        className={`${
          viewAs
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            : 'grid grid-cols-1 gap-8'
        } ${className}`}
      >
        {error ? (
          <div className="col-span-full">
            <Alert message={error?.message} />
          </div>
        ) : isLoading && !data?.pages?.length ? (
          Array.from({ length: 30 }).map((_, idx) => (
            <ProductCardLoader
              key={`product--key-${idx}`}
              uniqueKey={`product--key-${idx}`}
            />
          ))
        ) : (
          data?.pages?.map((page: any) => {
            if (viewAs) {
              return page?.data?.map((product: Product) => (
                <ProductCardAlpine
                  key={`product--key-${product.product_id}`}
                  product={product}
                  lang={lang}
                />
              ));
            } else {
              return page?.data?.map((product: Product) => (
                <ProductCardList
                  key={`product--key-${product.product_id}`}
                  product={product}
                  lang={lang}
                />
              ));
            }
          })
        )}
        {/* end of error state */}
      </div>
      {hasNextPage && (
        <div className="pt-8 text-center xl:pt-10">
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            className={'w-60 '}
          >
            {t('button-load-more')}
          </Button>
        </div>
      )}
    </>
  );
};
