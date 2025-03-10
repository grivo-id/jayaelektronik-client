import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';

import Heading from '@components/ui/heading';
import { useTranslation } from 'src/app/i18n';
import { Metadata } from 'next';
import { termsAndCondition } from '@settings/terms-settings';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Syarat & Ketentuan',
    en: 'Terms & Conditions',
  };

  const descriptions = {
    ina: 'Baca syarat dan ketentuan penggunaan Jaya Elektronik. Ketahui hak dan kewajiban Anda saat berbelanja di toko kami.',
    en: 'Read the terms and conditions of using Jaya Elektronik. Understand your rights and responsibilities when shopping with us.',
  };

  const openGraphDescs = {
    ina: 'Pelajari syarat dan ketentuan Jaya Elektronik untuk pengalaman belanja yang aman dan nyaman.',
    en: 'Learn about Jaya Elektronik’s terms and conditions for a safe and smooth shopping experience.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'terms and conditions',
      'Jaya Elektronik policies',
      'shopping rules',
      'electronic store Jayapura',
      'where to buy electronics in Papua',
      'TVs',
      'home appliances',
      'jaya',
      'elektronik',
      'papua',
      'jayapura',
      'percetakan',
      'abepura',
      'online shopping terms',
      'purchase policies',
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
      url: `https://www.jayaelektronik.com/${currentLang}/terms`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/terms`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/terms`,
        id: `https://www.jayaelektronik.com/ina/terms`,
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
  const { t } = await useTranslation(lang, 'terms');
  const currentLang = lang ? lang : 'ina';
  const jsonLdData = generateJsonLd(currentLang);
  return (
    <>
      <Script id="terms-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <PageHeroSection heroTitle="text-page-terms-condition" lang={lang} />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto ">
            <div className="pb-6">
              <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                {t('terms-welcome')}
              </Heading>
              <span
                className=" text-sm leading-7 text-brand-muted lg:text-15px"
                dangerouslySetInnerHTML={{
                  // @ts-ignore
                  __html: t('terms-opening'),
                }}
              />
            </div>

            {termsAndCondition?.map((item) => (
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {t(item.title)}
                </Heading>
                <div
                  className="space-y-5 text-sm leading-7 text-brand-muted lg:text-15px"
                  dangerouslySetInnerHTML={{
                    // @ts-ignore
                    __html: t(item.description),
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Baca syarat dan ketentuan penggunaan Jaya Elektronik. Ketahui hak dan kewajiban Anda saat berbelanja di toko kami.',
    en: 'Read the terms and conditions of using Jaya Elektronik. Understand your rights and responsibilities when shopping with us.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Terms & Conditions',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/terms`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  };

  return jsonLd;
};
