import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import usePrice from '@framework/product/use-price';
import { usePromoCountdown } from '@utils/use-promo-countdown';

type SearchProductProps = {
  lang: string;
  item: any;
};

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
};

const SearchProduct: React.FC<SearchProductProps> = ({ lang, item }) => {
  const {
    product_id,
    product_name,
    product_image1,
    product_type,
    product_promo,
  } = item ?? {};

  const { price, basePrice } = usePrice({
    amount: item?.sale_price ? item?.sale_price : item?.product_price,
    baseAmount: item?.product_price,
    currencyCode: 'IDR',
  });
  const { price: promoPrice } = usePrice({
    amount: item?.product_promo?.product_promo_final_price ?? 0,
    currencyCode: 'IDR',
  });
  const isValidPromoDate = usePromoCountdown(product_promo);

  const slug = convertToSlug(product_name);

  return (
    <Link
      href={`/${lang}${ROUTES.PRODUCT}/${product_id}.${slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4 aspect-square">
        {product_image1 ? (
          <Image
            src={product_image1 ?? searchProductPlaceholder}
            width={70}
            height={70}
            alt={product_name || 'Product Image'}
            className="object-cover bg-fill-thumbnail"
            style={{ width: 'auto' }}
          />
        ) : (
          <Image
            src={searchProductPlaceholder}
            width={70}
            height={70}
            alt={'Product Image'}
            className="object-cover bg-fill-thumbnail"
            style={{ width: 'auto' }}
          />
        )}
      </div>

      <div className="flex flex-col w-full overflow-hidden">
        <h3 className="truncate text-skin-base text-15px  mb-1.5">
          {product_name}
        </h3>

        {product_promo?.product_promo_is_discount && isValidPromoDate ? (
          <div className="flex flex-col gap-0 items-start justify-start">
            <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-brand">
              {promoPrice}
            </span>
            <div className="flex flex-row gap-1 justify-center items-center">
              <del className="mx-1 text-sm text-gray-400 text-opacity-70">
                {price}
              </del>
              {product_promo.product_promo_discount_percentage > 0 && (
                <span className="text-sm text-rose-500">
                  {product_promo.product_promo_discount_percentage}%
                </span>
              )}
            </div>
          </div>
        ) : (
          <span className="inline-block mx-1 text-sm font-medium sm:text-15px lg:text-base text-brand">
            {price}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SearchProduct;
