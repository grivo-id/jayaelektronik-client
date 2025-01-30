import { ProductPromo } from '@framework/types';
import { usePromoCountdown } from '@utils/use-promo-countdown';
import Countdown, { zeroPad } from 'react-countdown';

type Props = {
  promoData?: ProductPromo;
};

export default function PromoCountdown({ promoData }: Props) {
  const shouldShowCountdown = usePromoCountdown(promoData);

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return null;
    } else {
      return (
        <div className="flex  text-base xl:text-lg text-skin-base text-opacity-50 font-semibold -mx-2.5">
          <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
            {zeroPad(days)}
          </span>
          :
          <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
            {zeroPad(hours)}
          </span>
          :
          <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
            {zeroPad(minutes)}
          </span>
          :
          <span className="flex items-center justify-center min-w-[40px] md:min-w-[50px] min-h-[36px] md:min-h-[40px] bg-gray-200 text-skin-base rounded p-1 mx-1 md:mx-1.5 lg:mx-2.5">
            {zeroPad(seconds)}
          </span>
        </div>
      );
    }
  };

  if (!shouldShowCountdown) {
    return null;
  }

  const expiryDate = promoData?.product_promo_expired_date;
  if (!expiryDate) {
    return null;
  }

  return (
    <Countdown
      date={new Date(expiryDate)}
      intervalDelay={1000}
      renderer={renderer}
    />
  );
}
