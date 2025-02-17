import { Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from 'react-query';

type ApiResponse = {
  success: boolean;
  message: string;
  data: Product[];
  pagination: {
    totalData: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: {
    nextPageUrl: number | string | null;
    hasNextPage: boolean;
  };
};

const fetchFlexProducts = async ({
  queryKey,
  pageParam = 1,
}: any): Promise<PaginatedProduct> => {
  const [_key, _params] = queryKey;

  const queryParams = new URLSearchParams({
    page: pageParam,
    limit: _params.limit,
    sort: _params.sort,
    product_is_show: _params.product_is_show,
    ...(_params.priceSort ? { priceSort: _params.priceSort } : {}),
    ...(_params.product_is_new_arrival
      ? { product_is_new_arrival: _params.product_is_new_arrival }
      : {}),
    ...(_params.product_is_bestseller
      ? { product_is_bestseller: _params.product_is_bestseller }
      : {}),
  }).toString();

  const fullUrl = `${API_ENDPOINTS.FLEX_PRODUCTS}?${queryParams}`;

  const requestBody = {
    brand_slugs: _params.brand
      ? _params.brand.split(',').map((brand: string) => brand.toLowerCase())
      : [],
    sub_category_slugs: _params.category ? _params.category.split(',') : [],
  };

  // console.log('Full URL:', fullUrl);
  // console.log('Request Body:', requestBody);

  const { data } = await http.post<ApiResponse>(fullUrl, requestBody);

  return {
    data: data.data as Product[],
    paginatorInfo: {
      nextPageUrl: data.pagination.hasNextPage
        ? data.pagination.currentPage + 1
        : null,
      hasNextPage: data.pagination.hasNextPage,
    },
  };
};

const useFlexProductsQuery = (options: any) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.FLEX_PRODUCTS, options],
    fetchFlexProducts,
    {
      getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPageUrl,
    }
  );
};

export { useFlexProductsQuery, fetchFlexProducts };
