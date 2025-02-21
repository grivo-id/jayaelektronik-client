import ResetPassword from '@components/auth/reset-password-form';
import Divider from '@components/ui/divider';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  function SearchBarFallback() {
    return <>Loading...</>;
  }
  return (
    <>
      <Divider />
      <div className="flex items-center justify-center">
        <div className="px-4 py-12 sm:py-16 lg:py-20 md:px-6 lg:px-8 2xl:px-10">
          <Suspense fallback={<SearchBarFallback />}>
            <ResetPassword
              className="border rounded-lg border-border-base"
              lang={lang}
            />
          </Suspense>
        </div>
      </div>
      <Divider />
    </>
  );
}
