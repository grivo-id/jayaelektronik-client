import { useState } from 'react';
import PhoneInputLib from 'react-phone-input-2';
import cn from 'classnames';
import 'react-phone-input-2/lib/style.css';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'src/app/i18n/client';
import './phone-input.css';

type PhoneInputProps = {
  label?: string;
  error?: string;
  lang: string;
  className?: string;
  labelClassName?: string;
  name: string;
  control: any;
  required?: boolean | string;
};

export default function PhoneInput({
  label,
  error,
  lang,
  className = 'block',
  labelClassName,
  name,
  control,
  required,
}: PhoneInputProps) {
  const { t } = useTranslation(lang);
  const customPhoneInputClass = cn('', className);

  return (
    <div className={customPhoneInputClass}>
      {label && (
        <label
          htmlFor={name}
          className={`block font-normal text-sm leading-none mb-3 cursor-pointer ${
            labelClassName || 'text-brand-dark text-opacity-70'
          }`}
        >
          {t(label)}
        </label>
      )}
      <div className="">
        <Controller
          name={name}
          control={control}
          rules={{
            required,
       
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInputLib
              country="id" 
              value={value}
              onChange={(phone) => onChange(phone)}
              inputClass="py-2 px-4 w-full appearance-none text-brand-muted focus:text-brand-dark  transition duration-150 ease-in-out border text-13px lg:text-sm font-body rounded placeholder-[#B3B3B3] min-h-12 transition duration-200 ease-in-out text-brand-dark focus:ring-0 border-border-two focus:border-1 focus:outline-none focus:border-brand h-11 md:h-12"
              containerClass="w-full"
              buttonClass="phone-dropdown-button"
              dropdownClass="phone-dropdown"
              enableSearch
              countryCodeEditable={false} 
            />
          )}
        />
      </div>
      {error && (
        <p className="my-2 text-13px text-brand-danger text-opacity-70">
          {t(error)}
        </p>
      )}
    </div>
  );
}
