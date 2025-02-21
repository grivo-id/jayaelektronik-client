'use client';

import Input from '@components/ui/form/input';
import Heading from '@components/ui/heading';
import { UserPenIcon } from 'lucide-react';
import { useUI } from '@contexts/ui.context';
import { useForm, Controller } from 'react-hook-form';
import Switch from '@components/ui/switch';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';
import { useModalAction } from '@components/common/modal/modal.context';
import { IoSettingsOutline } from 'react-icons/io5';
import TextArea from '@components/ui/form/text-area';

interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}
const AccountDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { user } = useUI();
  const { t } = useTranslation(lang);
  const { openModal } = useModalAction();

  function handleChangePaswPopupView(item: any) {
    openModal('CHANGE_PASSWORD_VIEW', item);
  }

  function handleEditUserPopupView(item: any) {
    openModal('EDIT_USERPROFILE_VIEW', item);
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap w-full justify-between gap-2 items-center mb-5 md:mb-6 lg:mb-7 lg:-mt-1">
        <Heading variant="titleLarge" className="">
          {t('common:text-account-details-personal')}
        </Heading>
        <div className="flex flex-row gap-2">
          <button
            onClick={handleChangePaswPopupView}
            className="bg-transparent border border-brand px-4 py-2 text-brand text-sm flex flex-row gap-1 items-center rounded-md shadow transition duration-200 ease-in-out hover:opacity-70"
          >
            <IoSettingsOutline className="w-5 md:w-[22px] h-5 md:h-[22px] text-brand" />
            {t('text-change-password')}
          </button>
          <button
            onClick={handleEditUserPopupView}
            className="bg-brand px-4 py-2 text-white text-sm flex flex-row gap-1 items-center rounded-md shadow transition duration-200 ease-in-out hover:opacity-70"
          >
            <UserPenIcon className="w-5 md:w-[22px] h-5 md:h-[22px] text-white" />
            {t('text-edit-profile')}
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center w-full mx-auto">
        <div className="border-b border-border-base pb-7 md:pb-8 lg:pb-10">
          <div className="flex flex-col space-y-4 sm:space-y-5">
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                label={t('forms:label-first-name') as string}
                name="firstName"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                defaultValue={user?.user_fname || ''}
                lang={lang}
                disabled
              />
              <Input
                label={t('forms:label-last-name') as string}
                name="lastName"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                defaultValue={user?.user_lname || ''}
                lang={lang}
                disabled
              />
            </div>
            <div className="flex flex-col sm:flex-row -mx-1.5 md:-mx-2.5 space-y-4 sm:space-y-0">
              <Input
                type="email"
                label={t('forms:label-email-star') as string}
                name="email"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                defaultValue={user?.user_email || ''}
                lang={lang}
                disabled
              />
              <Input
                type="tel"
                label={t('forms:label-phone') as string}
                name="phoneNumber"
                variant="solid"
                className="w-full sm:w-1/2 px-1.5 md:px-2.5"
                defaultValue={user?.user_phone || ''}
                lang={lang}
                disabled
              />
            </div>
          </div>
        </div>
        <div className="relative flex w-full pt-4 md:pt-6 lg:pt-8">
          <TextArea
            label="Address"
            name="user_address"
            className="text-brand-dark w-full"
            variant="solid"
            defaultValue={user?.user_address || ''}
            lang={lang}
          />

          {/* <div className="ltr:pr-2.5 rtl:pl-2.5">
            <Heading className="mb-1 font-medium">
              {t('common:text-share-profile-data')}
            </Heading>
            <Text variant="small">
              {t('common:text-share-profile-data-description')}
            </Text>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <Controller
              name="shareProfileData"
              // control={control}
              defaultValue={true}
              render={({ field: { value, onChange } }) => (
                <Switch onChange={onChange} checked={value} />
              )}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
