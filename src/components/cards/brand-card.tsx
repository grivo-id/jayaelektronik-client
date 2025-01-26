'use client';

import Link from '@components/ui/link';
import Image from 'next/image';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';

interface BannerProps {
  lang: string;
  brand: any;
  variant?: 'rounded' | 'default';
  effectActive?: boolean;
  className?: string;
  classNameInner?: string;
}

function getImage(deviceWidth: number, imgObj: any) {
  return deviceWidth < 768 ? imgObj.mobile : imgObj.desktop;
}

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const BrandCard: React.FC<BannerProps> = ({
  lang,
  brand,
  className,
  variant = 'default',
  effectActive = true,
  classNameInner,
}) => {
  const { width } = useWindowSize();
  const { brand_name, brand_is_show, brand_image } = brand;
  const selectedImage = getImage(width!, brand_image);
  const slug = convertToSlug(brand_name);
  return (
    <div className={cn('mx-auto', className)}>
      <Link
        href={`/${lang}/search?brand=${slug}`}
        className={cn(
          'h-full w-full group flex justify-center relative overflow-hidden',
          classNameInner
        )}
      >
        {brand_image && (
          <div className="aspect-square flex items-center h-40 w-40">
            <Image
              src={brand_image}
              alt={brand_name || 'brand-image'}
              width={240}
              height={240}
              className="object-cover"
            />
          </div>
        )}

        {effectActive && (
          <div className="absolute top-0 block w-1/2 h-full transform -skew-x-12 ltr:-left-full rtl:-right-full z-5 bg-gradient-to-r from-transparent to-white opacity-30 group-hover:animate-shine" />
        )}
      </Link>
    </div>
  );
};

export default BrandCard;
