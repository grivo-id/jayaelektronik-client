import { QueryKey } from 'react-query';

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type BlogCategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};

export type BlogCategory = {
  blog_category_id: number | string;
  blog_category_name: string;
  slug: string;
  blog_category_desc?: string;
};

export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};
export type Brand = {
  id: number | string;
  name: string;
  slug: string;
  image?: Attachment;
  [key: string]: unknown;
};
export type Dietary = {
  id: number | string;
  name: string;
  slug: string;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

export type ProdTag = {
  product_tag_id: string | number;
  product_tag_name: string;
};

export type ProductPromo = {
  product_promo_id: string | number;
  product_promo_final_price: number;
  product_promo_is_discount: boolean;
  product_promo_created_date: Date | string;
  product_promo_expired_date: Date | string;
  product_promo_is_best_deal: boolean;
  product_promo_discount_percentage: number;
};

export type Product = {
  product_id: string;
  user_id: string;
  product_subcategory_id: string;
  brand_id: string;
  product_code: string;
  product_name: string;
  quantity?: number;
  min_price?: number;
  max_price?: number;
  sale_price?: number;
  gallery?: Attachment[];
  product_price: number;
  product_item_sold: number;
  product_desc: string;
  product_image1: string;
  product_image2: string;
  product_image3: string;
  product_is_available: boolean;
  product_is_show: boolean;
  product_is_bestseller: boolean;
  product_is_new_arrival: boolean;
  product_updated_by: string;
  product_updated_at: Date | string;
  product_created_date: Date | string;
  user_name: string;
  updated_by: string;
  brand_name: string;
  brand_image: string;
  product_category_id: string;
  product_subcategory_name: string;
  product_category_name: string;
  product_tags?: ProdTag[];
  product_promo?: ProductPromo;
  [key: string]: unknown;
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

export type Blog = {
  blog_id: number | string;
  blog_category_id: number | string;
  blog_title: string;
  subTitle?: string;
  blog_desc: string;
  user_name: string;
  blog_created_date: Date | string;
  totalWatchCount?: number;
  totalCommentCount?: number;
  titleTwo: string;
  category: string;
  blog_banner_image: string;
  sku?: string;
  content?: string;
  contentTwo?: string;
  contentThree?: string;
  quote: {
    content: string;
  };
  postList?: object;
  discount?: object;
  tags: {};
  comments?: object;
  [key: string]: unknown;
};

export type ProductFromOrderResult = {
  brand_id: string;
  brand_name: string;
  product_id: string;
  product_qty: number | string;
  product_name: string;
  product_price: number;
  product_subtotal: number;
  product_subcategory_id: string | number;
  product_subcategory_name: string;
  order_discount_percentage: string | number;
  product_price_at_purchase: number;
};

export type CouponDetail = {
  coupon_name?: string;
};

export type OrderApiResponse = {
  order_id: string | number;
  coupon_code?: string | number;
  order_email: string;
  order_user_name: string;
  order_phone: string | number;
  order_address: string;
  order_grand_total: number;
  order_is_completed?: boolean;
  order_user_verified?: boolean;
  order_updated_at: Date | string;
  order_created_date: Date | string;
  products: ProductFromOrderResult[];
  coupon_detail?: CouponDetail;
};

