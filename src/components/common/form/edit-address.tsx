import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import { toast } from 'react-toastify';
import ErrorIcon from '@components/icons/error-icon';
import CloseButton from '@components/ui/close-button';
import Heading from '@components/ui/heading';
import Map from '@components/ui/map';
import { useTranslation } from 'src/app/i18n/client';
import { useUI } from '@contexts/ui.context';
import { useAddShippingMutation } from '@framework/checkout/use-shipping-address';
import { useEditShippingMutation } from '@framework/checkout/use-edit-address';

interface ContactFormValues {
  shipping_address_title: string;
  shipping_address_desc: string;
}

const EditAddressForm: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { width } = useWindowSize();
  const { data } = useModalState();
  const { user, setShippingAddress, shippingAddress } = useUI();
  const { mutateAsync: EditShippingAddress, isLoading } =
    useEditShippingMutation();

  const { closeModal } = useModalAction();

  async function onSubmit(
    { shipping_address_desc, shipping_address_title }: ContactFormValues,
    e: any
  ) {
    if (user) {
      try {
        const response = await EditShippingAddress({
          id: data.shipping_address_id,
          shipping_address_desc,
          shipping_address_title,
        });
        if (response.success) {
          setShippingAddress(
            (Array.isArray(shippingAddress) ? shippingAddress : []).map(
              (address: any) =>
                address.shipping_address_id === data.shipping_address_id
                  ? { ...address, ...response.data }
                  : address
            )
          );
          closeModal();
          toast('Address edited successful!', {
            progressClassName: 'fancy-progress-bar',
            position: width! > 768 ? 'bottom-right' : 'top-right',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (error: any) {
        closeModal();
        toast.error(error.message || 'An unexpected error occurred', {
          progressClassName: 'fancy-progress-bar',
          position: width! > 768 ? 'bottom-right' : 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          icon: <ErrorIcon />,
        });
      }
    } else {
      const existingData = JSON.parse(
        sessionStorage.getItem('default_address') || '{}'
      );

      const updatedAddressData = {
        ...existingData, 
        shipping_address_title,
        shipping_address_desc,
        user_fname: existingData.user_fname || '',
        user_lname: existingData.user_lname || '',
        user_email: existingData.user_email || '',
        user_phone: existingData.user_phone || '',
        user_name: existingData.user_name || '',
      };

      sessionStorage.setItem(
        'default_address',
        JSON.stringify(updatedAddressData)
      );

      const updatedShippingAddress = (
        Array.isArray(shippingAddress) ? shippingAddress : []
      ).map((address: any) =>
        address.shipping_address_title === existingData.shipping_address_title
          ? updatedAddressData
          : address
      );

      if (
        updatedShippingAddress.length === 0 ||
        !updatedShippingAddress.some(
          (a: any) => a.shipping_address_title === shipping_address_title
        )
      ) {
        updatedShippingAddress.push(updatedAddressData);
      }

      setShippingAddress(updatedShippingAddress);

      closeModal();
      toast('Address edited successful!', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      shipping_address_title: data ? data?.shipping_address_title : '',
      shipping_address_desc: data ? data?.shipping_address_desc : '',
    },
  });

  return (
    <div className="w-full md:w-[600px] lg:w-[900px] xl:w-[1000px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-edit-delivery-address')}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-6">
          <Input
            variant="solid"
            label="Address Title"
            {...register('shipping_address_title', {
              required: 'Title Required',
            })}
            error={errors.shipping_address_title?.message}
            lang={lang}
          />
        </div>
        <div className="grid grid-cols-1 mb-6 gap-7">
          {/* <Map
            lat={data?.address?.lat || 1.295831}
            lng={data?.address?.lng || 103.76261}
            height={'420px'}
            zoom={15}
            showInfoWindow={false}
            mapCurrentPosition={(value: string) =>
              setValue('formatted_address', value)
            }
          /> */}
          <TextArea
            label="Address"
            {...register('shipping_address_desc', {
              required: 'forms:address-required',
            })}
            error={errors.shipping_address_desc?.message}
            className="text-brand-dark"
            variant="solid"
            lang={lang}
          />
        </div>
        <div className="flex justify-end w-full">
          <Button className="h-11 md:h-12 mt-1.5" type="submit">
            {t('common:text-save-address')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditAddressForm;
