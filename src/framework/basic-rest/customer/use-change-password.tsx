import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

type FormData = {
  newPassword: string;
  oldPassword: string;
};

export type ChangePasswordType = FormData;

async function changePassword(formData: ChangePasswordType) {
  const translateFormData = {
    old_password: formData.oldPassword,
    new_password: formData.newPassword,
  };
  const { data: response } = await http.put(
    API_ENDPOINTS.CHANGE_PASW,
    translateFormData
  );
  return response;
}
export const useChangePasswordMutation = () => {
  return useMutation(changePassword, {
    onSuccess: () => {},
  });
};
