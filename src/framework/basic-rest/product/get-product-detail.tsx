import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type ResultBody = {
  success: boolean;
  message?: string;
  data: Product;
};

export const fetchProductDetailByProdId = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.PRODUCT_DETAIL}?${queryString}`;
  // console.log('url', url)
  const { data } = await http.get(url);
  return data as ResultBody;
};
export const useProductDetailQueryByProdId = (options: any) => {
  return useQuery<ResultBody, Error>(
    [API_ENDPOINTS.PRODUCT_DETAIL, options],
    fetchProductDetailByProdId
  );
};
