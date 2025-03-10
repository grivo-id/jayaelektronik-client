import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import Accordion from '@components/ui/accordion';
import { faq } from '@settings/faq-settings';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'FAQ - Pertanyaan Umum',
    en: 'FAQ - Frequently Asked Questions',
  };

  const descriptions = {
    ina: 'Temukan jawaban atas pertanyaan umum tentang produk dan layanan Jaya Elektronik di Jayapura. Baca FAQ kami untuk informasi lebih lanjut.',
    en: 'Find answers to common questions about Jaya Elektronik’s products and services in Jayapura. Read our FAQ for more details.',
  };

  const openGraphDescs = {
    ina: 'Butuh informasi tentang toko dan produk kami? Cek FAQ Jaya Elektronik untuk jawaban atas pertanyaan umum.',
    en: 'Need information about our store and products? Check out Jaya Elektronik’s FAQ for answers to common questions.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'jayaelektronik faq',
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
      url: `https://www.jayaelektronik.com/${currentLang}/faq`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/faq`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/faq`,
        id: `https://www.jayaelektronik.com/ina/faq`,
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
      <Script id="faq-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection
        heroTitle="text-page-faq"
        className="faq-banner-area"
        lang={lang}
      />
      <Container>
        <div className="flex flex-col max-w-2xl py-12 mx-auto 2xl:max-w-4xl md:py-20">
          {faq?.map((item, index) => (
            <Accordion
              key={`${item.title}-${index}`}
              item={item}
              translatorNS="faq"
              lang={lang}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Temukan jawaban atas pertanyaan umum tentang produk dan layanan Jaya Elektronik di Jayapura. Baca FAQ kami untuk informasi lebih lanjut.',
    en: 'Find answers to common questions about Jaya Elektronik’s products and services in Jayapura. Read our FAQ for more details.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FAQ',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/faq`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
