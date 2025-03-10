import { Suspense } from 'react';
import Divider from '@components/ui/divider';
import SearchPageContent from './search-page-content';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Cari Produk',
    en: 'Search Products',
  };

  const descriptions = {
    ina: 'Cari dan temukan produk elektronik terbaik di Jaya Elektronik. Temukan smartphone, laptop, TV, dan peralatan rumah tangga dengan harga terbaik.',
    en: 'Search and find the best electronic products at Jaya Elektronik. Discover smartphones, laptops, TVs, and home appliances at the best prices.',
  };

  const openGraphDescs = {
    ina: 'Gunakan fitur pencarian Jaya Elektronik untuk menemukan produk elektronik berkualitas dengan mudah.',
    en: 'Use Jaya Elektronik’s search feature to easily find high-quality electronic products.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'search electronic products',
      'find electronics online',
      'electronics shop',
      'toko elektronik',
      'electronic products',
      'home appliances',
      'smartphones',
      'laptops',
      'TVs',
      'jaya',
      'elektronik',
      'papua',
      'jayapura',
      'percetakan',
      'abepura',
      'electronic store',
      'search best electronics',
      'buy electronic devices',
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
      url: `https://www.jayaelektronik.com/${currentLang}/search`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/search`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/search`,
        id: `https://www.jayaelektronik.com/ina/search`,
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
      <Script id="search-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Divider />
      <Suspense fallback={<SearchBarFallback />}>
        <SearchPageContent lang={lang} />
      </Suspense>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Cari dan temukan produk elektronik terbaik di Jaya Elektronik. Temukan smartphone, laptop, TV, dan peralatan rumah tangga dengan harga terbaik.',
    en: 'Search and find the best electronic products at Jaya Elektronik. Discover smartphones, laptops, TVs, and home appliances at the best prices.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Search',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/search`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
