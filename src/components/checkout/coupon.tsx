'use client';
import { toast } from 'react-toastify';
import Button from '@components/ui/button';
import Input from '@components/ui/form/input';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'src/app/i18n/client';
import ErrorIcon from '@components/icons/error-icon';
import useWindowSize from '@utils/use-window-size';
import { useState } from 'react';
import { useApplyCouponMutation } from '@framework/checkout/use-coupon-by-code';
import { Coupon as CouponProps } from '@framework/types';
import usePrice from '@framework/product/use-price';

type Props = {
  lang: string;
  couponData?: CouponProps;
  setCoupon: Function;
};

export default function Coupon({ lang, setCoupon, couponData }: Props) {
  const { t } = useTranslation(lang, 'common');
  const { isAuthorized } = useUI();
  const { width } = useWindowSize();
  const [couponCode, setCouponCode] = useState<string>('');
  const { mutate: applyCoupon, isLoading } = useApplyCouponMutation();

  const { price: max_discount } = usePrice({
    amount: couponData?.coupon_max_discount || 0,
    currencyCode: 'IDR',
  });

  const { price: min_transaction } = usePrice({
    amount: couponData?.coupon_min_transaction || 0,
    currencyCode: 'IDR',
  });

  const handleApplyCoupon = async () => {
    if (!isAuthorized) {
      toast.error(`${t('text-coupon-not-authorized')}`, {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <ErrorIcon />,
      });
      return;
    }

    // if (!couponCode) {
    //   toast.error(t('text-enter-coupon-code'), {
    //     progressClassName: 'fancy-progress-bar',
    //     position: width! > 768 ? 'bottom-right' : 'top-right',
    //     autoClose: 1500,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     icon: <ErrorIcon />,
    //   });
    //   return;
    // }

    applyCoupon(
      { code: couponCode },
      {
        onSuccess: (data) => {
          if (data.success) {
            toast.success(t('text-coupon-applied-successfully'), {
              progressClassName: 'fancy-progress-bar',
              position: width! > 768 ? 'bottom-right' : 'top-right',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            setCoupon(data.data);
          } else {
            toast.error(t('text-coupon-invalid'), {
              progressClassName: 'fancy-progress-bar',
              position: width! > 768 ? 'bottom-right' : 'top-right',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              icon: <ErrorIcon />,
            });
          }
        },
        onError: () => {
          toast.error(t('text-coupon-invalid'), {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            icon: <ErrorIcon />,
          });
        },
      }
    );
  };

  const handleClearCoupon = () => {
    setCoupon();
    setCouponCode('');
  };

  return (
    <div className="flex flex-col gap-4 text-brand-dark">
      <div className="flex flex-row gap-4 items-end w-full ">
        <Input
          label={t('forms:label-apply-coupon') as string}
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="w-full"
          name="couponCode"
          id="couponCode"
          type="text"
          variant="normal"
          lang={lang}
        />
        <Button
          onClick={handleApplyCoupon}
          variant="formButton"
          className="bg-brand shrink-0"
          disabled={!couponCode}
        >
          {t('apply-coupon-btn')}
        </Button>
      </div>
      {couponData && (
        <div className="bg-inherit p-4 rounded-md shadow-sm border border-gray-100/75 flex flex-col gap-4 items-start w-full">
          <span className="font-medium text-lg">Coupon Details:</span>
          <Input
            label={t('forms:label-coupon_percentage') as string}
            name="coupon_percentage"
            value={`${couponData.coupon_percentage} %`}
            type="text"
            className="w-full"
            variant="normal"
            lang={lang}
            disabled
          />
          <Input
            label={t('forms:label-coupon_max_discount') as string}
            name="coupon_max_discount"
            value={`${max_discount}`}
            type="text"
            className="w-full"
            variant="normal"
            lang={lang}
            disabled
          />

          <Input
            label={t('forms:label-coupon_min_product_qty') as string}
            name="coupon_min_product_qty"
            value={`${couponData.coupon_min_product_qty}`}
            type="text"
            className="w-full"
            variant="normal"
            lang={lang}
            disabled
          />

          <Input
            label={t('forms:label-min_transaction') as string}
            name="coupon_min_product_qty"
            value={`${min_transaction}`}
            type="text"
            className="w-full"
            variant="normal"
            lang={lang}
            disabled
          />
          <div className="flex justify-end w-full">
            <Button
              onClick={handleClearCoupon}
              variant="formButton"
              className="bg-brand-danger"
            >
              {t('cancel-redeem')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
