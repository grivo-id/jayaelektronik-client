import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export async function verifyEmail(input: string | null) {
  try {
    const response = await http.post(`${API_ENDPOINTS.VERIFY_EMAIL}`, {
      token: input,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useVerifyEmailMutation = () => {
  return useMutation((input: string | null) => verifyEmail(input), {
    onSuccess: async (data) => {
      return data.data;
    },
    onError: (error: any) => {
      console.error('verify email error:', error.message);
    },
  });
};
