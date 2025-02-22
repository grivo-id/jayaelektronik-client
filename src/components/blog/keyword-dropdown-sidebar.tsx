'use client';

import Alert from '@components/ui/alert';
import { useTranslation } from 'src/app/i18n/client';
import { useBlogCategoriesQuery } from '@framework/blog/get-all-blog-categories';
import Scrollbar from '@components/ui/scrollbar';
import { SidebarBlogMenuItem } from '@components/ui/sidebar-menu-blogs';
import CategoryListCardLoader from '@components/ui/loaders/category-list-card-loader';
import cn from 'classnames';
import SectionHeader from '@components/common/section-header';

interface CategorySidebarProps {
  lang: string;
  className?: string;
}

export default function KeywordDropdownSidebar({
  lang,
  className,
}: CategorySidebarProps) {
  const { t } = useTranslation(lang, 'common');
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useBlogCategoriesQuery({
    page: 1,
    limit: 15,
    sort: 'desc',
  });

  return (
    <aside className={cn('category-mobile-sidebar', className)}>
      <div className=" mb-5 md:mb-6">
        <SectionHeader
          sectionHeading={`text-all-keywords`}
          className="mb-0 block-title"
          lang={lang}
        />
      </div>
      <div className="h-full max-h-full overflow-hidden ">
        {error ? (
          <div className="2xl:ltr:pr-4 2xl:rtl:pl-4">
            <Alert message={error.message} />
          </div>
        ) : (
          <Scrollbar className="w-full h-full category-scrollbar">
            <div className="h-[calc(84vh_-_150px)] lg:h-full">
              {isLoading
                ? Array.from({ length: 8 }).map((_, idx) => (
                    <CategoryListCardLoader
                      key={`category-list-${idx}`}
                      uniqueKey="category-list-card-loader"
                    />
                  ))
                : data?.pages?.map((page: any) =>
                    page.data.map((item: any) => (
                      <SidebarBlogMenuItem
                        key={item.blog_category_id}
                        {...item}
                        lang={lang}
                        categories={data.pages.flatMap((p: any) => p.data)}
                      />
                    ))
                  )}
            </div>
          </Scrollbar>
        )}
        {hasNextPage && (
          <div className="text-center mt-4">
            <button
              disabled={loadingMore}
              onClick={() => fetchNextPage()}
              className={
                'w-full bg-brand text-sm text-white py-2 px-4 rounded-md'
              }
            >
              {t('button-load-more')}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
