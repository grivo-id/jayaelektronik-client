import { Product } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { api } from './api-config';

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
