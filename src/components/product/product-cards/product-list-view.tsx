import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import SearchIcon from '@components/icons/search-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import dynamic from 'next/dynamic';
import { usePromoCountdown } from '@utils/use-promo-countdown';

const AddToCart = dynamic(() => import('@components/product/add-to-cart'), {
  ssr: false,
});

interface ProductProps {
  lang: string;
  product: Product;
  className?: string;
}

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

function RenderPopupOrAddToCart({ props }: { props: Object }) {
  let { data, lang }: any = props;
  const { t } = useTranslation(lang, 'common');
  const { id, quantity, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const outOfStock = isInCart(id) && !isInStock(id);

  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }

  if (Number(quantity) < 1 || outOfStock) {
    return (
      <span className="w-full text-[14px] text-skin-inverted uppercase inline-block bg-skin-red  px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="w-full min-w-[150px] px-4 py-2 bg-skin-primary text-skin-inverted text-[14px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('text-product-details')}
      </button>
    );
  }
  return <AddToCart data={data} lang={lang} />;
}

const ProductList: React.FC<ProductProps> = ({ product, className, lang }) => {
  const {
    product_id,
    product_name,
    product_image1,
    product_image2,
    product_image3,
    image,
    unit,
    slug,
    brand_name,
    product_promo,
    product_desc,
    product_type,
  } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
  const { price, basePrice } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.product_price,
    baseAmount: product?.product_price,
    currencyCode: 'IDR',
  });
  const { price: promoPrice } = usePrice({
    amount: product?.product_promo?.product_promo_final_price ?? 0,
    currencyCode: 'IDR',
  });
  const isValidPromoDate = usePromoCountdown(product_promo);

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }

  return (
    <article
      className={cn(
        ' product-list-view overflow-hidden relative  grid grid-cols-4  gap-8',
        className
      )}
      title={product_name}
    >
      <div className="col-span-1 relative">
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${product_id}.${convertToSlug(
            product_name
          )}`}
          className="block border border-black/10 hover:border-skin-primary"
        >
          <div className="relative card-img-container overflow-hidden mx-auto w-full max-w-[270px]  h-[180px] md:h-[300px] ">
            {product_image1 ? (
              <Image
                src={product_image1 || productPlaceholder}
                alt={product_name || 'Product Image'}
                quality={100}
                priority
                fill
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                className="object-cover bg-fill-thumbnail"
              />
            ) : (
              <Image
                src={productPlaceholder}
                alt={'Product Image'}
                quality={100}
                priority
                fill
                sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                className="object-cover bg-fill-thumbnail"
              />
            )}
          </div>
        </Link>
        <div className="w-full h-full absolute top-0  z-10">
          {product_promo?.product_promo_is_discount && isValidPromoDate && (
            <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}

          {product_promo?.product_promo_is_best_deal && (
            <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-best-deal')}
            </span>
          )}
        </div>
      </div>

      <div className="col-span-3">
        <div className="text-12px sm:text-sm mt-auto text-gray-400 mb-2">
          {product_name}
        </div>
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${product_id}.${convertToSlug(
            product_name
          )}`}
          className="text-skin-base text-base font-semibold leading-5 min-h-[30px] line-clamp-2 mb-1.5 hover:text-skin-primary"
        >
          {product_name}
        </Link>

        <div className="space-s-2 mb-2">
          {product_promo?.product_promo_is_discount && isValidPromoDate ? (
            <>
              <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
                {promoPrice}
              </span>
              <del className="text-sm text-gray-400 text-opacity-70">
                {price}
              </del>
            </>
          ) : (
            <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
              {price}
            </span>
          )}
        </div>
        <p className="text-sm text-skin-base line-clamp-3 leading-6 text-opacity-80">
          <span dangerouslySetInnerHTML={{ __html: product_desc }} />
        </p>
        <div className="inline-block product-cart-button mt-6">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
        </div>
      </div>
    </article>
  );
};

export default ProductList;
