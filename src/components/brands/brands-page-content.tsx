'use client';

import { useBrandsQuery } from '@framework/brand/get-all-brands';
import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import Heading from '@components/ui/heading';

type Props = {
  lang: string;
};

export default function BrandsPageContent({ lang }: Props) {
  const { t } = useTranslation(lang, 'common');
  const {
    data: brandData,
    isLoading,
    error,
  } = useBrandsQuery({
    page: 1,
    limit: 99,
    sort: 'desc',
  });

  const brands = brandData?.data || [];
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;

  if (isLoading) {
    return (
      <div className="w-full max-w-[80rem] mx-auto my-6 md:my-10 px-4">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] animate-pulse gap-4 ">
          {Array.from({ length: 14 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-[100px] flex items-center p-4 bg-muted "
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[80rem] mx-auto my-6 md:my-10 px-4">
      <div className="flex flex-col gap-0 mb-10 justify-center px-4 items-center text-center">
        <Heading variant="heading" className="">
          {t('text-brand-sellingpoint')}
        </Heading>
        <div className="flex flex-wrap gap-2 items-center text-center justify-center">
          <span>{t('text-brand-invite')}</span>
          <button className="bg-brand px-4 py-1.5 text-sm text-white rounded-md hover:opacity-80 duration-200 ease-in-out">
            Contact Us
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
        {brands.map((brand, index) => (
          <div
            key={`${brand.brand_id}-${index}`}
            className="w-full h-full flex items-center justify-center"
          >
            <Image
              alt={t('common:text-logo')}
              src={brand.brand_image ?? placeholderImage}
              width={180}
              height={180}
              className="object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
