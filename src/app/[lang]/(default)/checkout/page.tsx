import Container from '@components/ui/container';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';
import UserCheckOut from '@components/checkout';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Checkout',
    en: 'Checkout',
  };

  const descriptions = {
    ina: 'Selesaikan pembelian Anda dengan aman dan mudah di Jaya Elektronik. Nikmati pengalaman belanja terbaik dengan berbagai metode pembayaran dan layanan pelanggan terpercaya.',
    en: 'Complete your purchase securely and easily at Jaya Elektronik. Enjoy the best shopping experience with multiple payment options and reliable customer service.',
  };

  const openGraphDescs = {
    ina: 'Selesaikan transaksi Anda dengan cepat dan aman di Jaya Elektronik. Pilih metode pembayaran yang nyaman dan nikmati layanan pelanggan terbaik untuk pengalaman belanja tanpa hambatan.',
    en: 'Complete your transaction quickly and securely at Jaya Elektronik. Choose your preferred payment method and enjoy top-notch customer service for a seamless shopping experience.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords:
      'jayaelektronik checkout, buy electronic online, order electronic online, jaya, elektronik, papua, jayapura, percetakan, abepura, toko elektronik, electronic store, purchase electronic products',
    authors: [
      {
        name: 'Jaya Elektronik & Grivo.id',
        url: 'https://www.jayaelektronik.com',
      },
    ],
    robots: 'index, follow',
    openGraph: {
      type: 'website',
      url: `https://www.jayaelektronik.com/${currentLang}/checkout`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/checkout`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/checkout`,
        id: `https://www.jayaelektronik.com/ina/checkout`,
      },
    },
  };
}

export default async function CheckoutPage({
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
      <Script id="checkout-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Divider />
      <Container className="py-10 2xl:py-12 checkout">
        <div className="flex flex-col mx-auto">
          <UserCheckOut lang={lang} />
        </div>
      </Container>
      <Divider />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Selesaikan pembelian Anda dengan aman dan mudah di Jaya Elektronik. Nikmati pengalaman belanja terbaik dengan berbagai metode pembayaran dan layanan pelanggan terpercaya.',
    en: 'Complete your purchase securely and easily at Jaya Elektronik. Enjoy the best shopping experience with multiple payment options and reliable customer service.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Checkout',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/checkout`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
      'query-input': 'required category=search_term_string',
    },
  };

  return jsonLd;
};
