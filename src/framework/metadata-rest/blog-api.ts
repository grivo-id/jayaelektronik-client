import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { api } from './api-config';
import { Blog } from '@framework/types';

interface BlogsApiResponse {
  success: boolean;
  message?: string;
  data: Blog;
}

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
