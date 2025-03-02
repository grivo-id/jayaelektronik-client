import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { api } from './api-config';
import { Blog } from '@framework/types';

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
  data: Blog;
};

export const getAxiosBlogDetailByTitle = async (blog_title: string) => {
  try {
    const response = await api.get(
      `${API_ENDPOINTS.BLOGDETAILS}?blog_title=${blog_title}`
    );

    return response.data as BlogsApiResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

type Queries = {
  sort: string;
  page: string | number;
  limit: string | number;
};

type AllBlogApiResponse = {
  success: boolean;
  message?: string;
  data: Blog[];
  pagination: Pagination;
};

export const getAxiosAllBlogPosts = async ({ page, limit, sort }: Queries) => {
  const queries = { page, limit, sort };
  try {
    const response = await api.get(`/blogs?${queries}`);
    return response.data as AllBlogApiResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
