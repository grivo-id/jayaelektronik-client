import { BsThreeDots } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useUI } from '@contexts/ui.context';

const ActionsButton: React.FC<{ item?: any }> = ({ item }) => {
  const { openDrawer, setDrawerView } = useUI();

  function handleCartOpen(item: any) {
    setDrawerView('ORDER_DETAILS');
    return openDrawer(item);
  }

  return (
    <>
      <div
        className="text-[14px] whitespace-nowrap text-white rounded-md  py-1.5 px-2.5 bg-brand w-fit transition cursor-pointer ease-in-out duration-200 hover:opacity-75"
        onClick={() => handleCartOpen(item)}
      >
        <EyeSvg />
      </div>
    </>
  );
};

export default ActionsButton;

function EyeSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-eye"
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
