import Button from '@components/ui/button';
import Link from 'next/link';
import { useTranslation } from 'src/app/i18n/client';

type Props = {
  lang: string;
};

export default function SingleProductNotFound({ lang }: Props) {
  const { t } = useTranslation(lang, 'common');

  return (
    <div className="flex flex-col items-center justify-center min-h-[30rem] text-center px-4 gap-4">
      <h1 className="text-2xl md:text-4xl text-brand-dark font-medium ">
        {t('prod-not-found')}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-8">
        {t('prod-not-found-desc')}
      </p>
      <Button>
        <Link href={`/${lang}/products`}>{t('browse-all-product')}</Link>
      </Button>
    </div>
  );
}
