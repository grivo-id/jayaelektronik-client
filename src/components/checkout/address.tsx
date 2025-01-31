import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';
import { useUI } from '@contexts/ui.context';
import { useCallback, useEffect, useState } from 'react';
import http from '@framework/utils/http';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { useModalAction } from '@components/common/modal/modal.context';

type Props = {
  lang: string;
};

const AddressPage: React.FC<Props> = ({ lang }) => {
  const { user, shippingAddress, setShippingAddress } = useUI();
  const isLoading = false;
  const { closeModal } = useModalAction();

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
  }, [fetchUserAdresses, user]);

  return !isLoading ? (
    <AddressGrid address={shippingAddress} lang={lang} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;

// const address = [
//   {
//     id: 1,
//     title: 'Home',
//     default: true,
//     address: {
//       lat: 1.357334,
//       lng: 103.821417,
//       formatted_address:
//         'Acme Widgets 123 Widget Street Acmeville, AC 12345 United States of America',
//     },
//   },
//   {
//     id: 2,
//     title: 'Office',
//     default: false,
//     address: {
//       lat: 51.522379,
//       lng: -0.09913,
//       formatted_address:
//         'Acme Widgets 890 Widget Street Acmeville, AC 213 United States of America.',
//     },
//   },
// ];
