import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation, useQueryClient } from 'react-query';

type FormData = {
  user_fname: string;
  user_lname: string;
  user_phone: number | string;
  user_address: string;
};

export type UpdateUserType = FormData; 

async function updateUser(formData: UpdateUserType) {
  const { data: response } = await http.patch(
    API_ENDPOINTS.UPDATE_PROFILE,
    formData
  );
  return response;
}
export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.USER_PROFILE);
    },
  });
};
