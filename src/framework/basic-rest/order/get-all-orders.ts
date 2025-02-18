import { QueryOptionsType, Order } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useInfiniteQuery, useQuery } from 'react-query';

type ApiResponse = {
  success: boolean;
  message: string;
  data: Order[];
  pagination: {
    totalData: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type PaginatedOrder = {
  data: Order[];
  paginatorInfo: {
    nextPageUrl: number | string | null;
    hasNextPage: boolean;
  };
};

const fetchOrders = async ({ page, limit, sort }: any): Promise<ApiResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: sort,
  }).toString();
  
  const fullUrl = `${API_ENDPOINTS.ORDERS}?${queryParams}`;
  const { data } = await http.get<ApiResponse>(fullUrl);
  return data;
};

const useOrdersQuery = (options: { page: number; limit: number; sort: string }) => {
  return useQuery<ApiResponse, Error>({
    queryKey: [API_ENDPOINTS.ORDERS, options],
    queryFn: () => fetchOrders(options),
  });
};


// const fetchOrders = async ({
//   queryKey,
//   pageParam = 1,
// }: any): Promise<PaginatedOrder> => {
//   const [_key, _params] = queryKey;

//   const queryParams = new URLSearchParams({
//     page: pageParam,
//     limit: _params.limit,
//     sort: _params.sort,
//   }).toString();
//   const fullUrl = `${API_ENDPOINTS.ORDERS}?${queryParams}`;
//   const { data } = await http.get<ApiResponse>(fullUrl);

//   return {
//     data: data.data as Order[],
//     paginatorInfo: {
//       nextPageUrl: data.pagination.hasNextPage
//         ? data.pagination.currentPage + 1
//         : null,
//       hasNextPage: data.pagination.hasNextPage,
//     },
//   };
// };

// const useOrdersQuery = (options: any) => {
//   return useInfiniteQuery<PaginatedOrder, Error>(
//     [API_ENDPOINTS.ORDERS, options],
//     fetchOrders,
//     {
//       getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPageUrl,
//     }
//   );
// };

export { useOrdersQuery, fetchOrders };
