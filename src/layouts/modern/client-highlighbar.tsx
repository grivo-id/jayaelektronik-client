'use client';

import { useSessionStorage } from 'react-use';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import { useTranslation } from 'src/app/i18n/client';
import { useAllAnouncerQuery } from '@framework/announcer/get-all-announcer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

type Props = {
  lang: string;
};

export default function ClientRenderedHighLightedBar({ lang }: Props) {
  const { t } = useTranslation(lang, 'common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'razor-highlightedBar',
    'false'
  );

  const query = {
    page: 1,
    limit: 25,
    sort: 'desc',
  };
  const { data, isLoading, error } = useAllAnouncerQuery(query);
  // console.log(data?.data);

  if (isLoading) return <></>;

  const activeMessages = data?.data?.filter(
    (toast) => new Date(toast.toast_expired_date) > new Date()
  );

  if (!activeMessages?.length) return null;

  return (
    <>
      {highlightedBar !== 'true' && (
        <HighlightedBar onClose={() => setHighlightedBar('true')}>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={activeMessages.length > 1}
            className="w-full"
          >
            {activeMessages.map((toast) => (
              <SwiperSlide key={toast.toast_id}>
                <div className="flex items-center justify-center gap-2 w-full">
                  <p
                    className="text-center"
                    dangerouslySetInnerHTML={{ __html: toast.toast_message }}
                  />
                  <Countdown date={new Date(toast.toast_expired_date)} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </HighlightedBar>
      )}
    </>
  );
}
