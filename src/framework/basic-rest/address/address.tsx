import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

const fetchAddress = async () => {
  const { data } = await http.get(API_ENDPOINTS.SHIPPING_ADDRESS);
  return {
    data: data.data,
  };
};

const useAddressQuery = () => {
  return useQuery([API_ENDPOINTS.SHIPPING_ADDRESS], fetchAddress);
};

export { useAddressQuery, fetchAddress };
