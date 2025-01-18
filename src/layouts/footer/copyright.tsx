import Image from '@components/ui/image';
import { siteSettings } from '@settings/site-settings';
import { useTranslation } from 'src/app/i18n/client';
import Container from '@components/ui/container';
interface CopyrightProps {
  lang: string;
  variant?: 'default' | 'medium';
  payment?: {
    id: string | number;
    path?: string;
    name: string;
    image: string;
    width: number;
    height: number;
  }[];
}
const year = new Date().getFullYear();
const Copyright: React.FC<CopyrightProps> = ({
  lang,
  payment,
  variant = 'default',
}) => {
  const { t } = useTranslation(lang, 'footer');
  return (
    <div className="border-t border-white/10  pt-5 pb-16 sm:pb-20 md:pb-5 mb-2 sm:mb-0">
      <Container>
        <div className="flex flex-col md:flex-row text-center md:justify-between">
          <p className="text-gray-400 text-sm leading-7 lg:leading-[27px]">
            &copy;&nbsp;{t('text-copyright')} {year}&nbsp;
            <a
              className="transition-colors duration-200 ease-in-out text-brand hover:text-brand-light"
              href={'/'}
            >
              JayaElektronik,
            </a>
            &nbsp; {t('powered-by-grivo')}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Copyright;
