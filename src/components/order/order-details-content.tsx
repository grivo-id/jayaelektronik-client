import usePrice from '@framework/product/use-price';
import Image from '@components/ui/image';

export const OrderDetailsContent: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.product_price_at_purchase,
    currencyCode: 'IDR',
  });
  return (
    <div className="relative grid grid-cols-12 py-2 pb-0 border-b px-1.5 border-solid border-border-base text-[12px] md:text-[14px]">
      <div className="self-center col-span-2">
        <Image
          src={item?.product_image}
          alt={item?.product_name || 'Product Image'}
          width="60"
          height="60"
          quality={100}
          className="object-cover shadow"
          style={{ width: 'auto' }}
        />
      </div>
      <div className="self-center col-span-5 max-w-44">
        <h2 className="text-brand-dark line-clamp-2">{item.product_name}</h2>
      </div>
      <div className="self-center col-span-3 text-center md:ltr:text-left md:rtl:text-right">
        {typeof item.product_qty === 'number' && <p>{item.product_qty}x</p>}
      </div>
      <div className="self-center col-span-2">
        {typeof item.product_price_at_purchase === 'number' && <p>{price}</p>}
      </div>
    </div>
  );
};
