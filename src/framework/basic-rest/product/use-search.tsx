import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type Pagination = {
  totalData: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data: Product[];
  pagination: Pagination;
};

const fetchSearchedProducts = async ({
  queryKey,
  pageParam = 1,
}: any): Promise<ApiResponse> => {
  const [_key, _params] = queryKey;

  const queryParams = new URLSearchParams({
    page: pageParam,
    limit: _params.limit,
    sort: _params.sort,
    product_is_show: _params.product_is_show,
    product_search: _params.product_search,
  }).toString();

  const fullUrl = `${API_ENDPOINTS.FLEX_PRODUCTS}?${queryParams}`;

  const requestBody = {};

  // console.log('Full URL:', fullUrl);
  // console.log('Request Body:', requestBody);

  const { data } = await http.post<ApiResponse>(fullUrl, requestBody);
  // console.log('triggered', data);

  return data;
};

export const useSearchQuery = (options: any, queryConfig: any = {}) => {
  return useQuery<ApiResponse, Error>(
    [API_ENDPOINTS.FLEX_PRODUCTS, options],
    fetchSearchedProducts,
    {
      ...queryConfig,
      enabled: queryConfig.enabled ?? false,
    }
  );
};
