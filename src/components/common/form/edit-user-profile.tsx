import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
import ErrorIcon from '@components/icons/error-icon';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'src/app/i18n/client';
import { useUI } from '@contexts/ui.context';
import { useAddShippingMutation } from '@framework/checkout/use-shipping-address';
import {
  UpdateUserType,
  useUpdateUserMutation,
} from '@framework/customer/use-update-customer';

interface ContactFormValues {
  shipping_address_title: string;
  shipping_address_desc: string;
}

type UserInfo = {
  firstName: string;
  lastName: string;
  phoneNumber: number | string;
  email: string;
};

type Props = {
  lang: string;
};

export default function EditUserProfileForm({ lang }: Props) {
  const { t } = useTranslation(lang);
  const { width } = useWindowSize();
  const { data } = useModalState();
  const { user } = useUI();
  const { mutate: updateUser, isLoading } = useUpdateUserMutation();
  const { closeModal } = useModalAction();
  const defaultValues: UpdateUserType = {
    user_fname: user.user_fname,
    user_lname: user.user_lname,
    user_email: user.user_email,
    user_phone: user.user_phone,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateUserType>({
    defaultValues,
  });
  function onSubmit(input: UpdateUserType) {
    console.log('formdata', input);
    updateUser(input);
  }

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-edit-details-personal')}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full mx-auto"
        noValidate
      >
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={t('forms:label-first-name') as string}
                {...register('user_fname', {
                  required: 'forms:first-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.user_fname?.message}
                defaultValue={user.user_fname}
                lang={lang}
              />
              <Input
                label={t('forms:label-last-name') as string}
                {...register('user_lname', {
                  required: 'forms:last-name-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.user_lname?.message}
                defaultValue={user.user_lname}
                lang={lang}
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label={t('forms:label-email-star') as string}
                {...register('user_email', {
                  required: 'forms:email-required',
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'forms:email-error',
                  },
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.user_email?.message}
                defaultValue={user.user_email}
                lang={lang}
              />

              <Input
                type="number"
                label={t('forms:label-phone') as string}
                {...register('user_phone', {
                  required: 'forms:phone-required',
                })}
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                error={errors.user_phone?.message}
                defaultValue={user.user_phone}
                lang={lang}
              />
            </div>
          </div>
        </div>

        <div className="relative flex pb-2 mt-5 sm:ltr:ml-auto sm:rtl:mr-auto lg:pb-0">
          <Button
            type="submit"
            loading={isLoading}
            disabled={isLoading}
            variant="formButton"
            className="w-full sm:w-auto"
          >
            {t('common:button-save-changes')}
          </Button>
        </div>
      </form>
    </div>
  );
}
