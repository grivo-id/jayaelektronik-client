'use client';

import { useSessionStorage } from 'react-use';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import { useAllAnouncerQuery } from '@framework/announcer/get-all-announcer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';



export default function ClientRenderedHighLightedBar() {
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'jaya-highlightedBar',
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

  if (!activeMessages?.length) return <></>;

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
