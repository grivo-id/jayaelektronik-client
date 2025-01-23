import { QueryOptionsType } from '@framework/types';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery, useQuery } from 'react-query';

type BlogKeyword = {
  blog_keyword_id: string;
  blog_keyword_name: string;
};

type Blog = {
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
};



interface BlogsApiResponse {
  success: boolean;
  message?: string;
  data: Blog[];
}

const fetchBlogPost = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const queryString = new URLSearchParams(_params).toString();
  const url = `${API_ENDPOINTS.BLOGDETAILS}?${queryString}`;
  const { data } = await http.get(url);
  return data as BlogsApiResponse;
};

const useBlogPostQuery = (options: any) => {
  return useQuery<BlogsApiResponse, Error>(
    [API_ENDPOINTS.BLOGDETAILS, options],
    fetchBlogPost
  );
};

export { useBlogPostQuery, fetchBlogPost };
