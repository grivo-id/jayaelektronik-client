import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Product } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { Eye } from '@components/icons/eye-icon';
import { useCart } from '@contexts/cart/cart.context';

import { productPlaceholder } from '@assets/placeholders';
import dynamic from 'next/dynamic';
import { useTranslation } from 'src/app/i18n/client';
import { ROUTES } from '@utils/routes';
import Link from '@components/ui/link';
import SearchIcon from '@components/icons/search-icon';
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
  // console.log(variant);
  const { t } = useTranslation(lang, 'common');
  const { id, product_is_available, product_type } = data ?? {};
  const { width } = useWindowSize();
  const { openModal } = useModalAction();
  const { isInCart, isInStock } = useCart();
  const iconSize = width! > 1024 ? '19' : '17';
  const outOfStock = isInCart(id) && !isInStock(id);
  function handlePopupView() {
    openModal('PRODUCT_VIEW', data);
  }
  if (!product_is_available || outOfStock) {
    return (
      <span className="text-[11px] md:text-xs font-medium text-brand-light uppercase inline-block bg-brand-danger rounded px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
        {t('text-out-stock')}
      </span>
    );
  }
  if (product_type === 'variable') {
    return (
      <button
        className="min-w-[150px] min-h-[38px] px-4 py-2 bg-brand rounded text-brand-light text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handlePopupView}
      >
        {t('text-product-details')}
      </button>
    );
  }
  return <AddToCart data={data} variant="cardv2" lang={lang} />;
}
const ProductCardV2: React.FC<ProductProps> = ({
  product,
  className,
  lang,
}) => {
  const {
    product_id,
    product_name,
    product_image1,
    brand_id,
    brand_name,
    product_type,
    product_item_sold,
  } = product ?? {};
  const { openModal } = useModalAction();
  const { t } = useTranslation(lang, 'common');
  const { width } = useWindowSize();
  const iconSize = width! > 1024 ? '20' : '17';
  const { price, basePrice, discount } = usePrice({
    amount: product?.sale_price ? product?.sale_price : product?.product_price,
    baseAmount: product?.product_price,
    currencyCode: 'IDR',
  });
  const { price: minPrice } = usePrice({
    amount: product?.min_price ?? 0,
    currencyCode: 'IDR',
  });
  const { price: maxPrice } = usePrice({
    amount: product?.max_price ?? 0,
    currencyCode: 'IDR',
  });

  function handlePopupView() {
    openModal('PRODUCT_VIEW', product);
  }

  if (!product) {
    return null;
  }

  return (
    <article
      className={cn(
        'flex flex-col product-card-v2 relative card-image--jump h-full',
        className
      )}
      title={product_name}
    >
      <div className="relative flex-shrink-0  mt-4">
        <div className="relative card-img-container overflow-hidden mx-auto w-full h-[180px] md:h-[200px] ">
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
              alt={'Product Image placeholder'}
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
        <div className="w-full h-full absolute top-0  z-10">
          {discount && (
            <span className="text-[10px]  text-skin-inverted uppercase inline-block bg-skin-primary rounded-sm px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
              {t('text-on-sale')}
            </span>
          )}
          <button
            className="buttons--quickview px-4 py-2 bg-brand-light rounded-full hover:bg-brand hover:text-brand-light"
            aria-label="Quick View Button"
            onClick={handlePopupView}
          >
            <SearchIcon width={iconSize} height={iconSize} opacity="1" />
          </button>
        </div>
      </div>

      <div className="flex flex-col mb-2 h-full overflow-hidden text-center relative">
        <div className="text-sm mt-auto leading-6 text-gray-400 mb-1.5">
          {brand_name}
        </div>
        <Link
          href={`/${lang}${ROUTES.PRODUCTS}/${product_id}.${convertToSlug(
            product_name
          )}`}
          className="text-brand-dark text-sm leading-5 min-h-[15px] line-clamp-2 mb-2 hover:text-brand-muted"
        >
          {product_name}
        </Link>

        <div className="flex flex-col mb-2 lg:mb-4">
          <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-brand">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="mx-1 text-sm text-gray-400 text-opacity-70">
              {basePrice}
            </del>
          )}

          <span className="text-sm text-brand-muted">
            {product_item_sold}
            {product_item_sold > 100 ? '+' : ''} {t('text-sold')}
          </span>
        </div>

        <div className="inline-block product-cart-button">
          <RenderPopupOrAddToCart props={{ data: product, lang: lang }} />
        </div>
      </div>
    </article>
  );
};

export default ProductCardV2;
