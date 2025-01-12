import { BlogCategoriesQueryOptionsType, BlogCategory, Category } from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

export const fetchBlogCategories = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.BLOGCATEGORIES);
  return { blogCategories: { data: data as BlogCategory[] } };
};

export const useBlogCategoriesQuery = (options: BlogCategoriesQueryOptionsType) => {
  return useQuery<{ blogCategories: { data: BlogCategory[] } }, Error>(
    [API_ENDPOINTS.BLOGCATEGORIES, options],
    fetchBlogCategories
  );
};
