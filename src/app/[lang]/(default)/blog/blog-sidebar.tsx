'use client';
import { FC } from 'react';
import KeywordDropdownSidebar from '@components/blog/keyword-dropdown-sidebar';
import SelectedFilters from '@components/search/selected-filters';
interface blogGridProps {
  lang: string;
}
export const BlogSidebar: FC<blogGridProps> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
      <KeywordDropdownSidebar lang={lang} />
    </div>
  );
};
