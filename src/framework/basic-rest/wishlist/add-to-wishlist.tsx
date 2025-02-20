import { useMutation, useQueryClient } from 'react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

type CreateWishlistDTO = {
  product_id: string;
};

const createWishlist = async (data: CreateWishlistDTO) => {
  const { data: response } = await http.post(API_ENDPOINTS.WISHLISTS, data);
  return response;
};

export function useCreateWishlist() {
  const queryClient = useQueryClient();

  return useMutation(createWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.WISHLISTS);
    },
  });
}
