import VerifyEmail from '@components/auth/verify-email';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Email Verification',
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
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <VerifyEmail
            className="border rounded-lg border-border-base"
            lang={lang}
          />
        </div>
      </div>
      <Divider />
    </>
  );
}
