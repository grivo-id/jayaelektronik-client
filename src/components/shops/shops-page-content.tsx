'use client';

import VendorCard from '@components/cards/vendor-card';

type Shop = {
  id: string | number;
  address: string;
  phone: string | number;
  name: string;
  operationWeekday: string;
  operationWeekend: string;
  operationWeekdayEn: string;
  operationWeekendEn: string;
  slug?: string;
  imageUrl: string;
  map?: string;
};

type Props = {
  lang: string;
  shops: Shop[];
};

export default function ShopsPageContent({ lang, shops }: Props) {
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
