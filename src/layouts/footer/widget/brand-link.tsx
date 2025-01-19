import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import { useTranslation } from 'src/app/i18n/client';

type Brand = {
  brand_id: string | number;
  brand_name: string;
  brand_image: string;
  brand_is_show: true;
  brand_created_date: Date | string;
};

interface Props {
  className?: string;
  lang: string;
  data: Brand[];
  header?: string;
}

const BrandLink: React.FC<Props> = ({ lang, className, data, header }) => {
  const { t } = useTranslation(lang, 'footer');

  return (
    <div className={`${className}`}>
      <Heading
        variant="mediumHeading"
        className="text-base mb-4 sm:mb-5 lg:mb-6 pb-0.5"
      >
        {header}
      </Heading>

      <div className="text-sm lg:text-14px flex flex-col space-y-3">
        {data?.map((brand) => (
          <li
            key={`widget-list--key${brand.brand_id}`}
            className="flex items-baseline"
          >
            <Link
              href={``}
              className="transition-colors duration-200 hover:text-brand"
            >
              <span className="truncate">{brand.brand_name}</span>
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default BrandLink;
