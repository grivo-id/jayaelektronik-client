'use client';

import ErrorIcon from '@components/icons/error-icon';
import { useUI } from '@contexts/ui.context';
import { sendEmailVerification } from '@framework/auth/use-signup';
import useWindowSize from '@utils/use-window-size';
import cn from 'classnames';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'src/app/i18n/client';

interface SendVerificationProps {
  lang: string;
  className?: string;
}

const SendVerification: React.FC<SendVerificationProps> = ({
  lang,
  className,
}) => {
  const router = useRouter();
  const { width } = useWindowSize();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(lang);
  const { user } = useUI();

  const handleResend = async () => {
    setIsLoading(true);
    const response = await sendEmailVerification(user.user_email);
    if (response.success) {
      toast(response.message || 'An unexpected error occurred', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setIsLoading(false);
    } else {
      toast.error(response.message || 'An unexpected error occurred', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: <ErrorIcon />,
      });
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        'w-full max-w-[600px] py-8 px-6 relative shadow-xl sm:px-12 my-14',
        className
      )}
    >
      <div className="flex mx-auto overflow-hidden rounded-lg bg-brand-light">
        <div className="w-full rounded-md flex flex-col justify-center gap-8">
          <div className="text-center">
            <p className="text-lg font-bold text-brand-dark sm:text-xl sm:pt-3 tracking-wide">
              {t('common:text-verify-email')}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm m-0 text-center sm:text-base">
              {t('common:text-send-email')}
            </p>
            <p className="text-sm m-0 text-center font-bold sm:text-base">
              {user?.user_email || ''}
            </p>
            <p className="text-sm m-0 text-center sm:text-base">
              {t('common:text-inbox-spam')}
            </p>
          </div>
          <div className="space-y-1 w-full flex flex-col items-center justify-center">
            <p className="text-sm m-0 text-center italic">
              {t('common:text-email-not-found')}
            </p>
            <button
              className="btn-primary items-center !w-40"
              onClick={handleResend}
              disabled={isLoading}
            >
              {isLoading ? (
                <div
                  className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current
                 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]
                 dark:text-white"
                ></div>
              ) : (
                t('common:text-resend-verification')
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendVerification;
