import Counter from '@components/ui/counter';
import { useCart } from '@contexts/cart/cart.context';
import { generateCartItem } from '@utils/generate-cart-item';
import PlusIcon from '@components/icons/plus-icon';
import useWindowSize from '@utils/use-window-size';
import { useTranslation } from 'src/app/i18n/client';
import { usePromoCountdown } from '@utils/use-promo-countdown';

interface Props {
  lang: string;
  data: any;
  variation?: any;
  disabled?: boolean;
  variant?: any;
}
const AddToCart = ({
  lang,
  data,
  variation,
  disabled,
  variant = 'mercury',
}: Props) => {
  const { width } = useWindowSize();
  const { t } = useTranslation(lang, 'common');
  const {
    addItemToCart,
    removeItemFromCart,
    isInStock,
    getItemFromCart,
    isInCart,
  } = useCart();
  const isValidPromoDate = usePromoCountdown(data?.product_promo)
  const item = generateCartItem(data!, variation, isValidPromoDate);
  // console.log('passed data ', data)
  // console.log('item', item)
  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    e.stopPropagation(); 
    e.preventDefault(); 
    addItemToCart(item, 1); 
  };
  const handleRemoveClick = (e: any) => {
    e.stopPropagation();
    removeItemFromCart(item.id);
  };
  const outOfStock = isInCart(item?.id) && !isInStock(item.id);
  const iconSize = width! > 480 ? '19' : '17';

  return !isInCart(item?.id) ? (
    variant === 'cardv2' ? (
      <button
        className="min-w-[150px] min-h-[38px] px-4 py-2 bg-brand text-brand-light rounded text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        {t('text-add-to-cart')}
      </button>
    ) : (
      <button
        className="min-w-[150px] min-h-[38px] px-4 py-2 bg-brand text-brand-light rounded-full text-[13px] items-center justify-center focus:outline-none focus-visible:outline-none"
        aria-label="Count Button"
        onClick={handleAddClick}
        disabled={disabled || outOfStock}
      >
        {t('text-add-to-cart')}
      </button>
    )
  ) : (
    <Counter
      value={getItemFromCart(item.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      disabled={outOfStock}
      className="h-10"
      variant={variant}
      lang={lang}
    />
  );
};

export default AddToCart;
