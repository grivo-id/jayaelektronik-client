'use client';

import ErrorIcon from '@components/icons/error-icon';
import Button from '@components/ui/button';
import PasswordInput from '@components/ui/form/password-input';
import { useUI } from '@contexts/ui.context';
import {
  ResetPasswordType,
  useResetPasswordMutation,
} from '@framework/auth/use-reset-password';
import {
  useVerifyEmailMutation,
  verifyEmail,
} from '@framework/auth/use-verify-email';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'src/app/i18n/client';

interface ResetPasswordProps {
  lang: string;
  className?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ lang, className }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useTranslation(lang);
  const resetToken = searchParams.get('token');
  const { width } = useWindowSize();
  const [isChanged, setIsChanged] = useState(false);
  const { mutateAsync: resetPassword, isLoading } = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      new_password: '',
      confirm_password: '',
    },
  });

  async function onSubmit({ new_password }: { new_password: string }) {
    try {
      const response = await resetPassword({
        token: resetToken!,
        new_password,
      });
      if (response.success) {
        toast('Password changed successful!', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          setIsChanged(true);
        }, 1000);
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <ErrorIcon />,
      });
    }
  }

  return (
    <div
      className={cn(
        `w-[300px] sm:w-[360px] py-8 px-6 relative shadow-xl sm:px-12 my-14 ${
          !isChanged ? 'min-h-[400px]' : 'min-h-[200px]'
        }`,
        className
      )}
    >
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full rounded-md flex flex-col justify-center gap-8">
          <div className="text-center">
            <p className="text-md font-bold text-brand-dark sm:text-lg sm:pt-3 tracking-wide">
              {!isChanged
                ? t('common:text-enter-new-password')
                : t('common:text-password-changed')}
            </p>
          </div>
          {!isChanged ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center"
              noValidate
            >
              <div className="flex flex-col space-y-4">
                <PasswordInput
                  label={t('forms:label-new-password')}
                  error={errors.new_password?.message}
                  {...register('new_password', {
                    required: `${t('forms:password-required')}`,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message: t('forms:password-error'),
                    },
                  })}
                  lang={lang}
                />
                <PasswordInput
                  label={t('forms:label-confirm-password')}
                  error={errors.confirm_password?.message}
                  {...register('confirm_password', {
                    required: `${t('forms:confirm-password-required')}`,
                    validate: (value) =>
                      value === watch('new_password') ||
                      (t('forms:passwords-not-match') as string),
                  })}
                  lang={lang}
                />
                <div className="relative">
                  <Button
                    type="submit"
                    loading={isLoading}
                    disabled={isLoading}
                    className="w-full mt-6 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                    variant="formButton"
                  >
                    {t('common:text-register')}
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col justify-center">
              <div className="flex justify-center mt-4">
                <Link href={`/${lang}${ROUTES.LOGIN}`}>
                  <Button
                    type="button"
                    className="mt-2 tracking-normal !h-10 !px-4"
                  >
                    {t('common:text-sign-in-now')}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
