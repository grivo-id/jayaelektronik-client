import ShopsPageContent from '@components/shops/shops-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import { shops } from './shops';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Toko',
    en: 'Shops',
  };

  const descriptions = {
    ina: 'Temukan lokasi toko Jaya Elektronik di Jayapura dan sekitarnya. Kunjungi cabang terdekat untuk produk elektronik berkualitas.',
    en: 'Find Jaya Elektronik store locations in Jayapura and surrounding areas. Visit the nearest branch for quality electronic products.',
  };

  const openGraphDescs = {
    ina: 'Cari cabang Jaya Elektronik terdekat untuk mendapatkan berbagai produk elektronik terbaik.',
    en: 'Find the nearest Jaya Elektronik branch to get the best electronic products.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'electronics shop locations',
      'toko elektronik terdekat',
      'electronic store near me',
      'Jaya Elektronik branches',
      'cabang toko elektronik',
      'electronic store Jayapura',
      'where to buy electronics in Papua',
      'smartphones',
      'laptops',
      'TVs',
      'home appliances',
      'jaya',
      'elektronik',
      'papua',
      'jayapura',
      'percetakan',
      'abepura',
      'store branches',
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
      url: `https://www.jayaelektronik.com/${currentLang}/shops`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/shops`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/shops`,
        id: `https://www.jayaelektronik.com/ina/shops`,
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
  const currentLang = lang ? lang : 'ina';
  const jsonLdData = generateJsonLd(currentLang);

  return (
    <>
      <Script id="shops-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-shop-page" lang={lang} />
      <ShopsPageContent shops={shops} lang={lang} />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Temukan lokasi toko Jaya Elektronik di Jayapura dan sekitarnya. Kunjungi cabang terdekat untuk produk elektronik berkualitas.',
    en: 'Find Jaya Elektronik store locations in Jayapura and surrounding areas. Visit the nearest branch for quality electronic products.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Shops',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/shops`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  };

  return jsonLd;
};
