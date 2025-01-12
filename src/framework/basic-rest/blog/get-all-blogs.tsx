// import { QueryOptionsType, Blog } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery, useQuery } from 'react-query';

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

interface Pagination {
  totalData: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface BlogsApiResponse {
  success: boolean;
  message: string;
  data: Blog[];
  pagination: Pagination;
}

const fetchBlogs = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.BLOGS);
  return data;
};

const useBlogsQuery = (options: any) => {
  return useQuery<BlogsApiResponse, Error>(
    [API_ENDPOINTS.BLOGS, options],
    fetchBlogs
  );
};

export {
  useBlogsQuery,
  fetchBlogs,
  type Blog,
  type BlogKeyword,
  type Pagination,
  type BlogsApiResponse,
};

// const fetchBlogs = async ({ queryKey }: any) => {
//   const [_key, _params] = queryKey;
//   const { data } = await http.get(API_ENDPOINTS.BLOGS);
//   return { blogs: { data: data as Blog[] } };
// };

// const useBlogsQuery = (options: any) => {
//   return useQuery<{ blogs: { data: Blog[] } }, Error>(
//       [API_ENDPOINTS.BLOGS, options],
//       fetchBlogs
//   );
// };

// export { useBlogsQuery, fetchBlogs };
