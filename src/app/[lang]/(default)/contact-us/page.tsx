import Container from '@components/ui/container';
import Map from '@components/ui/map';
import PageHeroSection from '@components/ui/page-hero-section';
import ContactForm from '@components/common/form/contact-form';
import ContactSupport from '@components/contact/contact-support';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
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


// const generateJsonLd = (currentLang: string) => {
//   const descriptions = {
//     ina: 'Selesaikan pembelian Anda dengan aman dan mudah di Jaya Elektronik. Nikmati pengalaman belanja terbaik dengan berbagai metode pembayaran dan layanan pelanggan terpercaya.',
//     en: 'Complete your purchase securely and easily at Jaya Elektronik. Enjoy the best shopping experience with multiple payment options and reliable customer service.',
//   };

//   const jsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'WebSite',
//     name: 'Checkout',
//     description: descriptions[currentLang as keyof typeof descriptions],
//     url: `https://jayaelektronik.com/${currentLang}/checkout`,
//     logo: 'https://firebasestorage.googleapis.com/v0/b/personal-d9ef9.appspot.com/o/jaya%2Fjaya.jpeg?alt=media&token=a2f5414d-b25f-492b-a04a-382d167ffed6',
//     potentialAction: {
//       '@type': 'SearchAction',
//       target: `https://jayaelektronik.com/${currentLang}/search?category={search_term_string}`,
//       'query-input': 'required category=search_term_string',
//     },
//   };

//   return jsonLd;
// };
