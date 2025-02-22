import {
  BlogCategoriesQueryOptionsType,
  BlogCategory,
  Category,
} from '@framework/types';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useInfiniteQuery, useQuery } from 'react-query';

type ApiResponse = {
  success: boolean;
  message: string;
  data: BlogCategory[];
  pagination: {
    totalData: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type PaginatedBlogCategory = {
  data: BlogCategory[];
  paginatorInfo: {
    nextPageUrl: number | string | null;
    hasNextPage: boolean;
  };
};

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const fetchBlogCategories = async ({
  queryKey,
  pageParam = 1,
}: any): Promise<PaginatedBlogCategory> => {
  const [_key, _params] = queryKey;

  const queryParams = new URLSearchParams({
    page: pageParam,
    limit: _params.limit,
    sort: _params.sort,
  }).toString();

  const fullUrl = `${API_ENDPOINTS.BLOGCATEGORIES}?${queryParams}`;

  const { data } = await http.get(fullUrl);

  const processedData = data.data.map((category: BlogCategory) => ({
    ...category,
    slug: convertToSlug(category.blog_category_name),
  }));

  return {
    data: processedData as BlogCategory[],
    paginatorInfo: {
      nextPageUrl: data.pagination.hasNextPage
        ? data.pagination.currentPage + 1
        : null,
      hasNextPage: data.pagination.hasNextPage,
    },
  };
};

export const useBlogCategoriesQuery = (options: any) => {
  return useInfiniteQuery<PaginatedBlogCategory, Error>(
    [API_ENDPOINTS.BLOGCATEGORIES, options],
    fetchBlogCategories,
    {
      getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPageUrl,
    }
  );
};
