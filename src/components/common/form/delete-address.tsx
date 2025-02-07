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
import { useDeleteShippingMutation } from '@framework/checkout/use-delete-address';

const DeleteAddressConfirmation: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang);
  const { width } = useWindowSize();
  const { data } = useModalState();
  const { user, setShippingAddress, shippingAddress } = useUI();
  const { mutateAsync: DeleteShippingAddress, isLoading } =
    useDeleteShippingMutation();

  const { closeModal } = useModalAction();

  async function onSubmit() {
    try {
      const response = await DeleteShippingAddress(data.shipping_address_id);
      if (response.success) {
        const updatedShippingAddress = shippingAddress.filter(
          (address: any) =>
            address.shipping_address_id !== data.shipping_address_id
        );
        setShippingAddress(updatedShippingAddress);
        closeModal();
        toast('Address Deleted successful!', {
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
  }

  return (
    <div className="w-full md:w-[500px] mx-auto p-5 sm:p-8 bg-brand-light rounded-md">
      <CloseButton onClick={closeModal} />
      <Heading variant="title" className="mb-8 -mt-1.5">
        {t('common:text-delete-delivery-address')}
      </Heading>
      <div className="flex flex-col">
        <p>{t('common:text-delete-confirmation')}</p>
        <div className="flex justify-end gap-4 mt-5">
          <Button
            className="!h-8 !w-20 !bg-transparent text-skin-red border border-skin-red hover:!bg-skin-red hover:!text-white"
            onClick={closeModal}
          >
            {t('common:text-cancel')}
          </Button>
          <Button
            loading={isLoading}
            className="!h-8 !w-20"
            type="submit"
            onClick={onSubmit}
          >
            {t('common:text-confirm')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddressConfirmation;
