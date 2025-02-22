// import { QueryOptionsType, Blog } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import {  useQuery } from 'react-query';

interface BlogKeyword {
  blog_keyword_id: string;
  blog_keyword_name: string;
}

interface Blog {
  blog_id: string;
  user_id: string;
  blog_category_id: string;
  blog_banner_image: string;
  blog_title: string;
  blog_desc: string;
  blog_created_date: string;
  user_name: string;
  blog_category_name: string;
  blog_keywords: BlogKeyword[];
}

type Pagination = {
  totalData: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type BlogsApiResponse = {
  success: boolean;
  message?: string;
  data: Blog[];
  pagination: Pagination;
}

const fetchBlogs = async ({
  page,
  limit,
  sort,
}: any): Promise<BlogsApiResponse> => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    sort: sort,
  }).toString();
  const fullUrl = `${API_ENDPOINTS.BLOGS}?${queryParams}`;
  const { data } = await http.get<BlogsApiResponse>(fullUrl);
  return data;
};

const useBlogsQuery = (options: {
  page: number;
  limit: number;
  sort: string;
}) => {
  return useQuery<BlogsApiResponse, Error>({
    queryKey: [API_ENDPOINTS.BLOGS, options],
    queryFn: () => fetchBlogs(options),
  });
};

export {
  useBlogsQuery,
  fetchBlogs,
  type Blog,
  type BlogKeyword,
  type Pagination,
  type BlogsApiResponse,
};
