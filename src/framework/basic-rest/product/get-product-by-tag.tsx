'use client';
import { Product, QueryOptionsType } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type ResultBody = {
  success: boolean;
  message?: string;
  data: Product[];
};

export const fetchProductBasedOnTags = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const url = `${API_ENDPOINTS.PRODUCT_BYTAG}`;

  const requestBody = {
    product_tag_names: _params.tags ? _params.tags : [],
  };
  console.log('Full URL:', url);
  console.log('Request Body:', requestBody);
  const { data } = await http.post(url, requestBody);
  return data as ResultBody;
};

export const useProductTagsQuery = (options: any) => {
  return useQuery<ResultBody, Error>(
    [API_ENDPOINTS.PRODUCT_BYTAG, options],
    fetchProductBasedOnTags
  );
};
