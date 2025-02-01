'use client';
import { useTranslation } from 'src/app/i18n/client';

import { intro, personList } from './asset-img';
import Founder from './founder';
import Introduction from './introduction';
import OurVissionMission from './our-vission-mission';
import OurAchievement from './our-achievement';
import OurValue from './our-value';

type Props = {
  lang: string;
};

export default function AboutPageContent({ lang }: Props) {
  const { t } = useTranslation(lang, 'about');

  return (
    <div className="flex flex-col justify-center w-full items-center py-4 md:py-8 gap-4 md:gap-10">
      <Introduction intro={intro} />
      <Founder personList={personList} />
      <div className="flex flex-wrap gap-8 px-4 w-full justify-center items-start">
        <div className="w-full max-w-md flex flex-col text-start gap-4 justify-center">
          <OurVissionMission lang={t} />
        </div>
        <div className="w-full max-w-md flex flex-col text-start gap-4 justify-center">
          <OurValue lang={t} />
        </div>
        <div className="w-full max-w-md flex flex-col text-start gap-4 justify-center">
          <OurAchievement lang={t} />
        </div>
      </div>
    </div>
  );
}
