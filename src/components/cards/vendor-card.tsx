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
  operationWeekday: string;
  operationWeekend: string;
  operationWeekdayEn: string;
  operationWeekendEn: string;
  slug?: string;
  imageUrl: string;
  map?: string;
};

type VendorCardProps = {
  lang: string;
  shop: Shop;
  index: number;
};

const VendorCard: React.FC<VendorCardProps> = ({ lang, shop, index }) => {
  const { t } = useTranslation(lang);
  const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
  const {
    name,
    operationWeekday,
    operationWeekend,
    operationWeekdayEn,
    operationWeekendEn,
    address,
    imageUrl,
    map,
  } = shop;

  const mapNav = () => {
    window.open(map || '');
  };

  const opWeekday = lang === 'ina' ? operationWeekday : operationWeekdayEn;
  const opWeekend = lang === 'ina' ? operationWeekend : operationWeekendEn;

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
        <div className="max-w-xl w-full flex flex-col justify-center items-center gap-4 py-4 px-4 md:px-0">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0">
            {name}
          </h2>
          <div className="text-center flex flex-col gap-1 text-brand-dark">
            <p className="">{address}</p>
            <span className="text-sm">{opWeekday}</span>
            <span className="text-sm">{opWeekend}</span>
          </div>

          <button
            onClick={mapNav}
            className="bg-brand px-4 py-2.5 rounded-md text-white shadow-sm  hover:opacity-80 duration-200 ease-in-out"
          >
            See on Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
