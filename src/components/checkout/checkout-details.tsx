'use client';

import { useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import Button from '@components/ui/button';
import Heading from '@components/ui/heading';
import Address from './address';
import CheckoutInformation from './information';
import Coupon from './coupon';
import { Coupon as CouponType } from '@framework/types';

type Props = {
  lang: string;
  coupon?: CouponType
  setCoupon: Function
};

const CheckoutDetails: React.FC<Props> = ({ lang, setCoupon, coupon }) => {
  const isLoggedin = false;
  const { t } = useTranslation(lang, 'common');
  const [bindIndex, setBindIndex] = useState(0);
  const data = [
    {
      id: 1,
      title: 'text-delivery-userinfo',
      component: <CheckoutInformation lang={lang} />,
    },
    {
      id: 2,
      title: 'text-delivery-address',
      component: <Address lang={lang} />,
    },
    {
      id: 3,
      title: 'text-coupon',
      component: <Coupon lang={lang} setCoupon={setCoupon} couponData={coupon} />,
    },

    // {
    //   id: 4,
    //   title: 'text-delivery-instructions',
    //   component: <DeliveryNotes lang={lang} />,
    // },
  ];
  const changeItem = (itemIndex: any) => {
    if (itemIndex !== bindIndex) {
      setBindIndex(itemIndex);
    }
  };

  const filteredData = isLoggedin ? data.filter((item) => item.id !== 1) : data;

  const mounted = useIsMounted();
  return (
    <div className="border rounded-md border-border-base text-brand-light">
      {mounted &&
        filteredData?.map((item, index) => {
          return (
            <div
              key={index}
              className={`accordion__panel ${
                !(data?.length - 1 === index)
                  ? 'border-b border-border-base'
                  : ''
              } ${bindIndex !== index ? 'collapsed' : 'expanded'}
            `}
              onClick={() => changeItem(index)}
            >
              <div
                id={`index_${index}`}
                className="flex items-center p-4 pb-6 cursor-pointer sm:p-8 accordion__button"
              >
                <span className="flex items-center justify-center font-semibold border-2 border-brand-dark rounded-full h-9 w-9 text-brand-dark ltr:mr-3 rtl:ml-3">
                  {index + 1}
                </span>
                <Heading>{t(item?.title)}</Heading>
              </div>

              <div
                data-aria-label={`index_${index}`}
                className="pb-6 ltr:pl-5 rtl:pr-5 sm:ltr:pl-9 sm:rtl:pr-9 lg:ltr:pl-20 lg:rtl:pr-20 sm:ltr:pr-9 sm:rtl:pl-9 ltr:pr-5 rtl:pl-5 accordion__content"
              >
                <div className="mb-6">{item?.component}</div>
                {!(data?.length - 1 === index) ? (
                  <div className="ltr:text-right rtl:text-left">
                    <Button
                      onClick={() => changeItem(index + 1)}
                      variant="formButton"
                      className="px-4 py-3 text-sm font-semibold rounded bg-brand text-brand-light"
                    >
                      {t('button-next-steps')}
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CheckoutDetails;
