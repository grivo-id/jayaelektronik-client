import { ProductPromo } from '@framework/types';
import { useEffect, useState } from 'react';

export function usePromoCountdown(promoData?: ProductPromo): boolean {
  const [isPromoDateValid, setIsPromoDateValid] = useState(false);

  useEffect(() => {
    if (!promoData) return;

    const createdDate = new Date(promoData.product_promo_created_date);
    const expiredDate = new Date(promoData.product_promo_expired_date);
    const now = new Date();

    const isWithinPromoRange = now >= createdDate && now < expiredDate;

    setIsPromoDateValid(isWithinPromoRange);
  }, [promoData]);

  return isPromoDateValid;
}
