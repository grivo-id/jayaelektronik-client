'use client';

import { useEffect, useState } from 'react';
import Button from '@components/ui/button';
import Counter from '@components/ui/counter';
import { useParams } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import useWindowSize from '@utils/use-window-size';
import { getVariations } from '@framework/utils/get-variations';
import usePrice from '@framework/product/use-price';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ThumbnailCarousel from '@components/ui/carousel/thumbnail-carousel';
import Image from '@components/ui/image';
import CartIcon from '@components/icons/cart-icon';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { footer } from '../../layouts/footer/data';
import { IoArrowRedoOutline } from 'react-icons/io5';
import SocialShareBox from '@components/ui/social-share-box';
import ProductDetailsTab from '@components/product/product-details/product-tab';
import isEqual from 'lodash/isEqual';
import { useTranslation } from 'src/app/i18n/client';
import { useProductDetailQueryByProdId } from '@framework/product/get-product-detail';
import { usePromoCountdown } from '@utils/use-promo-countdown';
import { useUI } from '@contexts/ui.context';
import { useCreateWishlist } from '@framework/wishlist/add-to-wishlist';
import { useIsProductOnWishlistQuery } from '@framework/wishlist/check-is-wishlist';
import { useDeleteWishlist } from '@framework/wishlist/delete-wishlist';
import SingleProductLoader from './single-product-loader';
import SingleProductNotFound from './single-product-not-found';

const ProductSingleDetails: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const { product_tags, setProdTag, isAuthorized } = useUI();
  const pathname = useParams();
  const { slug }: any = pathname;
  const [productId, productNameWithHyphens] = slug.split('.');
  const { width } = useWindowSize();
  const { data, isLoading } = useProductDetailQueryByProdId({
    product_id: productId,
  });
  const {
    data: isWishlistAvailableData,
    isLoading: isWishlistAvailableLoading,
    error,
  } = useIsProductOnWishlistQuery(
    {
      product_id: productId,
    },
    isAuthorized
  );
  const { mutate: saveToWishlist, isLoading: isWishlistLoading } =
    useCreateWishlist();

  const { mutate: deleteWishlist, isLoading: deleteWishlistLoading } =
    useDeleteWishlist();

  const { addItemToCart, isInCart, getItemFromCart, isInStock } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
  const [favorite, setFavorite] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(1);
  const [addToCartLoader, setAddToCartLoader] = useState<boolean>(false);
  const [addToWishlistLoader, setAddToWishlistLoader] =
    useState<boolean>(false);
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);
  const productUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.PRODUCT}/${pathname.slug}`;

  const product = data?.data;
  const gallery = [
    product?.product_image1,
    product?.product_image2,
    product?.product_image3,
  ];
  // console.log(product);
  const isValidPromoDate = usePromoCountdown(product?.product_promo);
  const { price, basePrice, discount } = usePrice(
    product && {
      amount: product?.sale_price
        ? product?.sale_price
        : product?.product_price,
      baseAmount: product?.product_price,
      currencyCode: 'IDR',
    }
  );

  const { price: promoPrice } = usePrice({
    amount: product?.product_promo?.product_promo_final_price ?? 0,
    currencyCode: 'IDR',
  });

  useEffect(() => {
    if (product?.product_tags) {
      setProdTag(product.product_tags);
    }
  }, [product]);

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

  const { payment } = footer;
  const handleChange = () => {
    setShareButtonStatus(!shareButtonStatus);
  };
  if (isLoading) return <SingleProductLoader />;
  if (!isLoading && !product) return <SingleProductNotFound lang={lang} />;
  // const variations = getVariations(product?.variations);
  const variations = getVariations([]);

  const isSelected = !isEmpty(variations)
    ? !isEmpty(attributes) &&
      Object.keys(variations).every((variation) =>
        attributes.hasOwnProperty(variation)
      )
    : true;
  let selectedVariation: any = {};
  if (isSelected) {
    const dataVaiOption: any = product?.variation_options;
    selectedVariation = dataVaiOption?.find((o: any) =>
      isEqual(
        o.options.map((v: any) => v.value).sort(),
        Object.values(attributes).sort()
      )
    );
  }
  const item = generateCartItem(product!, selectedVariation, isValidPromoDate);
  const outOfStock = isInCart(item.id) && !isInStock(item.id);
  function addToCart() {
    if (!isSelected) return;
    // to show btn feedback while product carting
    setAddToCartLoader(true);
    setTimeout(() => {
      setAddToCartLoader(false);
    }, 1500);

    const item = generateCartItem(
      product!,
      selectedVariation,
      isValidPromoDate
    );
    addItemToCart(item, selectedQuantity);
    toast('Added to the bag', {
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

  return (
    <div className="pt-6 pb-2 md:pt-7">
      <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8">
        <div className="col-span-5 mb-6 overflow-hidden  md:mb-8 lg:mb-0">
          {!!gallery?.length ? (
            <ThumbnailCarousel
              gallery={gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[880px]"
              galleryClassName="xl:w-[100px] 2xl:w-[120px]"
              lang={lang}
            />
          ) : (
            <div className="flex items-center justify-center w-auto">
              <Image
                src={product?.product_image1 ?? '/product-placeholder.svg'}
                alt={product?.product_name!}
                width={900}
                height={680}
                style={{ width: 'auto' }}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col col-span-5 shrink-0 xl:ltr:pl-2 xl:rtl:pr-2">
          <div className="pb-4 lg:pb-8">
            <div className="md:mb-2.5 block -mt-1.5">
              <h2 className="text-lg font-medium transition-colors duration-300 text-brand-dark md:text-xl xl:text-2xl">
                {product?.product_name}
              </h2>
            </div>

            {isEmpty(variations) && (
              <div className="flex items-center mt-5">
                {product?.product_promo?.product_promo_is_discount &&
                isValidPromoDate ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-brand font-medium text-base md:text-xl xl:text-[30px]">
                        {promoPrice}
                      </span>
                      {product?.product_promo
                        ?.product_promo_discount_percentage > 0 && (
                        <span className="inline-block rounded font-bold text-xs md:text-sm bg-rose-500 bg-opacity-20 text-rose-500 uppercase px-2 py-1 ltr:ml-2.5 rtl:mr-2.5">
                          {
                            product?.product_promo
                              ?.product_promo_discount_percentage
                          }
                          % {t('text-off')}
                        </span>
                      )}
                    </div>
                    <del className="text-sm text-opacity-50 md:text-15px ltr:pl-0 rtl:pr-3 text-brand-dark ">
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

          <dl className="productView-info  text-[14px] leading-8 pb-5 mb-5 border-b border-border-base">
            <dt className={`productView-info-name w-40 float-left`}>
              {t('text-sku')}:
            </dt>
            <dd className="productView-info-value">{product?.product_code}</dd>
            <dt className={`productView-info-name w-40 float-left`}>
              {t('text-brand')}:
            </dt>
            <dd className="productView-info-value">{product?.brand_name}</dd>

            <dt className={`productView-info-name w-40 float-left`}>
              {t('text-sub-category')}:
            </dt>
            <dd className="productView-info-value" data-product-weight="">
              {product?.product_subcategory_name}
            </dd>
            <dt className={`productView-info-name w-40 float-left`}>
              {t('text-shipping')}:
            </dt>
            <dd className="productView-info-value">
              {t(`text-calculated-checkout`)}
            </dd>
            {/* <dt className={`productView-info-name w-40 float-left`}>
              {t('text-amountsold')}:
            </dt>
            <dd className="productView-info-value">
              {product?.product_item_sold}
            </dd> */}
          </dl>

          <div className="pb-2">
            {/* check that item isInCart and place the available quantity or the item quantity */}
            {isEmpty(variations) && (
              <>
                {product?.product_is_available ? (
                  <span className="text-sm font-medium text-yellow">
                    {t('text-left-item')}
                  </span>
                ) : (
                  <div className="text-base text-red-500 whitespace-nowrap">
                    {t('text-out-stock')}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="pt-1.5 lg:pt-3 xl:pt-4 space-y-2.5 md:space-y-3.5">
            {product?.product_is_available && (
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
            )}

            <div className="flex flex-col md:flex-row gap-2.5">
              <Button
                onClick={addToCart}
                className="flex-auto w-full px-1.5"
                disabled={!isSelected || !product?.product_is_available}
                loading={addToCartLoader}
              >
                <CartIcon color="#ffffff" className="ltr:mr-3 rtl:ml-3" />
                {t('text-add-to-cart')}
              </Button>
              {isAuthorized && (
                <Button
                  variant="border"
                  onClick={() => handleAddToWishlist(productId)}
                  loading={addToWishlistLoader}
                  className={`w-full md:w-96 group hover:text-brand ${
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

              <div className="w-full md:w-80 relative group">
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

          <div className="pt-5 xl:pt-8 flex items-center justify-end gap-2">
            <span className="relative inline-flex items-center justify-center text-sm  text-brand-dark text-opacity-80">
              {t('text-tags')}:
            </span>
            {product?.product_tags?.map((tag, index) => (
              <span
                key={tag.product_tag_id}
                className="uppercase text-sm bg-gray-100 px-2 py-1 rounded-md shadow text-brand-dark "
              >
                {tag.product_tag_name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <ProductDetailsTab lang={lang} product_desc={product?.product_desc} />
    </div>
  );
};

export default ProductSingleDetails;
