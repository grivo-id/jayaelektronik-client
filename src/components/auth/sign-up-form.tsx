'use client';

import { useState } from 'react';
import Input from '@components/ui/form/input';
import PasswordInput from '@components/ui/form/password-input';
import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { useSignUpMutation, SignUpInputType } from '@framework/auth/use-signup';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { useModalAction } from '@components/common/modal/modal.context';
import Switch from '@components/ui/switch';
import CloseButton from '@components/ui/close-button';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import ErrorIcon from '@components/icons/error-icon';

interface SignUpFormProps {
  lang: string;
  isPopup?: boolean;
  className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  lang,
  isPopup = true,
  className,
}: SignUpFormProps) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { t } = useTranslation(lang);
  const { mutateAsync: signUp, isLoading } = useSignUpMutation();
  const { closeModal, openModal } = useModalAction();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpInputType>();

  const onSubmit = async ({
    user_fname,
    user_lname,
    user_email,
    user_phone,
    user_address,
    user_password,
    user_confirm_password,
  }: SignUpInputType) => {
    try {
      const response = await signUp({
        user_fname,
        user_lname,
        user_email,
        user_phone,
        user_address,
        user_password,
        user_confirm_password,
      });
      if (response.success) {
        toast('User registered successfully!', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          router.push(`/${lang}${ROUTES.SEND_VERIFICATION}`);
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
  };

  return (
    <div
      className={cn(
        'flex bg-brand-light mx-auto rounded-lg md:w-[720px] lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px]',
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex w-full mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="md:w-1/2 lg:w-[55%] xl:w-[60%] registration hidden md:block relative">
          <Image
            src="/assets/images/login.jpeg"
            alt="sign up"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 md:px-6 lg:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-10 pt-2.5">
            <h4 className="text-xl font-semibold text-brand-dark sm:text-2xl sm:pt-3 ">
              {t('common:text-sign-up-for-free')}
            </h4>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
            noValidate
          >
            <div className="flex flex-col space-y-4">
              <Input
                label={t('forms:label-first-name') as string}
                type="text"
                variant="solid"
                {...register('user_fname', {
                  required: 'forms:first-name-required',
                })}
                error={errors.user_fname?.message}
                lang={lang}
              />
              <Input
                label={t('forms:label-last-name') as string}
                type="text"
                variant="solid"
                {...register('user_lname', {
                  required: 'forms:last-name-required',
                })}
                error={errors.user_lname?.message}
                lang={lang}
              />
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
              <Input
                label={t('forms:label-phone') as string}
                type="text"
                variant="solid"
                {...register('user_phone', {
                  required: 'forms:phone-required',
                })}
                error={errors.user_phone?.message}
                lang={lang}
              />
              <Input
                label={t('forms:label-address') as string}
                type="text"
                variant="solid"
                {...register('user_address', {
                  required: 'forms:address-required',
                })}
                error={errors.user_address?.message}
                lang={lang}
              />
              <PasswordInput
                label={t('forms:label-password')}
                error={errors.user_password?.message}
                {...register('user_password', {
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
                error={errors.user_confirm_password?.message}
                {...register('user_confirm_password', {
                  required: `${t('forms:confirm-password-required')}`,
                  validate: (value) =>
                    value === watch('user_password') ||
                    (t('forms:passwords-not-match') as string),
                })}
                lang={lang}
              />
              <div className="relative">
                <Button
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                  className="w-full mt-2 tracking-normal h-11 md:h-12 font-15px md:font-15px"
                  variant="formButton"
                >
                  {t('common:text-register')}
                </Button>
              </div>
              <div className="mt-3 mb-6 text-sm text-center sm:text-base text-body">
                {t('common:text-already-registered')}
                <Link href={`/${lang}${ROUTES.LOGIN}`}>
                  <button
                    type="button"
                    className="text-sm ltr:ml-1 rtl:mr-1 sm:text-base text-brand hover:no-underline focus:outline-none"
                  >
                    {t('common:text-sign-in-now')}
                  </button>
                </Link>
              </div>
              <div
                className="ltr:ml-auto rtl:mr-auto w-full"
                onClick={closeModal}
              >
                <p className="text-sm text-center">
                  {t('common:text-privacy-and-policy-description-register')}
                  <Link
                    href={`/${lang}${ROUTES.PRIVACY}`}
                    className="text-skin-purple underline text-heading ltr:pl-1 lg:rtl:pr-1 hover:no-underline hover:text-brand-dark focus:outline-none focus:text-brand-dark"
                  >
                    {t('common:text-privacy-and-policy')}
                  </Link>
                </p>
              </div>
              {/* <div className="flex items-center justify-center">
                <div className="flex items-center shrink-0">
                  <label className="relative inline-block cursor-pointer switch">
                    <Switch checked={remember} onChange={setRemember} />
                  </label>

                  <label
                    onClick={() => setRemember(!remember)}
                    className="mt-1 text-sm cursor-pointer shrink-0 text-heading ltr:pl-2.5 rtl:pr-2.5"
                  >
                    {t('forms:label-remember-me')}
                  </label>
                </div>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
