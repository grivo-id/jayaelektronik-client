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
