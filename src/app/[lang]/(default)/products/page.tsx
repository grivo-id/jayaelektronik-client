import PageHeroSection from '@components/ui/page-hero-section';
import ProductsPageContent from './products-page-content';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Produk',
    en: 'Products',
  };

  const descriptions = {
    ina: 'Temukan berbagai produk elektronik berkualitas di Jaya Elektronik. Dari smartphone hingga peralatan rumah tangga, kami menyediakan pilihan terbaik untuk Anda.',
    en: 'Discover a wide range of quality electronics at Jaya Elektronik. From smartphones to home appliances, we offer the best selection for you.',
  };

  const openGraphDescs = {
    ina: 'Lihat katalog produk elektronik terbaru di Jaya Elektronik. Dapatkan barang berkualitas dengan harga terbaik di Jayapura.',
    en: 'Browse the latest electronics catalog at Jaya Elektronik. Get high-quality products at the best prices in Jayapura.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'buy electronic online',
      'order electronic online',
      'electronics shop',
      'toko elektronik',
      'electronic products',
      'home appliances',
      'jaya',
      'elektronik',
      'papua',
      'jayapura',
      'percetakan',
      'abepura',
      'electronic store',
      'purchase electronic products',
    ],
    authors: [
      {
        name: 'Jaya Elektronik & Grivo.id',
        url: 'https://www.jayaelektronik.com',
      },
    ],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: `https://www.jayaelektronik.com/${currentLang}/products`,
      title: titles[currentLang as keyof typeof titles],
      description: openGraphDescs[currentLang as keyof typeof openGraphDescs],
      siteName: 'Jaya Elektronik',
      images: [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
          alt: 'Jaya Elektronik - Electronics Store in Jayapura',
        },
      ],
    },
    twitter: {
      title: titles[currentLang as keyof typeof titles],
      card: 'summary_large_image',
      site: `https://www.jayaelektronik.com/${currentLang}/products`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/products`,
        id: `https://www.jayaelektronik.com/ina/products`,
      },
    },
  };
}

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  function SearchBarFallback() {
    return <></>;
  }

  const currentLang = lang ? lang : 'ina';
  const jsonLdData = generateJsonLd(currentLang);

  return (
    <>
      <Script id="products-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-all-grocery-items" lang={lang} />
      <Suspense fallback={<SearchBarFallback />}>
        <ProductsPageContent lang={lang} />
      </Suspense>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Temukan berbagai produk elektronik berkualitas di Jaya Elektronik. Dari smartphone hingga peralatan rumah tangga, kami menyediakan pilihan terbaik untuk Anda.',
    en: 'Discover a wide range of quality electronics at Jaya Elektronik. From smartphones to home appliances, we offer the best selection for you.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Products',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/products`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
