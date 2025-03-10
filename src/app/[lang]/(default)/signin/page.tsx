import LoginForm from '@components/auth/login-form';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';
import Script from 'next/script';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const currentLang = params.lang || 'ina';

  const titles = {
    ina: 'Masuk',
    en: 'Sign In',
  };

  const descriptions = {
    ina: 'Masuk ke akun Jaya Elektronik Anda untuk melanjutkan belanja dan mengakses penawaran eksklusif.',
    en: 'Sign in to your Jaya Elektronik account to continue shopping and access exclusive deals.',
  };

  const openGraphDescs = {
    ina: 'Login ke akun Jaya Elektronik untuk pengalaman belanja yang lebih cepat dan mudah.',
    en: 'Log in to your Jaya Elektronik account for a faster and smoother shopping experience.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'sign in Jaya Elektronik',
      'login electronic store',
      'access online shopping account',
      'Jaya Elektronik login',
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
      'user account login',
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
      url: `https://www.jayaelektronik.com/${currentLang}/signin`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/signin`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/signin`,
        id: `https://www.jayaelektronik.com/ina/signin`,
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
      <Script id="signin-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <LoginForm
            isPopup={false}
            className="border rounded-lg border-border-base"
            lang={lang}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}

const generateJsonLd = (currentLang: string) => {
  const descriptions = {
    ina: 'Masuk ke akun Jaya Elektronik Anda untuk melanjutkan belanja dan mengakses penawaran eksklusif.',
    en: 'Sign in to your Jaya Elektronik account to continue shopping and access exclusive deals.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sign In',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/signin`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  };

  return jsonLd;
};
