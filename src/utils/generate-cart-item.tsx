
import { Product } from '@framework/types';
import isEmpty from 'lodash/isEmpty';
import { usePromoCountdown } from './use-promo-countdown';

interface Item {
  id: string | number;
  name: string;
  slug: string;
  image: {
    thumbnail: string;
    [key: string]: unknown;
  };
  price: number;
  sale_price?: number;
  quantity?: number;
  [key: string]: unknown;
}
interface Variation {
  id: string | number;
  title: string;
  price: number;
  sale_price?: number;
  quantity: number;
  [key: string]: unknown;
}

const convertToSlug = (text: any): string => {
  return text
    ?.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

export function generateCartItem(item: Product , variation: any, isValidPromoDate: boolean) {
  // console.log('car', item)
  const {
    product_id,
    product_name,
    product_image1,
    product_is_available,
    product_price,
    product_promo,
  } = item;
  const slug = convertToSlug(product_name);
 
 
  if (!isEmpty(variation)) {
    
    return {
      id: product_id,
      productId: product_id,
      name: product_name,
      slug: slug,
      product_is_available: product_is_available,
      price: product_price,
      image: product_image1,
      variationId: variation.id,
      stock: 50,
    };
  }
  return {
    id: product_id,
    name: product_name,
    slug: slug,
    image: product_image1,
    product_is_available: product_is_available,
    price: product_promo?.product_promo_is_discount && isValidPromoDate ? product_promo.product_promo_final_price : product_price ,
    stock: product_is_available ? 99 : 0,
  };
}
