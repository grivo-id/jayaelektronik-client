import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface AddressInputType {
  shipping_address_title: string;
  shipping_address_desc: string;
}

async function AddShippingAddress(input: AddressInputType) {
  try {
    const response = await http.post(
      `${API_ENDPOINTS.SHIPPING_ADDRESS}`,
      input
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useAddShippingMutation = () => {
  return useMutation((input: AddressInputType) => AddShippingAddress(input), {
    onSuccess: (data, variables) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('Create shipping address error:', error.message);
    },
  });
};
