'use client';

import Link from 'next/link';
import usePrice from '@framework/product/use-price';
import cn from 'classnames';
import { useCart } from '@contexts/cart/cart.context';
import Text from '@components/ui/text';
import Button from '@components/ui/button';
import { CheckoutItem } from '@components/checkout/checkout-card-item';
import { CheckoutCardFooterItem } from './checkout-card-footer-item';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useIsMounted } from '@utils/use-is-mounted';
import { useEffect, useState } from 'react';
import SearchResultLoader from '@components/ui/loaders/search-result-loader';
import { redirectToWhatsAppCart } from '@utils/wa-redirect';
import { useUI } from '@contexts/ui.context';
import { useCreateOrderMutation } from '@framework/checkout/use-order';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
import ErrorIcon from '@components/icons/error-icon';

type Props = {
  lang: string;
};

const CheckoutCard: React.FC<Props> = ({ lang }) => {
  const { t } = useTranslation(lang, 'common');
  const router = useRouter();
  const { width } = useWindowSize();
  const [isLoading, setLoading] = useState(true);
  const { mutateAsync: createOrder, isLoading: submitting } =
    useCreateOrderMutation();
  const { checkOutFormData, user } = useUI();
  const { resetCart } = useCart();

  useEffect(() => {
    setLoading(false);
  }, []);
  const { items, total, isEmpty } = useCart();
  // console.log('item', items, total);
  const { price: subtotal } = usePrice({
    amount: total,
    currencyCode: 'IDR',
  });
  async function orderHeader() {
    const cartString = localStorage.getItem('razor-cart');
    const storedCart = JSON.parse(JSON.parse(cartString || '{"items":[]}'));
    const defaultAddress = JSON.parse(
      sessionStorage.getItem('default_address') || '{}'
    );
    if (!isEmpty) {
      try {
        const response = await createOrder({
          order_email: checkOutFormData.user_email,
          order_fname: checkOutFormData.user_fname,
          order_lname: checkOutFormData.user_lname,
          order_phone: checkOutFormData.user_phone,
          order_address: defaultAddress.shipping_address_desc,
          order_user_verified: user ? true : false,
          products: storedCart.items.map((item: any) => ({
            product_id: item.id,
            product_qty: item.quantity,
          })),
        });
        if (response.success) {
          toast('Order success!', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          resetCart();
          redirectToWhatsAppCart(checkOutFormData);
        }
      } catch (error: any) {
        toast.error(error.message || 'An unexpected error occurred', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: <ErrorIcon />,
        });
      }
    }
  }
  const checkoutFooter = [
    {
      id: 1,
      name: t('text-sub-total'),
      price: subtotal,
    },
    {
      id: 2,
      name: t('text-shipping'),
      price: '0',
    },
    {
      id: 3,
      name: t('text-total'),
      price: subtotal,
    },
  ];
  const mounted = useIsMounted();
  return (
    <>
      <div className="px-4 pt-4 border rounded-md border-border-base text-brand-light xl:py-6 xl:px-7">
        <div className="flex pb-2 text-sm font-semibold rounded-md text-heading">
          <span className="font-medium text-15px text-brand-dark">
            {t('text-product')}
          </span>
          <span className="font-medium ltr:ml-auto rtl:mr-auto shrink-0 text-15px text-brand-dark">
            {t('text-sub-total')}
          </span>
        </div>
        {isLoading ? (
          <div className="w-full">
            <SearchResultLoader uniqueKey={`product-key`} />
          </div>
        ) : !isEmpty && mounted ? (
          items.map((item) => <CheckoutItem item={item} key={item.id} />)
        ) : (
          <p className="py-4 text-brand-danger text-opacity-70">
            {t('text-empty-cart')}
          </p>
        )}
        {mounted &&
          checkoutFooter.map((item: any) => (
            <CheckoutCardFooterItem item={item} key={item.id} />
          ))}
        <Button
          variant="formButton"
          className={cn(
            'w-full mt-8 mb-5 rounded font-semibold px-4 py-3 transition-all',
            mounted && isEmpty
              ? 'opacity-40 cursor-not-allowed'
              : '!bg-brand !text-brand-light'
          )}
          loading={submitting}
          onClick={orderHeader}
        >
          {t('button-order-now')}
        </Button>
      </div>
      <Text className="mt-8">
        {t('text-by-placing-your-order')}{' '}
        <Link href={`/${lang}${ROUTES.TERMS}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-terms-of-service')}{' '}
          </a>
        </Link>
        {t('text-and')}{' '}
        <Link href={`/${lang}${ROUTES.PRIVACY}`} legacyBehavior>
          <a className="font-medium underline text-brand">
            {t('text-privacy')}
          </a>
        </Link>
        . {t('text-credit-debit')}
      </Text>
    </>
  );
};

export default CheckoutCard;
