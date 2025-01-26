import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { ROUTES } from '@utils/routes';
import { searchProductPlaceholder } from '@assets/placeholders';
import usePrice from '@framework/product/use-price';

type SearchProductProps = {
  lang: string;
  item: any;
};

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const SearchProduct: React.FC<SearchProductProps> = ({ lang, item }) => {
  const { product_name, product_image1, product_type } = item ?? {};

  const { price, basePrice } = usePrice({
    amount: item?.sale_price ? item?.sale_price : item?.product_price,
    baseAmount: item?.product_price,
    currencyCode: 'IDR',
  });
  const { price: minPrice } = usePrice({
    amount: item?.min_price ?? 0,
    currencyCode: 'IDR',
  });
  const { price: maxPrice } = usePrice({
    amount: item?.max_price ?? 0,
    currencyCode: 'IDR',
  });

  const slug = convertToSlug(product_name);

  return (
    <Link
      href={`/${lang}${ROUTES.PRODUCT}/${slug}`}
      className="flex items-center justify-start w-full h-auto group"
    >
      <div className="relative flex w-20 rounded-md overflow-hidden flex-shrink-0 cursor-pointer me-4">
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
        <div className="space-x-2 ">
          <span className="inline-block font-semibold text-sm sm:text-15px lg:text-base text-skin-primary">
            {product_type === 'variable' ? `${minPrice} - ${maxPrice}` : price}
          </span>
          {basePrice && (
            <del className="text-sm text-skin-base text-opacity-70">
              {basePrice}
            </del>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SearchProduct;
