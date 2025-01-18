import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type Brand = {
  brand_id: string | number;
  brand_name: string;
  brand_image: string;
  brand_is_show: true;
  brand_created_date: Date | string;
};

export const fetchBrands = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.BRANDS}?${queryString}`;
  const { data } = await http.get(url);
  return data as Brand[];
};
export const useBrandsQuery = (options: any) => {
  return useQuery<Brand[], Error>(
    [API_ENDPOINTS.BRANDS, options],
    fetchBrands
  );
};
