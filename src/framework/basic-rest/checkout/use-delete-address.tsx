import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

async function DeleteShippingAddress(id: string) {
  try {
    const response = await http.delete(
      `${API_ENDPOINTS.SHIPPING_ADDRESS}/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useDeleteShippingMutation = () => {
  return useMutation((id: any) => DeleteShippingAddress(id), {
    onSuccess: (data, variables) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('Delete shipping address error:', error.message);
    },
  });
};
