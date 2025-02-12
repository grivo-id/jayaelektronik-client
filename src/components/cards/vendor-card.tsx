import Link from '@components/ui/link';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import Heading from '@components/ui/heading';
import Text from '@components/ui/text';
import { useTranslation } from 'src/app/i18n/client';

type Shop = {
  id: string | number;
  address: string;
  phone: string | number;
  name: string;
  slug?: string;
  imageUrl: string;
};

type VendorCardProps = {
  lang: string;
  shop: Shop;
  index: number;
};

const VendorCard: React.FC<VendorCardProps> = ({ lang, shop, index }) => {
  const { t } = useTranslation(lang);
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const { name, slug, address, imageUrl } = shop;

  const mapNav = () => {
    window.open('https://maps.app.goo.gl/upummRANJ3cR3HC46');
  };

  return (
    <div
      className={`w-full ${(index + 1) % 2 === 0 ? 'bg-muted' : 'bg-none'} `}
    >
      <div
        className={`max-w-[72rem] mx-auto flex flex-col ${
          (index + 1) % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
        } gap-4 md:gap-10 w-full`}
      >
        <div className="max-w-xl w-full ">
          <Image
            alt={t('common:text-logo')}
            src={imageUrl ?? placeholderImage}
            width={1300}
            height={1300}
            className="object-cover aspect-square "
          />
        </div>
        <div className="max-w-xl w-full flex flex-col justify-center items-center gap-4 px-4 md:px-0">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
            {name}
          </h2>
          <Text className="xl:leading-6 mt-2">{address}</Text>
          <button onClick={mapNav} className='bg-brand px-4 py-2.5 rounded-md text-white shadow-sm'>See on Google Maps</button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
