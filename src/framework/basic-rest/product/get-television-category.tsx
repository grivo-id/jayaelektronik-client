import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useQuery } from 'react-query';

type Category = {
    id: string | number;
    name: string;
    slug: string;
    children?: [Category];
  };
  

export const fetchTelevisionCategory = async ({ queryKey }: any) => {
  const [_key, _params] = queryKey;
  const { data } = await http.get(API_ENDPOINTS.ELECTRONIC_CATEGORY);
  return data as Category[];
};
export const useElectronicCategoryQuery = (options: any) => {
  return useQuery<Category[], Error>(
    [API_ENDPOINTS.ELECTRONIC_CATEGORY, options],
    fetchTelevisionCategory
  );
};
