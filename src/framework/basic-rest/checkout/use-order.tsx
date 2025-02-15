import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface OrderInputType {
  coupon_code?: string;
  order_email: string;
  order_fname: string;
  order_lname: string;
  order_phone: string;
  order_address: string;
  order_user_verified: boolean;
  products: {
    product_id: string;
    product_qty: number;
  }[];
}

async function createOrder(input: OrderInputType) {
  try {
    const response = await http.post(`${API_ENDPOINTS.CREATE_ORDER}`, input);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useCreateOrderMutation = () => {
  return useMutation((input: OrderInputType) => createOrder(input), {
    onSuccess: (data, variables) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('Create order error:', error.message);
    },
  });
};
