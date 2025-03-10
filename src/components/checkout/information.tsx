'use client';

import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import PhoneInput from '@components/ui/form/phone-input';
import { useUI } from '@contexts/ui.context';
import useWindowSize from '@utils/use-window-size';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';

type Props = {
  lang: string;
};

export default function CheckoutInformation({ lang }: Props) {
  const { user, setCheckOutFormData, checkOutFormData } = useUI();
  const router = useRouter();
  const { width } = useWindowSize();
  const { t } = useTranslation(lang);

  const { control, setValue, watch } = useForm({
    defaultValues: {
      user_fname: '',
      user_lname: '',
      user_email: '',
      user_phone: '',
    },
  });

  const phoneValue = watch('user_phone');

  useEffect(() => {
    if (user) {
      setValue('user_fname', user.user_fname);
      setValue('user_lname', user.user_lname);
      setValue('user_email', user.user_email);
      setValue('user_phone', user.user_phone);

      setCheckOutFormData({
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_email: user.user_email,
        user_phone: user.user_phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateSessionStorage = (data: any) => {
    sessionStorage.setItem('default_address', JSON.stringify(data));
  };

  useEffect(() => {
    if (phoneValue && phoneValue !== checkOutFormData.user_phone) {
      setCheckOutFormData({
        ...checkOutFormData,
        user_phone: phoneValue,
      });

      const currentStorageData = JSON.parse(
        sessionStorage.getItem('default_address') || '{}'
      );

      updateSessionStorage({
        ...currentStorageData,
        user_phone: phoneValue,
        user_name:
          `${checkOutFormData.user_fname} ${checkOutFormData.user_lname}`.trim(),
      });
    }
  }, [phoneValue, checkOutFormData.user_fname, checkOutFormData.user_lname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValue(name as any, value);

    const updatedData = {
      user_fname: name === 'user_fname' ? value : checkOutFormData.user_fname,
      user_lname: name === 'user_lname' ? value : checkOutFormData.user_lname,
      user_email: name === 'user_email' ? value : checkOutFormData.user_email,
      user_phone: name === 'user_phone' ? value : checkOutFormData.user_phone,
    };

    setCheckOutFormData(updatedData);

    const currentStorageData = JSON.parse(
      sessionStorage.getItem('default_address') || '{}'
    );

    const fname = name === 'user_fname' ? value : updatedData.user_fname;
    const lname = name === 'user_lname' ? value : updatedData.user_lname;
    const combinedName = `${fname} ${lname}`.trim();

    updateSessionStorage({
      ...currentStorageData,
      ...updatedData,
      user_name: combinedName,
    });
  };

  return (
    <div className="text-brand-dark">
      {user ? (
        <div className="flex flex-col space-y-4">
          <Input
            label={t('forms:label-first-name') as string}
            name="user_fname"
            value={checkOutFormData.user_fname}
            type="text"
            variant="solid"
            lang={lang}
            onChange={handleChange}
          />
          <Input
            label={t('forms:label-last-name') as string}
            type="text"
            variant="solid"
            value={checkOutFormData.user_lname}
            name="user_lname"
            lang={lang}
            onChange={handleChange}
          />
          <Input
            label={t('forms:label-email') as string}
            type="email"
            variant="normal"
            value={checkOutFormData.user_email}
            name="user_email"
            lang={lang}
            disabled
          />

          <PhoneInput
            label="forms:label-phone"
            name="user_phone"
            control={control}
            lang={lang}
          />
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          <Input
            label={t('forms:label-first-name') as string}
            name="user_fname"
            type="text"
            variant="solid"
            value={checkOutFormData.user_fname}
            onChange={handleChange}
            lang={lang}
          />
          <Input
            label={t('forms:label-last-name') as string}
            name="user_lname"
            type="text"
            value={checkOutFormData.user_lname}
            variant="solid"
            onChange={handleChange}
            lang={lang}
          />
          <Input
            label={t('forms:label-email') as string}
            type="email"
            variant="solid"
            name="user_email"
            value={checkOutFormData.user_email}
            onChange={handleChange}
            lang={lang}
          />
          <PhoneInput
            label="forms:label-phone"
            name="user_phone"
            control={control}
            lang={lang}
          />
        </div>
      )}
    </div>
  );
}
