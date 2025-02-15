'use client';

import AddressGrid from '@components/address/address-grid';
import { useUI } from '@contexts/ui.context';
import { useAddressQuery } from '@framework/address/address';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import http from '@framework/utils/http';
import { useCallback, useEffect } from 'react';

export default function AddressPageContent({ lang }: { lang: string }) {
  const { user, shippingAddress, setShippingAddress } = useUI();
  const isLoading = false;
  const fetchUserAdresses = useCallback(async () => {
    try {
      const response = await http.get(API_ENDPOINTS.SHIPPING_ADDRESS);
      if (response.status === 200) {
        setShippingAddress(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setShippingAddress]);

  useEffect(() => {
    if (user) {
      fetchUserAdresses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <>
      {!isLoading ? (
        <AddressGrid address={shippingAddress} lang={lang} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
