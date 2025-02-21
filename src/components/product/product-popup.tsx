import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import isEmpty from 'lodash/isEmpty';
import { ROUTES } from '@utils/routes';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import ProductAttributes from '@components/product/product-attributes';
import { generateCartItem } from '@utils/generate-cart-item';
import usePrice from '@framework/product/use-price';
import { getVariations } from '@framework/utils/get-variations';
import { useTranslation } from 'src/app/i18n/client';
import { useUI } from '@contexts/ui.context';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { footer } from '../../layouts/footer/data';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import CloseButton from '@components/ui/close-button';
import VariationPrice from './variation-price';
import isEqual from 'lodash/isEqual';
import { productGalleryPlaceholder } from '@assets/placeholders';
import { usePromoCountdown } from '@utils/use-promo-countdown';
import Link from '@components/ui/link';
import { useCreateWishlist } from '@framework/wishlist/add-to-wishlist';
import { useIsProductOnWishlistQuery } from '@framework/wishlist/check-is-wishlist';
import { useDeleteWishlist } from '@framework/wishlist/delete-wishlist';

const breakpoints = {
  '1536': {
    slidesPerView: 6,
  },
  '1280': {
    slidesPerView: 5,
  },
  '1024': {
    slidesPerView: 4,
  },
  '640': {
    slidesPerView: 3,
  },
  '360': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export default function ProductPopup({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'common');

  const { isAuthorized } = useUI();
  const { data } = useModalState();
  const { width } = useWindowSize();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const { price, basePrice } = usePrice({
    amount: data?.sale_price ? data?.sale_price : data?.product_price,
    baseAmount: data?.product_price,
    currencyCode: 'IDR',
  });
  const { price: promoPrice } = usePrice({
    amount: data?.product_promo?.product_promo_final_price ?? 0,
    currencyCode: 'IDR',
  });

  const variations = getVariations(data.variations);
  const {
    product_id,
    product_name,
    product_image1,
    product_image2,
    product_image3,
    brand_name,
    product_desc,
    product_tags,
    product_is_available,
    product_promo,
    product_item_sold,
    quantity,
  } = data;
  const isValidPromoDate = usePromoCountdown(product_promo);
  const gallery = [product_image1, product_image2, product_image3];

  const {
    data: isWishlistAvailableData,
    isLoading: isWishlistAvailableLoading,
    error,
  } = useIsProductOnWishlistQuery({
    product_id: product_id,
  });
  const { mutate: saveToWishlist, isLoading: isWishlistLoading } =
    useCreateWishlist();

  const { mutate: deleteWishlist, isLoading: deleteWishlistLoading } =
    useDeleteWishlist();

  useEffect(() => {
    if (
      isWishlistAvailableData?.data &&
      isWishlistAvailableData?.success === true
    ) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [isWishlistAvailableData]);

  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${lang}${
    ROUTES.PRODUCT
  }/${product_id}.${convertToSlug(product_name)}`;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  const { payment } = footer;
  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    selectedVariation = data?.variation_options?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(data, selectedVariation, isValidPromoDate);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);
    addItemToCart(item, selectedQuantity);
    // @ts-ignore
    toast(t('text-added-bag'), {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
  function addToWishlist() {
    setAddToWishlistLoader(true);
    setFavorite(!favorite);
    const toastStatus: string =
      favorite === true ? t('text-remove-favorite') : t('text-added-favorite');
    setTimeout(() => {
      setAddToWishlistLoader(false);
    }, 1500);
    toast(toastStatus, {
      progressClassName: 'fancy-progress-bar',
      position: width! > 768 ? 'bottom-right' : 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  const handleAddToWishlist = (productId: string) => {
    setAddToWishlistLoader(true);

    if (isWishlistAvailableData?.data) {
      deleteWishlist(
        { product_id: productId },
        {
          onSuccess: () => {
            // console.log('Added to wishlist successfully');
            setAddToWishlistLoader(false);
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
            // console.error('Failed to add to wishlist:', error);
            toast('Failed to add to favorite list', {
              progressClassName: 'fancy-progress-bar',
              position: width! > 768 ? 'bottom-right' : 'top-right',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setAddToWishlistLoader(false);
          },
        }
      );
    } else {
      saveToWishlist(
        { product_id: productId },
        {
          onSuccess: () => {
            // console.log('Added to wishlist successfully');
            setAddToWishlistLoader(false);
            setFavorite(true);
            toast(t('text-added-favorite'), {
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
            // console.error('Failed to add to wishlist:', error);
            toast('Failed to add to favorite list', {
              progressClassName: 'fancy-progress-bar',
              position: width! > 768 ? 'bottom-right' : 'top-right',
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            setAddToWishlistLoader(false);
          },
        }
      );
    }
  };

  // console.log('lang', lang);
  // console.log(
  //   'route',
  //   `${lang}/${ROUTES.PRODUCT}/${product_id}.${convertToSlug(product_name)}`
  // );
  function navigateToProductPage() {
    closeModal();
    // router.push(
    //   `${lang}/${ROUTES.PRODUCT}/${product_id}.${convertToSlug(product_name)}`
    // );
  }

  useEffect(() => setSelectedQuantity(1), [data.id]);

  return (
    <div className="md:w-[600px] lg:w-[940px] xl:w-[1180px] mx-auto p-1 lg:p-0 xl:p-3 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <div className="overflow-hidden">
        <div className="px-2 md:px-5 mb-2 lg:mb-2 pt-4 md:pt-7">
          <div className="lg:flex items-stretch justify-between gap-8">
            <div className="xl:flex  justify-center overflow-hidden">
              {!!gallery?.length ? (
                <ThumbnailCarousel gallery={gallery} lang={lang} />
              ) : (
                <div className="flex items-center justify-center w-auto">
                  <Image
                    src={product_image1 ?? productGalleryPlaceholder}
                    alt={product_name}
                    width={650}
                    height={590}
                    style={{ width: 'auto' }}
                  />
                </div>
              )}
            </div>

            <div className="flex-shrink-0 flex flex-col lg:w-[430px] xl:w-[520px] 2xl:w-[520px]">
              <div className="pt-5 lg:pt-0 pb-5">
                <Link
                  href={`/${lang}${
                    ROUTES.PRODUCTS
                  }/${product_id}.${convertToSlug(product_name)}`}
                  onClick={navigateToProductPage}
                >
                  <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl hover:text-brand">
                    {product_name}
                  </h2>
                </Link>
                {brand_name && isEmpty(variations) ? (
                  <div className="text-sm font-medium md:text-15px">
                    {brand_name}
                  </div>
                ) : (
                  <VariationPrice
                    selectedVariation={selectedVariation}
                    minPrice={data.min_price}
                    maxPrice={data.max_price}
                    lang={lang}
                  />
                )}

                {isEmpty(variations) && (
                  <div className="flex items-center mt-5">
                    {product_promo?.product_promo_is_discount &&
                    isValidPromoDate ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 items-center">
                          <div className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                            {promoPrice}
                          </div>
                          <span className="inline-block rounded font-bold text-xs md:text-sm bg-rose-500 bg-opacity-20 text-rose-500 uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                            {product_promo.product_promo_discount_percentage}%{' '}
                            {t('text-off')}
                          </span>
                        </div>

                        <del className="text-sm text-opacity-50 md:text-15px ltr:pl-0 rtl:pr-3 ">
                          {price}
                        </del>
                      </div>
                    ) : (
                      <div className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                        {price}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {Object.keys(variations).map((variation) => {
                return (
                  <ProductAttributes
                    key={`popup-attribute-key${variation}`}
                    variations={variations}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />
                );
              })}
              {product_item_sold > 0 && (
                <span className="text-sm text-brand-muted">
                  {product_item_sold}
                  {product_item_sold > 100 ? '+' : ''} {t('text-sold')}
                </span>
              )}
              <div className="pb-2">
                {/* check that item isInCart and place the available quantity or the item quantity */}
                {isEmpty(variations) && (
                  <>
                    {product_is_available ? (
                      <span className="text-sm font-medium text-[#ff6501]">
                        {t('text-left-item')}
                      </span>
                    ) : (
                      <div className="text-base text-brand-danger whitespace-nowrap">
                        {t('text-out-stock')}
                      </div>
                    )}
                  </>
                )}

                {!isEmpty(selectedVariation) && (
                  <span className="text-sm font-medium text-[#fe4800]">
                    {selectedVariation?.is_disable ||
                    selectedVariation.quantity === 0
                      ? t('text-out-stock')
                      : `${
                          t('text-only') +
                          ' ' +
                          selectedVariation.quantity +
                          ' ' +
                          t('text-left-item')
                        }`}
                  </span>
                )}
              </div>

              <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
                <Counter
                  variant="single"
                  value={selectedQuantity}
                  onIncrement={() => setSelectedQuantity((prev) => prev + 1)}
                  onDecrement={() =>
                    setSelectedQuantity((prev) => (prev !== 1 ? prev - 1 : 1))
                  }
                  disabled={
                    isInCart(item.id)
                      ? getItemFromCart(item.id).quantity + selectedQuantity >=
                        Number(item.stock)
                      : selectedQuantity >= Number(item.stock)
                  }
                  lang={lang}
                />
                <Button
                  onClick={addToCart}
                  className="w-full px-1.5"
                  disabled={!isSelected || !product_is_available}
                  loading={addToCartLoader}
                >
                  <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                  {t('text-add-to-cart')}
                </Button>
                <div className="flex flex-row gap-4 w-full">
                  {isAuthorized && (
                    <Button
                      variant="border"
                      onClick={() => handleAddToWishlist(product_id)}
                      loading={addToWishlistLoader}
                      className={`group hover:text-brand w-full ${
                        favorite === true && 'text-brand'
                      }`}
                    >
                      {favorite === true ? (
                        <IoIosHeart className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all" />
                      ) : (
                        <IoIosHeartEmpty className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      )}

                      {t('text-wishlist')}
                    </Button>
                  )}

                  <div className="relative group w-full">
                    <Button
                      variant="border"
                      className={`w-full hover:text-brand ${
                        shareButtonStatus === true && 'text-brand'
                      }`}
                      onClick={handleChange}
                    >
                      <IoArrowRedoOutline className="text-2xl md:text-[26px] ltr:mr-2 rtl:ml-2 transition-all group-hover:text-brand" />
                      {t('text-share')}
                    </Button>
                    <SocialShareBox
                      className={`absolute z-10 ltr:right-0 rtl:left-0 w-[300px] md:min-w-[400px] transition-all duration-300 ${
                        shareButtonStatus === true
                          ? 'visible opacity-100 top-full'
                          : 'opacity-0 invisible top-[130%]'
                      }`}
                      shareUrl={productUrl}
                      lang={lang}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-6 xl:pt-8 pb-12">
                <Heading className="mb-3 lg:mb-3.5">
                  {t('text-product-details')}:
                </Heading>
                <Text variant="small">
                  {/* {description.split(' ').slice(0, 40).join(' ')} */}
                  <span
                    className="line-clamp-1"
                    dangerouslySetInnerHTML={{ __html: product_desc }}
                  />
                  {'...'}
                  <Link
                    href={`/${lang}${
                      ROUTES.PRODUCTS
                    }/${product_id}.${convertToSlug(product_name)}`}
                    onClick={navigateToProductPage}
                  >
                    <span
                      role="button"
                      className="text-brand ltr:ml-0.5 rtl:mr-0.5"
                    >
                      {t('text-read-more')}
                    </span>
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
