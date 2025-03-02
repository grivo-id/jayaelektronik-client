import BrandsPageContent from '@components/brands/brands-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Brands',
    en: 'Brands',
  };

  const descriptions = {
    ina: 'Jelajahi berbagai brand terkemuka yang bekerja sama dengan Jaya Elektronik. Kami menghadirkan produk berkualitas dari brand terpercaya untuk memenuhi kebutuhan elektronik rumah dan bisnis Anda.',
    en: 'Discover top brands partnering with Jaya Elektronik. We bring you high-quality products from trusted brands to meet your home and business electronics needs.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords:
      'jayaelektronik, jaya, elektronik, papua, jayapura, percetakan, abepura, toko elektronik, electronic store, after-sales service, household electronics, office electronics, electronics warranty, affordable electronics, appliances, tv shop, audio systems, air conditioner, refrigerator, washing machine, electronics service center, jayapura electronics, papua electronics, best price electronics, branded electronics, premium electronics',
    authors: [
      {
        name: 'Jaya Elektronik & Grivo.id',
        url: 'https://www.jayaelektronik.com',
      },
    ],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: `https://www.jayaelektronik.com/${currentLang}/brands`,
      title: titles[currentLang as keyof typeof titles],
      description: descriptions[currentLang as keyof typeof descriptions],
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
      site: `https://www.jayaelektronik.com/${currentLang}/brands`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/brands`,
        id: `https://www.jayaelektronik.com/ina/brands`,
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
      <Script id="brands-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-brands-page" lang={lang} />
      <BrandsPageContent lang="lang" />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Jelajahi berbagai brand terkemuka yang bekerja sama dengan Jaya Elektronik. Kami menghadirkan produk berkualitas dari brand terpercaya untuk memenuhi kebutuhan elektronik rumah dan bisnis Anda.',
    en: 'Discover top brands partnering with Jaya Elektronik. We bring you high-quality products from trusted brands to meet your home and business electronics needs.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Brands',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/brands`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
