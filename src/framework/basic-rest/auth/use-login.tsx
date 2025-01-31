import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface LoginInputType {
  user_email: string;
  user_password: string;
}

async function login(input: LoginInputType) {
  try {
    const response = await http.post(`${API_ENDPOINTS.LOGIN}`, input);
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useLoginMutation = () => {
  const { authorize, closeModal, setUser, user } = useUI();

  return useMutation((input: LoginInputType) => login(input), {
    onSuccess: (data, variables) => {
      const token = {
        value: data.data.token.value,
        expires_in: Date.now() + data.data.token.expires_in * 1000 - 3000,
      };

      sessionStorage.setItem('token', JSON.stringify(token));
      authorize();
      setUser(data.data.user);
      return data.data;
    },
    onError: (error: any) => {
      console.error('Login error:', error.message);
    },
  });
};
