import { useForm } from 'react-hook-form';
import Input from '@components/ui/input';
import { useTranslation } from 'src/app/i18n/client';
import EmailIcon from '@components/icons/email-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import { getDirection } from '@utils/get-direction';
import cn from 'classnames';
interface Props {
  className?: string;
  lang: string;
}
interface NewsLetterFormValues {
  email: string;
  lang: string;
}
const defaultValues = {
  email: '',
};
const WidgetSubscription: React.FC<Props> = ({ lang,className }) => {
  const { t } = useTranslation(lang,'footer');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewsLetterFormValues>({
    defaultValues,
  });
  function onSubmit(values: NewsLetterFormValues) {
    // console.log(values, 'News letter');
  }
  const dir = getDirection(lang);
  return (
    <div className={cn('flex flex-col', className)}>
      <Heading variant="mediumHeading" className=" mb-4 lg:mb-6 lg:pb-0.5t text-[24px] lg:text-[30px]">
        {t('widget-title-subscribe')}
      </Heading>

      <Text className="px-4 lg:-mt-1 max-w-[700px] text-center">
        {t('text-layout4-subscribe')}
      </Text>
        <div className={"px-4 form-subscribe flex flex-col items-center justify-between "}>
            <form
                className="flex relative z-10 max-w-[600px]  lg:w-[600px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <span className="flex items-center absolute start-0 top-0 h-12 px-3.5 transform">
                  <EmailIcon className="w-4 2xl:w-[18px] h-4 2xl:h-[18px]" />
                </span>
                <Input
                    placeholder={t('placeholder-email-subscribe')}
                    type="email"
                    id="subscription-email"
                    variant="solid"
                    className="w-full"
                    inputClassName={`ps-10 md:ps-10 pe-10 md:pe-10 2xl:px-11 h-12 border-2 border-black/10 focus:outline-none focus:shadow-outline ${dir =='rtl' ? 'rounded-r-3xl':'rounded-l-3xl'}`}
                    {...register('email', {
                        required: `${t('email-required')}`,
                        pattern: {
                            value:
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: `${t('email-error')}`,
                        },
                    })}
                    error={errors.email?.message}
                />
                <button
                    className={`bg-skin-primary hover:bg-skin-footer text-sm font-medium text-white md:h-12 py-2 px-10   focus:outline-none focus:shadow-outline ${dir =='rtl' ? 'rounded-l-3xl -mr-1':'rounded-r-3xl -ml-1'}`}
                    aria-label="Subscribe Button"
                >
                    {t('text-btnsubscribe')}
                </button>
            </form>
        </div>

    </div>
  );
};

export default WidgetSubscription;
