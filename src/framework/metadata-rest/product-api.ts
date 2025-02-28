import { Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { api } from './api-config';

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
  data: Product;
};

export const getAxiosProductDetailById = async (product_id: string) => {
  try {
    const response = await api.get(
      `${API_ENDPOINTS.PRODUCT_DETAIL}?product_id=${product_id}`
    );

    return response.data as ResultBody;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type Queries = {
  sort: string;
  page: string | number;
  limit: string | number;
};

type AllProductResultBody = {
  success: boolean;
  message?: string;
  data: Product[];
  pagination: Pagination;
};

export const getAxiosAllProducts = async ({ page, limit, sort }: Queries) => {
  const queries = { sort, page, limit };
  try {
    const response = await api.get(`/products?${queries}`);
    console.log('respon', response.data);
    return response.data as AllProductResultBody;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
