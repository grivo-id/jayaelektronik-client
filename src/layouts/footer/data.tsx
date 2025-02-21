export const footer = {
  widgets: [
    {
      id: 1,
      widgetTitle: 'widget-title-about',
      lists: [
        {
          id: 1,
          title: 'link-about-us',
          path: '/about-us',
        },
        {
          id: 2,
          title: 'link-contact-us',
          path: '/contact-us',
        },
        // {
        //   id: 3,
        //   title: 'link-about-team',
        //   path: '/privacy',
        // },
        {
          id: 3,
          title: 'link-terms',
          path: '/terms',
        },

        {
          id: 4,
          title: 'link-faq',
          path: '/faq',
        },
      ],
    },
    {
      id: 2,
      widgetTitle: 'widget-title-acc',
      lists: [
        {
          id: 1,
          title: 'link-signin',
          path: '/signin',
        },
        {
          id: 2,
          title: 'link-signup',
          path: '/signup',
        },
        {
          id: 3,
          title: 'link-account',
          path: '/my-account/account-settings',
        },
        {
          id: 4,
          title: 'link-myoder',
          path: '/my-account/orders',
        },
        {
          id: 5,
          title: 'link-wishlist',
          path: '/my-account/wishlist',
        },
        {
          id: 6,
          title: 'link-checkout',
          path: '/checkout',
        },
      ],
    },
  ],
  payment: [
    {
      id: 1,
      path: '/',
      image: '/assets/images/payment/mastercard.svg',
      name: 'payment-master-card',
      width: 30,
      height: 20,
    },
    {
      id: 2,
      path: '/',
      image: '/assets/images/payment/visa.svg',
      name: 'payment-visa',
      width: 40,
      height: 20,
    },
    {
      id: 3,
      path: '/',
      image: '/assets/images/payment/paypal.svg',
      name: 'payment-paypal',
      width: 45,
      height: 32,
    },
    {
      id: 4,
      path: '/',
      image: '/assets/images/payment/discover.svg',
      name: 'payment-discover',
      width: 57,
      height: 25,
    },
    {
      id: 5,
      path: '/',
      image: '/assets/images/payment/american_logo.svg',
      name: 'payment-american',
      width: 45,
      height: 25,
    },
  ],
  social: [
    {
      id: 1,
      path: 'https://www.facebook.com/profile.php?id=100008667818696&mibextid=ZbWKwL',
      image: '/assets/images/social/facebook.svg',
      name: 'facebook',
      width: 20,
      height: 20,
    },
    {
      id: 2,
      path: 'https://www.instagram.com/jayaelektronik_jpr/?hl=en',
      image: '/assets/images/social/instagram.svg',
      name: 'instagram',
      width: 20,
      height: 20,
    },
    // {
    //   id: 3,
    //   path: 'https://twitter.com/',
    //   image: '/assets/images/social/twitter.svg',
    //   name: 'twitter',
    //   width: 20,
    //   height: 20,
    // },

    // {
    //   id: 4,
    //   path: 'https://www.youtube.com/',
    //   image: '/assets/images/social/youtube.svg',
    //   name: 'youtube',
    //   width: 20,
    //   height: 20,
    // },
  ],
};
