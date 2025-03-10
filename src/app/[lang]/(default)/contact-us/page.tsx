import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import ContactSupport from '@components/contact/contact-support';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Hubungi Kami',
    en: 'Contact Us',
  };

  const descriptions = {
    ina: 'Hubungi Jaya Elektronik untuk informasi lebih lanjut tentang produk dan layanan kami. Kami siap membantu Anda menemukan produk elektronik terbaik di Jayapura.',
    en: 'Contact Jaya Elektronik for more information about our products and services. We are here to help you find the best electronics in Jayapura.',
  };

  const openGraphDescs = {
    ina: 'Dapatkan informasi kontak Jaya Elektronik. Kami siap membantu Anda dengan produk dan layanan berkualitas.',
    en: 'Get contact information for Jaya Elektronik. We are ready to assist you with quality products and services.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'jayaelektronik contact us',
      'jayaelektronik hubungi kami',
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
      url: `https://www.jayaelektronik.com/${currentLang}/contact-us`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/contact-us`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/contact-us`,
        id: `https://www.jayaelektronik.com/ina/contact-us`,
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
      <Script id="contactus-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-page-contactus" lang={lang} />
      <Container>
        <div className="flex flex-wrap bg-skin-fill w-full py-4 xl:py-12  relative z-10">
          <div className="w-full md:w-[53%] xl:w-[60%] md:pe-8 lg:pe-0 2xl:pe-24 lg:mb-0 mb-8">
            <ContactSupport lang={lang} />
          </div>
        </div>
      </Container>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Hubungi Jaya Elektronik untuk informasi lebih lanjut tentang produk dan layanan kami. Kami siap membantu Anda menemukan produk elektronik terbaik di Jayapura.',
    en: 'Contact Jaya Elektronik for more information about our products and services. We are here to help you find the best electronics in Jayapura.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Contact Us',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/contact-us`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
