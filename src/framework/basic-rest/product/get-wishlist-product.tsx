import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

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

export const fetchWishlistProducts = async ({
  page,
  limit,
  sort,
}: any): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: sort,
  }).toString();

  const fullUrl = `${API_ENDPOINTS.WISHLISTS}?${queryParams}`;
  const { data } = await http.get<ApiResponse>(fullUrl);
  return data;
};

export const useWishlistProductsQuery = (options: {
  page: number;
  limit: number;
  sort: string;
}) => {
  return useQuery<ApiResponse, Error>({
    queryKey: [API_ENDPOINTS.WISHLISTS, options],
    queryFn: () => fetchWishlistProducts(options),
  });
};
