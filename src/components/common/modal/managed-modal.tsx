'use client';

import Modal from '@components/common/modal/modal';
import dynamic from 'next/dynamic';
import {
  useModalAction,
  useModalState,
} from '@components/common/modal/modal.context';
import EditUserProfileForm from '../form/edit-user-profile';
const LoginForm = dynamic(() => import('@components/auth/login-form'));
const SignUpForm = dynamic(() => import('@components/auth/sign-up-form'));
const ForgetPasswordForm = dynamic(
  () => import('@components/auth/forget-password-form')
);
const ProductPopup = dynamic(() => import('@components/product/product-popup'));
const AddressPopup = dynamic(
  () => import('@components/common/form/add-address')
);
const EditAddressPopup = dynamic(
  () => import('@components/common/form/edit-address')
);
const DeleteAddressPopup = dynamic(
  () => import('@components/common/form/delete-address')
);
const PaymentPopup = dynamic(
  () => import('@components/common/form/add-payment')
);
const PhoneNumberPopup = dynamic(
  () => import('@components/common/form/add-contact')
);
const DeliveryAddresses = dynamic(
  () => import('@components/address/delivery-addresses')
);
const CategoryPopup = dynamic(
  () => import('@components/category/category-popup')
);

const ChangePasswordPopup = dynamic(
  () => import('@components/common/form/change-password')
);

export default function ManagedModal({ lang }: { lang: string }) {
  const { isOpen, view } = useModalState();
  const { closeModal } = useModalAction();

  if (view === 'CATEGORY_VIEW') {
    return (
      <Modal open={isOpen} onClose={closeModal} variant="bottom">
        {view === 'CATEGORY_VIEW' && <CategoryPopup lang={lang} />}
      </Modal>
    );
  }

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === 'LOGIN_VIEW' && <LoginForm lang={lang} />}
      {view === 'SIGN_UP_VIEW' && <SignUpForm lang={lang} />}
      {view === 'FORGET_PASSWORD' && <ForgetPasswordForm lang={lang} />}
      {view === 'PRODUCT_VIEW' && <ProductPopup lang={lang} />}
      {view === 'ADDRESS_VIEW_AND_EDIT' && <AddressPopup lang={lang} />}
      {view === 'EDIT_SHIPPING_ADDRESS' && <EditAddressPopup lang={lang} />}
      {view === 'DELETE_SHIPPING_ADDRESS' && <DeleteAddressPopup lang={lang} />}
      {view === 'PAYMENT' && <PaymentPopup lang={lang} />}
      {view === 'PHONE_NUMBER' && <PhoneNumberPopup lang={lang} />}
      {view === 'DELIVERY_VIEW' && <DeliveryAddresses lang={lang} />}
      {view === 'CHANGE_PASSWORD_VIEW' && <ChangePasswordPopup lang={lang} />}
      {view === 'EDIT_USERPROFILE_VIEW' && <EditUserProfileForm lang={lang} />}
    </Modal>
  );
}
