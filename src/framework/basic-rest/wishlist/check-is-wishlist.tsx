import { Product } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type ReturnMessage = {
  wishlist_id: string;
  user_id: string;
  product_id: string;
  wishlist_created_date: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
  data?: ReturnMessage[];
};

export const fetchIsProductOnWishlist = async ({
  product_id,
}: {
  product_id: string;
}): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams({
    product_id: product_id,
  }).toString();

  const fullUrl = `${API_ENDPOINTS.WISHLISTS}?${queryParams}`;
  const { data } = await http.get<ApiResponse>(fullUrl);
  return data;
};

export const useIsProductOnWishlistQuery = (options: {
  product_id: string;
}) => {
  return useQuery<ApiResponse, Error>({
    queryKey: [API_ENDPOINTS.WISHLISTS, options],
    queryFn: () => fetchIsProductOnWishlist(options),
  });
};
