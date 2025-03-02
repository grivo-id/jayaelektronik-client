import { Product } from '@framework/types';
import { Metadata } from 'next';
import Script from 'next/script';
import { getAxiosProductDetailById } from 'src/framework/metadata-rest/product-api';

type MetaDataProps = {
  params: {
    lang: string;
    slug: string;
  };
};

type LayoutProps = {
  children: React.ReactNode;
  params: { lang: string; slug: string };
};

export async function generateMetadata({
  params,
}: MetaDataProps): Promise<Metadata> {
  const { lang, slug } = params;

  const currentLang = lang ? lang : 'ina';
  const productId = slug.split('.')[0];

  try {
    const result = await getAxiosProductDetailById(productId);
    const product = result.data;
    return {
      title: `${product.product_name} | JayaElektronik`,
      description: product.product_desc,
      robots: 'index, follow',
      openGraph: {
        title: product.product_name,
        description: product.product_desc,
        images: [
          product.product_image1,
          product.product_image2,
          product.product_image3,
        ].filter(Boolean),
        url: `https://jayaelektronik.com/${currentLang}/products/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: product.product_name,
        description: product.product_desc,
        images: product.product_image1,
      },
    };
  } catch (error) {
    const productName = slug.split('.')[1]?.replace(/-/g, ' ') || 'Product';
    return {
      title: `${productName} | JayaElektronik`,
      description: `Visit our store JayaElektronik.com to view detailed information about ${productName} and explore our wide range of electronic products.`,
      robots: 'index, follow',
      openGraph: {
        title: `${productName} | JayaElektronik`,
        description: `Visit our store JayaElektronik.com to view detailed information about ${productName} and explore our wide range of electronic products.`,
        url: `https://jayaelektronik.com/${currentLang}/products/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} | JayaElektronik`,
        description: `Visit our store JayaElektronik.com to view detailed information about ${productName} and explore our wide range of electronic products.`,
      },
    };
  }
}

export default async function ProductLayout({ children, params }: LayoutProps) {
  const { lang, slug } = params;
  const productId = slug.split('.')[0];
  const currentLang = lang ? lang : 'ina';

  try {
    const result = await getAxiosProductDetailById(productId);
    const product = result.data;

    const jsonLdData = generateJsonLd(product, currentLang, slug);
    // console.log(jsonLdData);

    return (
      <div>
        <Script id="product-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </Script>
        {children}
      </div>
    );
  } catch (error) {
    const productName = slug.split('.')[1]?.replace(/-/g, ' ') || 'Product';
    const jsonLdData = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: productName,
      identifier: productId,
      description: 'Product details are currently unavailable.',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'IDR',
        price: '0',
        availability: 'https://schema.org/OutOfStock',
      },
    };
    return (
      <div>
        <Script id="product-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLdData)}
        </Script>
        {children}
      </div>
    );
  }
}

type AggregateOfferType = {
  '@type': 'AggregateOffer';
  priceCurrency: string;
  lowPrice?: string | number;
  highPrice?: string | number;
  url: string;
  availability: string;
};

type SingleOfferType = {
  '@type': 'Offer';
  priceCurrency: string;
  price: string | number;
  url: string;
  availability: string;
};

type OfferType = AggregateOfferType | SingleOfferType;

const generateJsonLd = (
  product: Product,
  currentLang: string,
  slug: string
) => {
  const promoPrice = product.product_promo?.product_promo_final_price;
  const regularPrice = product.product_price;

  let offers: OfferType;

  if (promoPrice && parseFloat(String(promoPrice)) > 0) {
    offers = {
      '@type': 'AggregateOffer',
      priceCurrency: 'IDR',
      lowPrice: promoPrice,
      highPrice: regularPrice,
      url: `https://jayaelektronik.com/${currentLang}/products/${slug}`,
      availability: 'http://schema.org/InStock',
    };
  } else {
    offers = {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      price: regularPrice,
      url: `https://jayaelektronik.com/${currentLang}/products/${slug}`,
      availability: 'http://schema.org/InStock',
    };
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.product_name,
    image: [
      product.product_image1,
      product.product_image2,
      product.product_image3,
    ].filter(Boolean),
    description: product.product_desc,
    sku: product.product_code,
    offers: offers,
  };

  return jsonLd;
};
