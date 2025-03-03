import { ILFlag } from '@components/icons/language/ILFlag';
import { SAFlag } from '@components/icons/language/SAFlag';
import { CNFlag } from '@components/icons/language/CNFlag';
import { USFlag } from '@components/icons/language/USFlag';
import { DEFlag } from '@components/icons/language/DEFlag';
import { ESFlag } from '@components/icons/language/ESFlag';
import siteLogo from 'public/assets/images/logo.png';
import siteLogoBlack from 'public/assets/images/logo-black.png';
import { IDFlag } from '@components/icons/language/IDFlag';

export const siteSettings = {
  name: 'Jayaelektronik',
  description: 'Best Online Electronic Store in Jayapura, Papua',
  author: {
    name: 'Grivo.id',
    websiteUrl: '#',
    address: '',
  },
  logo: {
    url: siteLogo,
    urlReverse: siteLogo,
    alt: 'JayaElektronik',
    href: '/ina',
    width: 195,
    height: 26,
  },
  defaultLanguage: 'ina',
  currencyCode: 'IDR',
  site_header: {
    topmenu: [
      {
        id: 1,
        path: '/my-account/wishlist/',
        label: 'menu-wishlists',
      },
      {
        id: 2,
        path: '/checkout/',
        label: 'menu-checkout',
      },
    ],
    menu: [
      {
        id: 1,
        path: '/',
        label: 'main-menu',
      },
      {
        id: 2,
        path: '/products',
        label: 'menu-catalog',
      },
      {
        id: 3,
        path: '/brands',
        label: 'menu-brands',
      },

      {
        id: 4,
        path: '/shops',
        label: 'menu-shops',
      },
      {
        id: 5,
        path: '/blog',
        label: 'menu-blog-list',
      },
      {
        id: 6,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 7,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 8,
        path: '/faq',
        label: 'menu-faq',
      },
      // {
      //   id: 10,
      //   path: '/terms',
      //   label: 'menu-terms-condition',
      // },
    ],
    languageMenu: [
      {
        id: 'ina',
        name: 'Indonesia',
        value: 'ina',
        icon: <IDFlag />,
      },
      {
        id: 'en',
        name: 'English',
        value: 'en',
        icon: <USFlag />,
      },
    ],
    pagesMenu: [
      {
        id: 1,
        path: '/search',
        label: 'menu-best-deals',
      },
      {
        id: 2,
        path: '/about-us',
        label: 'menu-about-us',
      },
      {
        id: 3,
        path: '/contact-us',
        label: 'menu-contact-us',
      },
      {
        id: 4,
        path: '/faq',
        label: 'menu-faq',
      },
    ],
  },
};
