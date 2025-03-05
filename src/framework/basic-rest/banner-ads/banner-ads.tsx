import { BannerPopup } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useQuery } from 'react-query';

type BannerApiResponse = {
  success: boolean;
  message?: string;
  data: BannerPopup[];
};

type Options = {};

const fetchBanners = async ({}): Promise<BannerApiResponse> => {
  const fullUrl = `${API_ENDPOINTS.BANNER_ADS}`;
  const { data } = await http.get<BannerApiResponse>(fullUrl);
  return data;
};

export const useBannersQuery = (options: {}) => {
  return useQuery<BannerApiResponse, Error>({
    queryKey: [API_ENDPOINTS.BANNER_ADS, options],
    queryFn: () => fetchBanners(options),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
