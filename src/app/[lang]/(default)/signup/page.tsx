import SignupForm from '@components/auth/sign-up-form';
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
    ina: 'Daftar Akun',
    en: 'Sign Up',
  };

  const descriptions = {
    ina: 'Buat akun Jaya Elektronik untuk pengalaman belanja online yang lebih mudah dan mendapatkan penawaran eksklusif.',
    en: 'Create a Jaya Elektronik account for a seamless shopping experience and access to exclusive deals.',
  };

  const openGraphDescs = {
    ina: 'Daftar sekarang di Jaya Elektronik dan nikmati kemudahan berbelanja elektronik secara online.',
    en: 'Sign up now at Jaya Elektronik and enjoy the convenience of online electronics shopping.',
  };

  return {
    title: titles[currentLang as keyof typeof titles],
    description: descriptions[currentLang as keyof typeof descriptions],
    keywords: [
      'sign up Jaya Elektronik',
      'register electronic store',
      'create account online shopping',
      'Jaya Elektronik registration',
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
      'new account Jaya Elektronik',
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
      url: `https://www.jayaelektronik.com/${currentLang}/signup`,
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
      site: `https://www.jayaelektronik.com/${currentLang}/signup`,
      creator: 'Jaya Elektronik & Grivo.id',
      images:
        'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
    },

    alternates: {
      languages: {
        en: `https://www.jayaelektronik.com/en/signup`,
        id: `https://www.jayaelektronik.com/ina/signup`,
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
      <Script id="signup-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <SignupForm
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
    ina: 'Buat akun Jaya Elektronik untuk pengalaman belanja online yang lebih mudah dan mendapatkan penawaran eksklusif.',
    en: 'Create a Jaya Elektronik account for a seamless shopping experience and access to exclusive deals.',
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sign Up',
    description: descriptions[currentLang as keyof typeof descriptions],
    url: `https://jayaelektronik.com/${currentLang}/signup`,
    logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
  };

  return jsonLd;
};
