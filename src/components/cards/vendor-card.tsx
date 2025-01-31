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
};

const VendorCard: React.FC<VendorCardProps> = ({ lang, shop }) => {
  const { t } = useTranslation(lang);
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const { name, slug, address, imageUrl } = shop;
  return (
    <div className="relative flex flex-col gap-4 items-center px-5 py-5 transition-all bg-white border rounded-lg cursor-pointer xl:px-7 xl:py-7 border-border-base shadow-vendorCard ">
      <div className="relative flex items-center justify-center w-56 h-56 overflow-hidden rounded-lg shrink-0 bg-fill-thumbnail aspect-square">
        <Image
          alt={t('common:text-logo')}
          src={imageUrl ?? placeholderImage}
          width={500}
          height={500}
          className="object-cover aspect-square"
        />
      </div>

      <div className="flex flex-col text-center">
        <Heading variant="mediumHeading" className="pb-1.5">
          {name}
        </Heading>
        <Text className="xl:leading-6">{address}</Text>
      </div>
    </div>
  );
};

export default VendorCard;
