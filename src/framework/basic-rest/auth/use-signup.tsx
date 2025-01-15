import { useUI } from '@contexts/ui.context';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useMutation } from 'react-query';

export interface SignUpInputType {
  user_fname: string;
  user_lname: string;
  user_email: string;
  user_phone: string;
  user_address: string;
  user_password: string;
  user_confirm_password: string;
}

export interface SendEmailVerificationType {
  user_email: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendEmailVerification(input: SendEmailVerificationType) {
  try {
    const response = await http.post(`${API_ENDPOINTS.SEND_VERIFICATION}`, {
      user_email: input,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

async function signUp(input: SignUpInputType) {
  const body = {
    user_fname: input.user_fname,
    user_lname: input.user_lname,
    user_email: input.user_email,
    user_phone: input.user_phone,
    user_address: input.user_address,
    user_password: input.user_password,
  };

  try {
    const response = await http.post(`${API_ENDPOINTS.REGISTER}`, body);
    if (response.status === 201) {
      await sendEmailVerification(response.data.data.user_email);
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || 'Something went wrong');
  }
}

export const useSignUpMutation = () => {
  const { setUser, authorize } = useUI();
  return useMutation((input: SignUpInputType) => signUp(input), {
    onSuccess: async (data) => {
      await setUser(data.data);
      authorize();
      return data.data;
    },
    onError: (error: any) => {
      console.error('Register error:', error.message);
    },
  });
};
