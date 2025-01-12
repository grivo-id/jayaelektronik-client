import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface LoginInputType {
  user_email: string;
  user_password: string;
  remember_me: boolean;
}

async function login(input: LoginInputType) {
  const body = {
    user_email: input.user_email,
    user_password: input.user_password,
  };

  try {
    const response = await http.post(`${API_ENDPOINTS.LOGIN}`, body);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useLoginMutation = () => {
  const { authorize, closeModal } = useUI();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data, variables) => {
      sessionStorage.setItem('token', data.data.token);
      if (variables.remember_me) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
      authorize();
      // closeModal();
      return data.data;
    },
    onError: (error: any) => {
      console.error('Login error:', error.message);
    },
  });
};
