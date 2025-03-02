import AboutPageContent from '@components/about/about-page-content';
import PageHeroSection from '@components/ui/page-hero-section';
import { Metadata } from 'next';
import Script from 'next/script';

type LayoutProps = {
  children: React.ReactNode;
  params: { lang: string };
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Tentang Kami',
    en: 'About Us',
  };

  const descriptions = {
    ina: 'Toko elektronik modern dengan layanan purna jual pertama di Jayapura. Kami menjual produk elektronik kantor dan rumah tangga dari berbagai merek dengan garansi dan kualitas tinggi dengan harga terjangkau.',
    en: 'A modern electronics retail store with the first after-sales service in Jayapura. We sell office and household electronic products from various brands with warranties and high quality at affordable prices.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords:
      'jayaelektronik, jaya, elektronik, papua, jayapura, percetakan, abepura, toko elektronik, electronic store, after-sales service, household electronics, office electronics, electronics warranty, affordable electronics, appliances, tv shop, audio systems, air conditioner, refrigerator, washing machine, electronic repair, electronics service center, jayapura electronics, papua electronics, best price electronics, branded electronics, premium electronics',
    authors: [
      {
        name: 'Jaya Elektronik & Grivo.id',
        url: 'https://www.jayaelektronik.com',
      },
    ],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: `https://www.jayaelektronik.com/${currentLang}/about-us`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/about-us`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/about-us`,
        id: `https://www.jayaelektronik.com/ina/about-us`,
      },
    },
  };
}

export default async function Page({ children, params }: LayoutProps) {
  const { lang } = params;
  const currentLang = lang ? lang : 'ina';
  const jsonLdData = generateJsonLd(currentLang);
  return (
    <>
      <Script id="aboutus-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-about-page" lang={lang} />
      <AboutPageContent lang={lang} />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const aboutUsData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'About Us',
    url: `https://jayaelektronik.com/${currentLang}/about-us`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+6281356530099',
      contactType: 'Customer Service',
    },
  };

  return aboutUsData;
};
