import { Tag } from '@framework/types';
import cn from 'classnames';
import { ROUTES } from '@utils/routes';
import { useRouter } from 'next/navigation';
import { useModalAction } from '@components/common/modal/modal.context';

interface TagData {
  name: string;
}

interface Props {
  className?: string;
  data: TagData;
}

const TagLabel: React.FC<Props> = ({ className, data }) => {
  const { name } = data;
  const router = useRouter();
  const { closeModal } = useModalAction();
  function changeTags() {
    closeModal();
    router.push(ROUTES.SEARCH);
  }
  return (
    <div
      className={cn(
        'text-13px md:text-sm capitalize rounded hover:bg-fill-four block border border-border-four px-2 py-1 transition',
        className
      )}
      role="button"
      onClick={changeTags}
    >
      {name}
    </div>
  );
};

export default TagLabel;
