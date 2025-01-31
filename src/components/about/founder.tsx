import Image from 'next/image';
import { productPlaceholder } from '@assets/placeholders';

type Person = {
  id: string | number;
  name: string;
  title?: string;
  imageUrl: string;
};

type Props = {
  personList: Person[];
};

export default function Founder({ personList }: Props) {
  return (
    <div className="bg-slate-100 w-full flex flex-wrap justify-center px-4 py-10 md:py-20 items-center gap-4">
      {personList.map((person, index) => (
        <div
          key={`${person.id}-${index}`}
          className="flex flex-col gap-1 items-center"
        >
          <div className="flex h-40 w-40 shrink-0 overflow-hidden rounded-full aspect-square mb-4">
            <Image
              src={person.imageUrl || productPlaceholder}
              alt={`${person.name}-image`}
              width={640}
              height={426}
              quality={100}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-600 text-xl">
            {person.name}
          </span>
          <span className="text-sm opacity-80">{person.title}</span>
        </div>
      ))}
    </div>
  );
}
