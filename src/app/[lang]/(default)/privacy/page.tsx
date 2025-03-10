import PageHeroSection from '@components/ui/page-hero-section';
import PrivacyPageContent from './privacy-page-content';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Kebijakan Privasi',
    en: 'Privacy Policy',
  };

  const descriptions = {
    ina: 'Baca Kebijakan Privasi Jaya Elektronik untuk mengetahui bagaimana kami mengelola dan melindungi data pribadi Anda.',
    en: 'Read Jaya Elektronik’s Privacy Policy to learn how we manage and protect your personal data.',
  };

  const openGraphDescs = {
    ina: 'Pelajari bagaimana Jaya Elektronik menangani data pribadi Anda sesuai dengan standar keamanan dan privasi.',
    en: 'Learn how Jaya Elektronik handles your personal data in accordance with security and privacy standards.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'privacy policy',
      'data protection',
      'online security',
      'buy electronic online',
      'order electronic online',
      'jaya',
      'elektronik',
      'papua',
      'jayapura',
      'percetakan',
      'abepura',
      'toko elektronik',
      'electronic store',
      'purchase electronic products',
      'personal data policy',
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
      url: `https://www.jayaelektronik.com/${currentLang}/privacy`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/privacy`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/privacy`,
        id: `https://www.jayaelektronik.com/ina/privacy`,
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
      <Script id="privacy-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-page-privacy-policy" lang={lang} />
      <PrivacyPageContent lang={lang} />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Baca Kebijakan Privasi Jaya Elektronik untuk mengetahui bagaimana kami mengelola dan melindungi data pribadi Anda.',
    en: 'Read Jaya Elektronik’s Privacy Policy to learn how we manage and protect your personal data.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Privacy Policy',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/privacy`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  };

  return jsonLd;
};
