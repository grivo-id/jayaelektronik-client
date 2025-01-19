import { QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type Category = {
  id: string | number;
  name: string;
  slug: string;
  children?: [Category];
};

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
  data: Category[];
  pagination: Pagination[];
};

export const fetchFlexCategoryById = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.CATEGORY_BYID}?${queryString}`;
  const { data } = await http.get(url);
  return data as ResultBody;
};
export const useFlexCategoryQuery = (options: any) => {
  return useQuery<ResultBody, Error>(
    [API_ENDPOINTS.CATEGORY_BYID, options],
    fetchFlexCategoryById
  );
};
