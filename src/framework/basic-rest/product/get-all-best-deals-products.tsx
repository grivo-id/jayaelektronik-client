'use client';
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

type ResultBody = {
  success: boolean;
  message?: string;
  data: Product[];
  pagination: Pagination[];
};

export const fetchBestDealProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.BEST_DEALS}?${queryString}`;
  const { data } = await http.get(url);
  return data as ResultBody;
};

export const useBestDealProductsQuery = (options: any) => {
  return useQuery<ResultBody, Error>(
    [API_ENDPOINTS.BEST_DEALS, options],
    fetchBestDealProducts
  );
};
