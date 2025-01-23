import { CheckBox } from '@components/ui/form/checkbox';
import { useBrandsQuery } from '@framework/brand/get-all-brands';
import { Disclosure } from '@headlessui/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import React, { useState, useEffect } from 'react';
import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n/client';
import useQueryParam from '@utils/use-query-params';

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export const BrandFilter = ({ lang }: { lang: string }) => {
  const { t } = useTranslation(lang, 'common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const [formState, setFormState] = useState<string[]>([]);

  const hasQueryKey = searchParams?.get('brand');

  useEffect(() => {
    updateQueryparams('brand', formState.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

  useEffect(() => {
    setFormState(hasQueryKey?.split(',') ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasQueryKey]);

  const { data, isLoading, error } = useBrandsQuery({
    limit: 99,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
    const { value } = e.currentTarget;
    setFormState(
      formState.includes(value)
        ? formState.filter((item) => item !== value)
        : [...formState, value]
    );
  }
  const items = data?.data || [];

  return (
    <div className="block">
      <Heading className="lg:text-xl mb-5 -mt-1 block-title">
        {t('text-brands')}
      </Heading>
      <div className="flex flex-col">
        {items?.slice(0, 3)?.map((item: any) => (
          <CheckBox
            key={`${item.brand_name}-key-${item.brand_id}`}
            label={item.brand_name}
            name={item.brand_name.toLowerCase()}
            checked={formState.includes(convertToSlug(item.brand_name))}
            value={convertToSlug(item.brand_name)}
            onChange={handleItemClick}
            lang={lang}
          />
        ))}
        {items && items.length > 3 && (
          <div className="w-full">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Panel className="pt-4 pb-2">
                    {items?.slice(3, items.length).map((item: any) => (
                      <CheckBox
                        key={`${item.brand_name}-key-${item.brand_id}`}
                        label={item.brand_name}
                        name={item.brand_name.toLowerCase()}
                        checked={formState.includes(convertToSlug(item.brand_name))}
                        value={convertToSlug(item.brand_name)}
                        onChange={handleItemClick}
                        lang={lang}
                      />
                    ))}
                  </Disclosure.Panel>
                  <Disclosure.Button className="flex justify-center items-center w-full px-4 py-2.5 text-sm font-medium text-center bg-brand text-white focus:outline-none rounded-md">
                    {open ? (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-less')}
                        </span>
                        <IoIosArrowUp className="text-white text-opacity-60 text-15px" />
                      </>
                    ) : (
                      <>
                        <span className="inline-block ltr:pr-1 rtl:pl-1">
                          {t('text-see-more')}
                        </span>
                        <IoIosArrowDown className="text-white text-opacity-60 text-15px" />
                      </>
                    )}
                  </Disclosure.Button>
                </>
              )}
            </Disclosure>
          </div>
        )}
      </div>
    </div>
  );
};
