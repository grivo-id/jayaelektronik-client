import { productPlaceholder } from '@assets/placeholders';
import Image from 'next/image';

type Props = {
  intro: {
    imageUrl: string;
  };

  lang: Function;
};

export default function Introduction({ intro, lang }: Props) {
  return (
    <div className="flex flex-wrap justify-center items-start gap-4 px-4">
      <div className="">
        <Image
          src={intro.imageUrl || productPlaceholder}
          alt={'About-Introduction-Image'}
          width={640}
          height={426}
          quality={100}
          className="w-full h-full object-cover aspect-video bg-skin-thumbnail rounded-sm"
        />
      </div>
      <div className="max-w-[640px] flex flex-col gap-2">
        <span className="font-semibold text-lg pb-2">
          {lang('intro-welcome')}
        </span>
        <span
          className="text-brand-muted"
          dangerouslySetInnerHTML={{ __html: lang('intro1') }}
        />

        <span
          className="text-brand-muted"
          dangerouslySetInnerHTML={{ __html: lang('intro2') }}
        />
      </div>
    </div>
  );
}
