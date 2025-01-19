'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useLoginMutation, LoginInputType } from '@framework/auth/use-login';
import Logo from '@components/ui/logo';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import { FaFacebook, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import cn from 'classnames';
import Link from 'next/link';
import { ROUTES } from '@utils/routes';
import { toast } from 'react-toastify';
import ErrorIcon from '@components/icons/error-icon';
import { useRouter } from 'next/navigation';

interface LoginFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  lang,
  isPopup = true,
  className,
}) => {
  const router = useRouter();
  const { t } = useTranslation(lang);
  const { width } = useWindowSize();
  const { closeModal, openModal } = useModalAction();
  const { mutateAsync: login, isLoading } = useLoginMutation();
  const [remember, setRemember] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  async function onSubmit({ user_email, user_password }: LoginInputType) {
    try {
      const response = await login({
        user_email,
        user_password,
      });
      if (response.success) {
        toast('Login successful!', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push(`/${lang}`);
        }, 1000);
      }
      // closeModal();
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
  // function handelSocialLogin() {
  //   login({
  //     user_email: 'demo@demo.com',
  //     user_password: 'demo',
  //     remember_me: true,
  //   });
  //   closeModal();
  // }
  // function handleSignUp() {
  //   return openModal('SIGN_UP_VIEW');
  // }
  function handleForgetPassword() {
    return openModal('FORGET_PASSWORD');
  }
  return (
    <div
      className={cn(
        'w-full md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image src="/assets/images/login.jpg" alt="signin" fill />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md flex flex-col justify-center">
          <div className="mb-10 text-center">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-welcome-back')}
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-3.5">
              <Input
                label={t('forms:label-email') as string}
                type="email"
                variant="solid"
                {...register('user_email', {
                  required: `${t('forms:email-required')}`,
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t('forms:email-error'),
                  },
                })}
                error={errors.user_email?.message}
                lang={lang}
              />
              <PasswordInput
                label={t('forms:label-password') as string}
                error={errors.user_password?.message}
                {...register('user_password', {
                  required: `${t('forms:password-required')}`,
                })}
                lang={lang}
              />
              <div className="flex items-center justify-center">
                {/* <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>
                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div> */}
                <div className="flex ltr:ml-auto rtl:mr-auto mt-[3px]">
                  <button
                    type="button"
                    onClick={handleForgetPassword}
                    className="text-sm text-skin-primary ltr:text-right rtl:text-left text-heading ltr:pl-3 lg:rtl:pr-3 hover:no-underline hover:text-skin-purple focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-forgot-password')}
                  </button>
                </div>
              </div>
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-sign-in')}
                </Button>
              </div>
            </div>
          </form>
          <div className="mt-5 mb-5 text-sm text-center sm:text-15px text-body">
            {t('common:text-don’t-have-account')}
            <Link href={`/${lang}${ROUTES.SIGN_UP}`}>
              <button
                type="button"
                className="text-sm text-brand sm:text-15px ltr:ml-1 rtl:mr-1 hover:no-underline focus:outline-none"
              >
                {t('common:text-create-account')}
              </button>
            </Link>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto w-full" onClick={closeModal}>
            <p className="text-sm text-center">
              {t('common:text-privacy-and-policy-description-login')}
              <Link
                href={`/${lang}${ROUTES.PRIVACY}`}
                className="text-skin-purple underline text-heading ltr:pl-1 lg:rtl:pr-1 hover:no-underline hover:text-skin-primary focus:outline-none focus:text-brand-dark"
              >
                {t('common:text-privacy-and-policy')}
              </Link>
            </p>
          </div>
          {/* <div className="relative flex flex-col items-center justify-center text-sm">
            <span className="mt-6 text-sm text-brand-dark opacity-70">
              {t('common:text-or')}
            </span>
          </div>

          <div className="flex justify-center mt-5 space-x-2.5">
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaFacebook className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand " />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaTwitter className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
            <button
              className="flex items-center justify-center w-10 h-10 transition-all border rounded-full cursor-pointer group border-border-one hover:border-brand focus:border-brand focus:outline-none"
              onClick={handelSocialLogin}
            >
              <FaLinkedinIn className="w-4 h-4 text-opacity-50 transition-all text-brand-dark group-hover:text-brand" />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
