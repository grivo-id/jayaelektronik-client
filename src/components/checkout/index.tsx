'use client';

import { use, useEffect, useState } from 'react';
import CheckoutCard from './checkout-card';
import CheckoutDetails from './checkout-details';
import { useUI } from '@contexts/ui.context';

const UserCheckOut: React.FC<{ lang: string }> = ({ lang }) => {
  const { user, shippingAddress, setCheckOutFormData, chekOutFormData } =
    useUI();

  useEffect(() => {
    if (chekOutFormData && shippingAddress.length > 0) {
      const defaultAddress = sessionStorage.getItem('default_address');
      if (defaultAddress) {
        sessionStorage.setItem(
          'userDetail',
          JSON.stringify({ chekOutFormData, defaultAddress })
        );
      }
    }
  }, [chekOutFormData, shippingAddress]);

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 grid-cols-1 flex-wrap gap-8">
      <div className="w-full col-start-1 col-end-10">
        <CheckoutDetails lang={lang} />
      </div>
      <div className="w-full mt-7 lg:mt-0 col-start-10 col-end-13">
        <CheckoutCard lang={lang} />
      </div>
    </div>
  );
};

export default UserCheckOut;
