'use client';

import { useUI } from '@contexts/ui.context';
import {
  useVerifyEmailMutation,
  verifyEmail,
} from '@framework/auth/use-verify-email';
import cn from 'classnames';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'src/app/i18n/client';

interface VerifyEmailProps {
  lang: string;
  className?: string;
}

const VerifyEmail: React.FC<VerifyEmailProps> = ({ lang, className }) => {
  const searchParams = useSearchParams();
  const { mutateAsync: verifyEmail, isLoading } = useVerifyEmailMutation();
  const router = useRouter();
  const [IsVerifying, setVerifying] = useState(true);
  const [isVerified, setVerified] = useState(false);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(3);
  const { t } = useTranslation(lang);
  const { authorize, user } = useUI();
  const authToken = searchParams.get('token');

  useEffect(() => {
    const token = {
      value: authToken,
      expires_in: Date.now() + 120 * 60 * 1000 - 3000,
    };

    if (authToken) {
      sessionStorage.setItem('token', JSON.stringify(token));
      authorize();
    }

    const verify = async () => {
      try {
        const response = await verifyEmail(authToken);
        if (response.success) {
          setVerifying(false);
          setVerified(true);
          setMessage(response.message);
        }
      } catch (error: any) {
        setVerifying(false);
        setMessage(error.message);
      }
    };

    verify();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isVerified) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);

      if (countdown === 0) {
        router.push('/');
      }
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, isVerified]);

  return (
    <div
      className={cn(
        'w-full max-w-[600px] min-w-[300px] sm:min-w-[360px] min-h-[230px] py-8 px-6 relative shadow-xl sm:px-12 my-14',
        className
      )}
    >
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full rounded-md flex flex-col justify-center gap-8">
          <div className="text-center">
            <p className="text-lg font-bold text-brand-dark sm:text-xl sm:pt-3 tracking-wide">
              {t('common:text-email-verification')}
            </p>
          </div>
          <div className="space-y-5">
            {IsVerifying ? (
              <div className="relative flex w-full item-center justify-center gap-4">
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current
                   border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]
                   dark:text-white"
                ></div>
                <span>Verifying...</span>
              </div>
            ) : (
              <p className="text-sm m-0 text-center text-semibold capitalize sm:text-base">
                {message}
              </p>
            )}
            {isVerified && (
              <div className="w-full flex flex-col items-center justify-center gap-1">
                <p className="text-sm m-0 text-center italic sm:text-base">
                  Redirecting in...
                </p>
                <p>{countdown}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
