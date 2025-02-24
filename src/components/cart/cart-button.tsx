import CartIcon from '@components/icons/cart-icon';
import { useCart } from '@contexts/cart/cart.context';
import { useUI } from '@contexts/ui.context';
import { useTranslation } from 'src/app/i18n/client';
import cn from 'classnames';

type CartButtonProps = {
  lang: string;
  className?: string;
  iconClassName?: string;
  hideLabel?: boolean;
  // isShowing?: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({
  lang,
  className,
  iconClassName = 'text-brand w-6 h-6',
  hideLabel,
  // isShowing,
}) => {
  const { t } = useTranslation(lang, 'common');
  const { openDrawer, setDrawerView } = useUI();
  const { totalItems } = useCart();
  function handleCartOpen() {
    setDrawerView('CART_SIDEBAR');
    // isShowing;
    return openDrawer();
  }

  return (
    <button
      className={cn(
        'flex items-center justify-center shrink-0 h-auto focus:outline-none transform',
        className
      )}
      onClick={handleCartOpen}
      aria-label="cart-button"
    >
      <div className="relative flex items-center">
        <div className="flex items-center relative ">
          <CartIcon className={cn(iconClassName)} />
          <span className=" absolute  -top-2 -left-2.5  min-w-[20px] min-h-[20px] p-0.5 rounded-[20px] flex items-center justify-center bg-brand text-brand-light text-10px">
            {totalItems}
          </span>
        </div>
        {!hideLabel && (
          <span className="text-sm font-normal text-black ltr:ml-2 rtl:mr-2">
            {t('text-cart')}
          </span>
        )}
      </div>
    </button>
  );
};

export default CartButton;
