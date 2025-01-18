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

type Brand = {
  brand_id: string | number;
  brand_name: string;
  brand_image: string;
  brand_is_show: true;
  brand_created_date: Date | string;
};

type ResultBody = {
  success: boolean;
  message?: string;
  data: Brand[];
  pagination: Pagination[];
};

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.BRANDS}?${queryString}`;
  const { data } = await http.get(url);
  return data as ResultBody;
};
export const useBrandsQuery = (options: any) => {
  return useQuery<ResultBody, Error>([API_ENDPOINTS.BRANDS, options], fetchBrands);
};
