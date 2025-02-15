'use client';

import VendorCard from '@components/cards/vendor-card';
import { useShopsQuery } from '@framework/shop/get-shops';
import Alert from '@components/ui/alert';
import { useTranslation } from 'src/app/i18n/client';
import Heading from '@components/ui/heading';

type Shop = {
  id: string | number;
  address: string;
  phone: string | number;
  name: string;
  slug?: string;
  imageUrl: string;
};

type Props = {
  lang: string;
  shops: Shop[];
};

export default function ShopsPageContent({ lang, shops }: Props) {
  const { t } = useTranslation(lang, 'common');
  const data = shops;

  // if (error) return <Alert message={error?.message} />;

  return (
    <div className=" flex flex-col gap-4 md:gap-6 my-4 md:my-8">
      {data.map((item, index) => (
        <VendorCard key={item.id} shop={item} lang={lang} index={index} />
      ))}
    </div>
  );
}
