import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface EditAddressInputType {
  id: string;
  shipping_address_title: string;
  shipping_address_desc: string;
}

async function EditShippingAddress(input: EditAddressInputType) {
  try {
    const response = await http.patch(
      `${API_ENDPOINTS.SHIPPING_ADDRESS}/${input.id}`,
      input
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useEditShippingMutation = () => {
  return useMutation(
    (input: EditAddressInputType) => EditShippingAddress(input),
    {
      onSuccess: (data, variables) => {
        return data.data;
      },
      onError: (error: any) => {
        console.error('Edit shipping address error:', error.message);
      },
    }
  );
};
