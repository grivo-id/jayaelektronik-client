'use client';

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useSessionStorage } from 'react-use';
import { BsX } from 'react-icons/bs';
import Countdown from '@components/common/countdown';
import { useAllAnouncerQuery } from '@framework/announcer/get-all-announcer';

export default function ClientRenderedHighLightedBar() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    skipSnaps: false,
    align: 'center',
    containScroll: 'trimSnaps',
  });
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

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      clearInterval(autoplay);
    };
  }, [emblaApi]);

  if (isLoading) return <></>;

  const activeMessages = data?.data?.filter(
    (toast) => new Date(toast.toast_expired_date) > new Date()
  );

  if (!activeMessages?.length) return <></>;

  return (
    <>
      {highlightedBar !== 'true' && (
        <div className="relative w-full flex flex-col gap-4  min-h-[40px] ">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex ">
              {activeMessages.map((toast) => (
                <div
                  key={toast.toast_id}
                  className="min-w-full  min-h-[40px] py-2 px-2 text-sm flex items-center justify-center bg-gradient-to-r from-[#fe4800] to-[#ff6501]"
                >
                  <p
                    className="text-center text-brand-light"
                    dangerouslySetInnerHTML={{ __html: toast.toast_message }}
                  />
                  <Countdown date={new Date(toast.toast_expired_date)} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setHighlightedBar('true')}
            aria-label="Close Button"
            className="absolute text-brand-light top-3 md:top-1  flex items-center justify-center transition-colors duration-200 rounded-full outline-none w-7 md:w-8 h-7 md:h-8 ltr:right-0 rtl:left-0 ltr:mr-2 rtl:ml-2 md:ltr:mr-3 lg:ltr:mr-4  md:rtl:ml-7 2xl:rtl:ml-8 hover:bg-brand-light hover:bg-opacity-10 focus:text-brand-light focus:bg-opacity-10"
          >
            <BsX className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}
