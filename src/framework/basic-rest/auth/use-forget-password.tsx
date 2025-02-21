import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface ForgetPasswordType {
  user_email: string;
}
async function forgetPassword(input: ForgetPasswordType) {
  try {
    const response = await http.post(`${API_ENDPOINTS.FORGET_PASSWORD}`, {
      user_email: input.user_email,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}
export const useForgetPasswordMutation = () => {
  return useMutation((input: ForgetPasswordType) => forgetPassword(input), {
    onSuccess: (data) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('Forget password error:', error.message);
    },
  });
};
