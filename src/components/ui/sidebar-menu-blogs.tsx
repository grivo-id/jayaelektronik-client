'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import cn from 'classnames';
import useQueryParam from '@utils/use-query-params';
import { useBlogStore } from 'src/zustandStore/blogStore';
import { useEffect } from 'react';

export function SidebarBlogMenuItem({
  className,
  blog_category_name,
  blog_category_id,
  slug,
}: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { updateQueryparams } = useQueryParam(pathname ?? '/');
  const setSelectedCategoryBlogId = useBlogStore(
    (state) => state.setSelectedCategoryBlogId
  );
  const activeCategory = searchParams?.get('categoryBlogs') || '';

  useEffect(() => {
    if (!activeCategory) {
      setSelectedCategoryBlogId('');
    }
  }, [activeCategory]);

  const isActive = activeCategory === slug;

  function onClick() {
    updateQueryparams('categoryBlogs', slug);
    setSelectedCategoryBlogId(blog_category_id);
  }

  return (
    <>
      <button
        onClick={onClick}
        className={`flex justify-between items-center transition ${
          className
            ? className
            : 'text-sm md:text-15px w-full  border-t border-border-base first:border-t-0  py-3 xl:py-3.5 2xl:py-2.5 3xl:py-3'
        } ${
          isActive
            ? 'text-skin-primary'
            : 'text-skin-base hover:text-skin-primary'
        }`}
      >
        <span className="capitalize flex items-center w-full ltr:text-left rtl:text-right outline-none focus:outline-none group focus:ring-0 focus:text-brand-dark">
          {blog_category_name}
        </span>
      </button>
    </>
  );
}

function SidebarMenuBlogs({
  lang,
  items,
  className,
}: {
  lang: string;
  items: any;
  className?: string;
}) {
  return (
    <ul className={cn(className)}>
      {items?.map((item: any) => (
        <SidebarBlogMenuItem
          // key={`${item.slug}-key-${item.id}`}
          key={`${item.blog_category_id}`}
          item={item}
          lang={lang}
        />
      ))}
    </ul>
  );
}

export default SidebarMenuBlogs;
