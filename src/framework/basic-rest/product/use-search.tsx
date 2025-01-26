import { QueryOptionsType, Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type ApiResponse = {
  success: boolean;
  message: string;
  data: Product[];
};

export const fetchSearchedProducts = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;

  const encodedProductName = encodeURIComponent(_params.text);
  const url = `${API_ENDPOINTS.SEARCH}?product_name=${encodedProductName}`;
  const { data } = await http.get(url);
  return data as ApiResponse;
};

export const useSearchQuery = (options: any) => {
  return useQuery<ApiResponse, Error>(
    [API_ENDPOINTS.SEARCH, options],
    fetchSearchedProducts,
    {
      enabled: !!options.text,
    }
  );
  // return {
  //   data: [], // Replace with your actual data
  //   isLoading: false, // Replace with your actual loading state
  // };
};
