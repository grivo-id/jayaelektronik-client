import Button from '@components/ui/button';
import { useForm } from 'react-hook-form';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import { useChangePasswordMutation } from '@framework/customer/use-change-password';
import PasswordInput from '@components/ui/form/password-input';

type Props = {
  lang: string;
};

type ChangePasswordInputType = {
  newPassword: string;
  oldPassword: string;
  passwordConfirmation?: string;
};

export default function ChangePasswordForm({ lang }: Props) {
  const { t } = useTranslation(lang);
  const { width } = useWindowSize();
  const { mutate: changePassword, isLoading } = useChangePasswordMutation();
  const { closeModal } = useModalAction();
  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    passwordConfirmation: '',
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordInputType>({
    defaultValues,
  });

  const newPassword = watch('newPassword');

  function onSubmit(formData: ChangePasswordInputType) {
    console.log('formdata pasw', formData);
    const { passwordConfirmation, ...submitData } = formData;
    changePassword(submitData);
  }

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-account-details-password')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col justify-center w-full mx-auto gap-4"
      >
        <PasswordInput
          label={t('forms:label-old-password')}
          error={errors.oldPassword?.message}
          {...register('oldPassword', {
            required: `${t('forms:password-old-required')}`,
          })}
          lang={lang}
        />
        <PasswordInput
          label={t('forms:label-new-password')}
          error={errors.newPassword?.message}
          {...register('newPassword', {
            required: `${t('forms:password-new-required')}`,
          })}
          lang={lang}
        />

        <PasswordInput
          label={t('forms:label-confirm-password')}
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation', {
            required: `${t('forms:confirm-password-required')}`,
            validate: (value) =>
              value === newPassword || `${t('forms:password-not-match')}`,
          })}
          lang={lang}
        />

        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:text-change-password')}
          </Button>
        </div>
      </form>
    </div>
  );
}
