import Container from '@components/ui/container';
import AccountNav from '@components/my-account/account-nav';
import { ROUTES } from '@utils/routes';
import SettingsIcon from '@components/icons/account-settings';
import OrdersIcon from '@components/icons/account-order';
import WishlistIcon from '@components/icons/account-wishlist';
import MapIcon from '@components/icons/account-address';
import AccountNavMobile from '@components/my-account/account-nav-mobile';
import AuthorizedRouteWrapper from './authorized-wrapper';

const accountMenu = [
  {
    slug: ROUTES.ACCOUNT_SETTING,
    name: 'account-settings',
    icon: <SettingsIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ADDRESS,
    name: 'text-shipping-address',
    icon: <MapIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.ORDERS,
    name: 'text-orders',
    icon: <OrdersIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
  {
    slug: ROUTES.WISHLIST,
    name: 'text-wishlist',
    icon: <WishlistIcon className="w-5 md:w-[22px] h-5 md:h-[22px]" />,
  },
];

export default function AccountLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <AuthorizedRouteWrapper>
      <div className="border-t border-b border-border-base">
        <Container>
          <div className="pt-10 2xl:pt-12 pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 mx-auto">
            <div className="flex flex-col w-full lg:flex-row">
              <div className="lg:hidden">
                <AccountNavMobile options={accountMenu} lang={lang} />
              </div>
              <div className="hidden lg:block flex-shrink-0 w-72 me-7 xl:me-8">
                <AccountNav options={accountMenu} lang={lang} />
              </div>

              <div className="w-full mt-4 lg:mt-0 border border-border-base p-4 sm:p-5 lg:py-8 2xl:py-10 lg:px-9 2xl:px-10 rounded-md">
                {children}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </AuthorizedRouteWrapper>
  );
}
