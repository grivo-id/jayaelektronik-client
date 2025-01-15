import { useUI } from '@contexts/ui.context';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';

export interface LoginInputType {
  email: string;
  password: string;
  remember_me: boolean;
}
async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}
export const useLogoutMutation = (lang: string) => {
  const { unauthorize, setUser } = useUI();
  const router = useRouter();
  return useMutation(() => logout(), {
    onSuccess: (_data) => {
      sessionStorage.removeItem('token');
      setUser(null);
      unauthorize();
      router.push(`/${lang}`);
    },
    onError: (data) => {
      console.log(data, 'logout error response');
    },
  });
};
