import { productPlaceholder } from '@assets/placeholders';
import Image from 'next/image';

type Props = {
  intro: {
    imageUrl: string;
  };
};

export default function Introduction({ intro }: Props) {
  return (
    <div className="flex flex-wrap justify-center items-start gap-4 px-4">
      <div className="">
        <Image
          src={intro.imageUrl || productPlaceholder}
          alt={'About-Introduction-Image'}
          width={640}
          height={426}
          quality={100}
          className="w-full h-full object-cover bg-skin-thumbnail"
        />
      </div>
      <div className="max-w-[640px] flex flex-col gap-2">
        <span className="font-semibold text-lg pb-2">Introduction:</span>
        <p className="text-brand-muted">
          Welcome to JayaElektronik, the largest and most trusted electronics
          store in Papua, Indonesia! Since our founding in 2005, we have been
          dedicated to bringing the latest and most innovative electronic
          products to the people of Papua. With over 18 years of experience, we
          take pride in being the go-to destination for all your tech needs.
        </p>
        <p className="text-brand-muted">
          At JayaElektronik, we don’t just sell electronics—we deliver
          experiences. From our competitive prices to our exceptional customer
          service, we strive to make every visit to our store memorable. Thank
          you for choosing JayaElektronik, where technology meets trust!
        </p>
      </div>
    </div>
  );
}
