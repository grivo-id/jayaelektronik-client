import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface ResetPasswordType {
  token: string;
  new_password: string;
}
async function resetPassword(input: ResetPasswordType) {
  try {
    const response = await http.post(`${API_ENDPOINTS.RESET_PASSWORD}`, {
      token: input.token,
      new_password: input.new_password,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}
export const useResetPasswordMutation = () => {
  return useMutation((input: ResetPasswordType) => resetPassword(input), {
    onSuccess: (data) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('Reset password error:', error.message);
    },
  });
};
