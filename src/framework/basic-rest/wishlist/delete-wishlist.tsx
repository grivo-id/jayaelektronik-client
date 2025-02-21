import { useMutation, useQueryClient } from 'react-query';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';

type DeleteWishlistDTO = {
  product_id: string;
};

const deleteWishlist = async (data: DeleteWishlistDTO) => {
  const { data: response } = await http.delete(
    `${API_ENDPOINTS.WISHLISTS}/${data.product_id}`
  );
  return response;
};

export function useDeleteWishlist() {
  const queryClient = useQueryClient();

  return useMutation(deleteWishlist, {
    onSuccess: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.WISHLISTS);
    },
  });
}
