import React, { Suspense } from 'react';
import Container from '@components/ui/container';
import { Metadata } from 'next';
import Breadcrumb from '@components/ui/breadcrumb';
import { BlogSidebar } from './blog-sidebar';
import BlogPageContent from './blog-page-content';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Blog',
    en: 'Blog',
  };

  const descriptions = {
    ina: 'Dapatkan berita, promo terbaru, dan informasi menarik tentang produk elektronik di Jaya Elektronik. Temukan tips belanja pintar, ulasan produk, dan penawaran terbaik untuk kebutuhan rumah dan kantor Anda.',
    en: 'Stay updated with the latest news, promotions, and insights on electronics at Jaya Elektronik. Discover smart shopping tips, product reviews, and the best deals for your home and office needs.',
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
      url: `https://www.jayaelektronik.com/${currentLang}/blog`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/blog`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/blog`,
        id: `https://www.jayaelektronik.com/ina/blog`,
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
      <Script id="blogs-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Container>
        <div className="pt-7 lg:pt-11 ">
          <Breadcrumb lang={lang} />
        </div>
        <div className="flex pt-5 lg:pt-8 pb-16 lg:pb-20 blog-category">
          <>
            <Suspense fallback={<></>}>
              <div className="flex-shrink-0 pe-8 xl:pe-12 hidden lg:block w-80 xl:w-90 sticky top-16 h-full">
                <BlogSidebar lang={lang} />
              </div>
            </Suspense>
            <div className="w-full lg:-mt-1">
              <BlogPageContent lang={lang} variant={'list'} />
            </div>
          </>
        </div>
      </Container>
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Dapatkan berita, promo terbaru, dan informasi menarik tentang produk elektronik di Jaya Elektronik. Temukan tips belanja pintar, ulasan produk, dan penawaran terbaik untuk kebutuhan rumah dan kantor Anda.',
    en: 'Stay updated with the latest news, promotions, and insights on electronics at Jaya Elektronik. Discover smart shopping tips, product reviews, and the best deals for your home and office needs.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Blog',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/blog`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
