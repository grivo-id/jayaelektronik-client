import { useRouter } from 'next/router';
import { useTranslation } from 'src/app/i18n/client';

import CategoryDropdownSidebar from '@components/category/category-dropdown-sidebar';
import BestSellerSidebarProductFeed from '@components/product/feeds/best-seller-sidebar-product-feed';

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
