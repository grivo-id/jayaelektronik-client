'use client';

import Link from 'next/link';
import Logo from '@components/ui/logo';
import Text from '@components/ui/text';
import Image from '@components/ui/image';
import { ROUTES } from '@utils/routes';
import { useTranslation } from 'src/app/i18n/client';
import { useRouter } from 'next/navigation';
import { getDirection } from '@utils/get-direction';

interface AboutProps {
  lang: string;
  className?: string;
  social?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const WidgetAbout: React.FC<AboutProps> = ({ lang, social, className }) => {
  const { t } = useTranslation(lang, 'footer');
  const { locale } = useRouter();
  const dir = getDirection(locale);

  return (
    <div className={`pb-10 sm:pb-0 ${className}`}>
      <div className="text-sm max-w-[350px]  sm:ms-0 pb-2">
        <div className="w-48">
          <Logo href={ROUTES.HOME} className="mb-3 lg:mb-6 mx-auto sm:ms-0" />
        </div>

        <div
          className={` bg-no-repeat  min-h-[60px] mb-5 flex flex-row gap-4 ${
            dir === 'rtl' ? 'pr-16 xl:pr-20 bg-right' : 'ps-0 '
          }`}
        >
          <div>
            <HotlineSvg />
          </div>
          <div className='block'>
            <p className="text-black mb-0">{t('text-hotline')}</p>
            <p className="text-brand text-lg duration-200 hover:text-[#fe4800]">
              {t('link-phone')}
            </p>
          </div>
        </div>
        {/* <div className="mb-3">
          {t('text-address')} {t('link-address')}
        </div> */}
        <div className="mb-3">
          {t('text-email')} {t('link-email')}
        </div>
      </div>

      {social && (
        <ul className="flex flex-wrap  space-x-4 md:space-s-5 mx-auto md:mx-0">
          {social?.map((item) => (
            <li
              className="transition hover:opacity-80"
              key={`social-list--key${item.id}`}
            >
              <Link href={item.path ? item.path : '/#'} legacyBehavior>
                <a target="_blank" rel="noreferrer">
                  <Image
                    src={item.image}
                    alt={item.name}
                    height={item.height}
                    width={item.width}
                    className="transform scale-85 md:scale-100"
                    style={{ width: 'auto' }}
                  />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WidgetAbout;

function HotlineSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff6501"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-headset"
    >
      <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z" />
      <path d="M21 16v2a4 4 0 0 1-4 4h-5" />
    </svg>
  );
}
