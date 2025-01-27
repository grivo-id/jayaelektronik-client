import { useAddressQuery } from '@framework/address/address';
import AddressGrid from '@components/address/address-grid';

const AddressPage: React.FC<{ lang: string }> = ({ lang }) => {
  //Query Address buat dsni
  const isLoading = false;
  const data: any = address;
  return !isLoading ? (
    <AddressGrid address={data} lang={lang} />
  ) : (
    <div>Loading...</div>
  );
};

export default AddressPage;

const address = [
  {
    id: 1,
    title: 'Home',
    default: true,
    address: {
      lat: 1.357334,
      lng: 103.821417,
      formatted_address:
        'Acme Widgets 123 Widget Street Acmeville, AC 12345 United States of America',
    },
  },
  {
    id: 2,
    title: 'Office',
    default: false,
    address: {
      lat: 51.522379,
      lng: -0.09913,
      formatted_address:
        'Acme Widgets 890 Widget Street Acmeville, AC 213 United States of America.',
    },
  },
];
