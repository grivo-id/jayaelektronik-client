import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';
import http from '@framework/utils/http';

type Pagination = {
  totalData: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type Announcer = {
  toast_id: number | string;
  user_id: number | string;
  toast_title: string;
  toast_message: string;
  toast_expired_date: Date | string;
  toast_created_date: Date | string;
};

type ResultBody = {
  success: boolean;
  message?: string;
  data: Announcer[];
  pagination: Pagination[];
};

export const fetchAllAnouncers = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.ANNOUNCERS}?${queryString}`;

  const { data } = await http.get(url);
  return data as ResultBody;
};

export const useAllAnouncerQuery = (options: any) => {
  return useQuery<ResultBody, Error>(
    [API_ENDPOINTS.ANNOUNCERS, options],
    fetchAllAnouncers
  );
};
