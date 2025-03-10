'use client';

import { useEffect, useState } from 'react';
import { TiPencil } from 'react-icons/ti';
import { AiOutlinePlus } from 'react-icons/ai';
import { RadioGroup } from '@headlessui/react';
import { useModalAction } from '@components/common/modal/modal.context';
import Button from '@components/ui/button';
import { useTranslation } from 'src/app/i18n/client';
import { useUI } from '@contexts/ui.context';
import TrashIcon from '@components/icons/trash-icon';

const AddressGrid: React.FC<{ address?: any; lang: string }> = ({
  address,
  lang,
}) => {
  const { t } = useTranslation(lang, 'common');
  const { openModal } = useModalAction();
  const { user, shippingAddress } = useUI();

  // console.log(address);

  function handlePopupView(item: any) {
    openModal('ADDRESS_VIEW_AND_EDIT', item);
  }

  function handlePopupEditView(item: any) {
    openModal('EDIT_SHIPPING_ADDRESS', item);
  }

  function handlePopupDeleteView(item: any) {
    openModal('DELETE_SHIPPING_ADDRESS', item);
  }

  const [selected, setSelected] = useState(address[0] || null);

  useEffect(() => {
    if (address?.length > 0) {
      setSelected(address[0]);
    }
  }, [address]);

  useEffect(() => {
    if (selected) {
      sessionStorage.setItem('default_address', JSON.stringify(selected));
    }
  }, [selected]);

  return (
    <div className="flex flex-col justify-between h-full -mt-4 text-15px md:mt-0">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className="space-y-4 md:grid md:grid-cols-2 md:gap-5 auto-rows-auto md:space-y-0"
      >
        <RadioGroup.Label className="sr-only">{t('address')}</RadioGroup.Label>
        {address?.length > 0 ? (
          address?.map((item: any, index: any) => (
            <RadioGroup.Option
              key={index}
              value={item}
              className={({ checked }) =>
                `${checked ? 'border-brand' : 'border-border-base'}
                  border-2 relative focus:outline-none rounded-md p-5 block cursor-pointer min-h-[112px] h-full group address__box`
              }
            >
              <RadioGroup.Label
                as="h3"
                className="mb-2 -mt-1 font-semibold text-brand-dark "
              >
                {item?.shipping_address_title}
              </RadioGroup.Label>
              <RadioGroup.Description
                as="div"
                className="leading-6 text-brand-muted"
              >
                {item?.shipping_address_desc}
              </RadioGroup.Description>
              <div className="absolute gap-2 z-10 flex transition-all ltr:right-3 rtl:left-3 top-3 lg:opacity-0 address__actions">
                <button
                  onClick={() => handlePopupEditView(item)}
                  className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-brand text-brand-light text-opacity-80"
                >
                  <span className="sr-only">{t(item?.title)}</span>
                  <TiPencil />
                </button>
                {user && (
                  <button
                    onClick={() => handlePopupDeleteView(item)}
                    className="flex items-center justify-center w-6 h-6 text-base rounded-full bg-skin-red text-brand-light text-opacity-80"
                  >
                    <span className="sr-only">{t(item?.title)}</span>
                    <TrashIcon />
                  </button>
                )}
              </div>
            </RadioGroup.Option>
          ))
        ) : (
          <div className="border-2 border-border-base rounded font-semibold p-5 px-10 text-brand-danger flex justify-start items-center min-h-[112px] h-full">
            {t('text-no-address-found')}
          </div>
        )}
        <button
          className="w-full border-2 transition-all border-border-base rounded font-semibold p-5 px-10 cursor-pointer text-brand flex justify-start hover:border-brand items-center min-h-[112px] h-full"
          onClick={handlePopupView}
        >
          <AiOutlinePlus size={18} className="ltr:mr-2 rtl:ml-2" />
          {t('text-add-address')}
        </button>
      </RadioGroup>

      <div className="flex mt-5 sm:justify-end md:mt-10 lg:mt-20 save-change-button">
        <Button className="w-full sm:w-auto">{t('button-save-changes')}</Button>
      </div>
    </div>
  );
};

export default AddressGrid;
