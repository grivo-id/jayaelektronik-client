import { useMemo } from 'react';

interface PriceData {
  amount: number;
  baseAmount?: number;
  currencyCode: string;
}

interface FormatPriceArgs {
  amount: number;
  currencyCode: string;
  locale: string;
}

interface FormatVariantPriceArgs extends FormatPriceArgs {
  baseAmount: number;
}

const formatPrice = ({ amount, currencyCode, locale }: FormatPriceArgs) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: currencyCode === 'IDR' ? 0 : 2,
    maximumFractionDigits: currencyCode === 'IDR' ? 0 : 2,
  });

  return formatter.format(amount);
};

const formatVariantPrice = ({
  amount,
  baseAmount,
  currencyCode,
  locale,
}: FormatVariantPriceArgs) => {
  const hasDiscount = baseAmount > amount;
  const price = formatPrice({ amount, currencyCode, locale });
  const basePrice = hasDiscount
    ? formatPrice({ amount: baseAmount, currencyCode, locale })
    : null;
  const discount = hasDiscount
    ? Math.round(((baseAmount - amount) / baseAmount) * 100)
    : null;

  return { price, basePrice, discount };
};

export default function usePrice(data?: PriceData | null) {
  const { amount, baseAmount, currencyCode } = data ?? {};
  const locale = 'en';

  const value = useMemo(() => {
    if (typeof amount !== 'number' || !currencyCode) return '';

    return baseAmount
      ? formatVariantPrice({ amount, baseAmount, currencyCode, locale })
      : formatPrice({ amount, currencyCode, locale });
  }, [amount, baseAmount, currencyCode]);

  return typeof value === 'string'
    ? { price: value, basePrice: null, discount: null }
    : value;
}
