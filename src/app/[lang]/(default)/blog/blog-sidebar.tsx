
import { FC } from 'react';
import KeywordDropdownSidebar from '@components/blog/keyword-dropdown-sidebar';
interface blogGridProps {
  lang: string;
}
export const BlogSidebar: FC<blogGridProps> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <KeywordDropdownSidebar lang={lang} />
    </div>
  );
};
