'use client';

import { useState } from 'react';
import type { FC } from 'react';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useTranslation } from 'src/app/i18n/client';
import { useDeleteWishlist } from '@framework/wishlist/delete-wishlist';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';

interface ProductProps {
  product: Product;
  className?: string;
  lang: string;
}

const WishlistProductCard: FC<ProductProps> = ({
  product,
  className,
  lang,
}) => {
  const { t } = useTranslation(lang, 'common');
  const {
    product_id,
    product_name,
    product_image1,
    product_is_available,
    unit,
  } = product ?? {};
  const placeholderImage = `/assets/placeholder/product.svg`;
  const [favorite, setFavorite] = useState<boolean>(false);
  const { width } = useWindowSize();
  const { price, basePrice, discount } = usePrice({
    amount: product.sale_price ? product.sale_price : product.product_price,
    baseAmount: product.product_price,
    currencyCode: 'IDR',
  });

  const { mutate: deleteWishlist, isLoading: deleteWishlistLoading } =
    useDeleteWishlist();

  const handleAddToWishlist = (productId: string) => {
    deleteWishlist(
      { product_id: productId },
      {
        onSuccess: () => {
          setFavorite(false);
          toast(t('text-remove-favorite'), {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        },
        onError: (error) => {
          toast('Failed to add to favorite list', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        },
      }
    );
  };

  return (
    <div className="flex flex-col py-4 border-b md:flex-row border-border-base 2xl:py-5 wishlist-card last:pb-0 first:-mt-8 lg:first:-mt-4 2xl:first:-mt-7">
      <div className="flex ">
        <div className="relative mt-1 shrink-0">
          <div className="flex overflow-hidden max-w-[80px]  transition duration-200 ease-in-out transform group-hover:scale-105">
            <Image
              src={product_image1 ?? placeholderImage}
              alt={product_name || 'Product Image'}
              width={80}
              height={80}
              quality={100}
              style={{ width: 'auto' }}
              className="object-cover bg-fill-thumbnail"
            />
          </div>
        </div>

        <div className="flex flex-col ltr:ml-2 rtl:mr-2 2xl:ltr:ml-3.5 2xl:rtl:mr-3.5 h-full">
          <h2 className="text-brand-dark text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5">
            {product_name}
          </h2>
          <div
            className={`mb-1 rounded-lg px-2 py-0.5 w-fit text-13px sm:text-sm  text-gray-50 ${
              product_is_available ? 'bg-brand-tree' : 'bg-brand-danger'
            }`}
          >
            {product_is_available
              ? t('text-wishlist-available')
              : t('text-wistlist-not-available')}
          </div>
          <div className="-mx-1">
            <span className="inline-block mx-1 text-sm font-semibold sm:text-15px lg:text-base text-brand-dark">
              {price}
            </span>
            {discount && (
              <del className="mx-1 text-sm text-opacity-50 text-brand-dark">
                {basePrice}
              </del>
            )}
          </div>
        </div>
      </div>
      <div
        className="flex cursor-pointer ltr:ml-auto rtl:mr-auto md:pt-7"
        onClick={() => handleAddToWishlist(product_id)}
      >
        {favorite ? (
          <>
            <IoIosHeartEmpty className="w-5 h-5 mt-0.5" />

            <span className=" ltr:ml-3 rtl:mr-3 text-brand-dark font-medium text-15px -mt-0.5 md:mt-0">
              {t('text-favorite')}
            </span>
          </>
        ) : (
          <>
            <IoIosHeart className="text-brand w-5 h-5 mt-0.5" />
            <span className="text-brand ltr:ml-3 rtl:mr-3 font-semibold text-15px -mt-0.5 md:mt-0">
              {t('text-favorited')}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistProductCard;
