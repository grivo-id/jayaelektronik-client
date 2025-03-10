'use client';
import { useState } from 'react';
import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import Countdown, { zeroPad } from 'react-countdown';
import { productPlaceholder } from '@assets/placeholders';
import ProgressCard from '@components/ui/progress-card';
import { useTranslation } from 'src/app/i18n/client';
import PromoCountdown from './promo-coundown';
import { usePromoCountdown } from '@utils/use-promo-countdown';

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
  date?: string | number | Date | undefined;
}

const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
  if (completed) {
    return null;
  } else {
    return (
      <div className="flex  text-base xl:text-lg text-skin-base text-opacity-50 font-semibold -mx-2.5">
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(days)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(hours)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(minutes)}
        </span>
        :
        <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
          {zeroPad(seconds)}
        </span>
      </div>
    );
  }
};

const ProductFlashSellCard: React.FC<ProductProps> = ({
  lang,
  product,
  className,
  date,
}) => {
  const {
    product_name,
    product_image1,
    product_is_available,
    product_item_sold,
    product_promo,
    product_is_bestseller,
    product_is_new_arrival,
    product_type,
  } = product ?? {};
  const isValidPromoDate = usePromoCountdown(product_promo);
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.product_price,
    baseAmount: product?.product_price,
    currencyCode: 'IDR',
  });
  const { price: promoPrice } = usePrice({
    amount: product?.product_promo?.product_promo_final_price ?? 0,
    currencyCode: 'IDR',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }

  return (
    <article
      className={cn(
        'flex flex-col justify-between group cursor-pointer relative px-4 lg:px-4 ',
        className
      )}
      onClick={handlePopupView}
      title={product_name}
    >
      <div className="grid grid-cols-7 gap-2">
        <div className="relative col-span-12 sm:col-span-3">
          <div className="flex justify-center overflow-hidden mx-auto relative">
            {product_image1 ? (
              <Image
                src={product_image1 || productPlaceholder}
                alt={product_name || 'Product Image'}
                width={350}
                height={350}
                quality={100}
                className="object-cover bg-skin-thumbnail"
              />
            ) : (
              <Image
                src={productPlaceholder}
                alt={'Product Image'}
                width={350}
                height={350}
                quality={100}
                className="object-cover bg-skin-thumbnail"
              />
            )}
          </div>

          <div className="w-full h-full absolute top-0 z-10 -mx-0.5 sm:-mx-1">
            {!product_is_available && (
              <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-brand-danger rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                {t('text-notavailable')}
              </span>
            )}
            {product_promo?.product_promo_is_discount &&
              product_is_available &&
              isValidPromoDate && (
                <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                  {t('text-on-sale')}
                </span>
              )}
            {product_promo?.product_promo_is_best_deal &&
              product_is_available && (
                <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                  {t('text-best-deal')}
                </span>
              )}

            {product_is_new_arrival &&
              product_is_available &&
              !product_is_bestseller && (
                <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                  {t('text-new-arrival-badge')}
                </span>
              )}

            {product_is_bestseller &&
              product_is_available &&
              !product_is_new_arrival && (
                <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                  {t('text-best-seller-badge')}
                </span>
              )}
          </div>
        </div>

        <div className="col-span-12 sm:col-span-4 flex flex-col pb-5 lg:pb-6 mb-0.5 lg:pt-3 h-full ">
          <h2 className="text-skin-base text-base font-semibold mb-4">
            {product_name}
          </h2>
          <div className="space-s-2 mb-1 ">
            {product_promo?.product_promo_is_discount && isValidPromoDate ? (
              <div className="flex flex-col gap-1">
                <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                  {promoPrice}
                </span>
                <div className="flex flex-row gap-2 items-center">
                  <del className="text-sm text-skin-base text-opacity-70">
                    {price}
                  </del>
                  {product_promo?.product_promo_discount_percentage > 0 && (
                    <span className="text-sm text-rose-500">
                      {product_promo?.product_promo_discount_percentage}%,
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {price}
              </span>
            )}
          </div>
          {/* {product_item_sold > 0 && (
            <span className="mb-1 lg:mb-4 text-brand-muted ">
              {product_item_sold}
              {product_item_sold > 100 ? '+' : ''} {t('text-sold')}
            </span>
          )} */}

          {isValidPromoDate && (
            <>
              {/* <h2 className="text-skin-base text-opacity-60 sm:text-sm lg:text-15px mb-2">
                {product_promo?.product_promo_discount_percentage}% Off,{' '}
                {t('text-offer-end')}
              </h2> */}
              <PromoCountdown promoData={product_promo} />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductFlashSellCard;
