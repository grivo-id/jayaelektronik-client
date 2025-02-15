'use client';

import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useUI } from '@contexts/ui.context';
import useWindowSize from '@utils/use-window-size';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';

type Props = {
  lang: string;
};

export default function CheckoutInformation({ lang }: Props) {
  const { user, setCheckOutFormData, checkOutFormData } = useUI();
  const router = useRouter();
  const { width } = useWindowSize();
  const { t } = useTranslation(lang);

  useEffect(() => {
    if (user) {
      setCheckOutFormData({
        user_fname: user.user_fname,
        user_lname: user.user_lname,
        user_email: user.user_email,
        user_phone: user.user_phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCheckOutFormData({
      user_fname: name === 'user_fname' ? value : checkOutFormData.user_fname,
      user_lname: name === 'user_lname' ? value : checkOutFormData.user_lname,
      user_email: name === 'user_email' ? value : checkOutFormData.user_email,
      user_phone: name === 'user_phone' ? value : checkOutFormData.user_phone,
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
            variant="normal"
            lang={lang}
            disabled
          />
          <Input
            label={t('forms:label-last-name') as string}
            type="text"
            variant="solid"
            value={checkOutFormData.user_lname}
            name="user_lname"
            lang={lang}
            disabled
          />
          <Input
            label={t('forms:label-email') as string}
            type="email"
            variant="solid"
            value={checkOutFormData.user_email}
            name="user_email"
            lang={lang}
            disabled
          />
          <Input
            label={t('forms:label-phone') as string}
            type="text"
            variant="solid"
            value={checkOutFormData.user_phone}
            name="user_phone"
            lang={lang}
            disabled
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
          <Input
            label={t('forms:label-phone') as string}
            type="text"
            variant="solid"
            value={checkOutFormData.user_phone}
            name="user_phone"
            onChange={handleChange}
            lang={lang}
          />
        </div>
      )}
    </div>
  );
}
