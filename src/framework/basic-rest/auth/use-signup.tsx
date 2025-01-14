import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import Cookies from 'js-cookie';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  user_fname: string;
  user_lname: string;
  user_email: string;
  user_address: string;
  user_password: string;
  user_confirm_password: string;
}
async function signUp(input: SignUpInputType) {
  const body = {
    user_fname: input.user_fname,
    user_lname: input.user_lname,
    user_email: input.user_email,
    user_address: input.user_address,
    user_password: input.user_password,
  };
  try {
    const response = await http.post(`${API_ENDPOINTS.REGISTER}`, body);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}
export const useSignUpMutation = () => {
  const { authorize, closeModal } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: (data) => {
      Cookies.set('auth_token', data.token);
      authorize();
      closeModal();
    },
    onError: (data) => {
      console.log(data, 'login error response');
    },
  });
};
