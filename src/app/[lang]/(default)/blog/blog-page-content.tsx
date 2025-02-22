'use client';

import { useBlogsQuery } from '@framework/blog/get-all-blogs';
import { BlogListContent } from './blog-list-content';
import { GrNext, GrPrevious } from 'react-icons/gr';
import React, { useState } from 'react';
import Pagination from '@components/ui/pagination';
import { useBlogStore } from 'src/zustandStore/blogStore';
import Alert from '@components/ui/alert';
import { useTranslation } from 'src/app/i18n/client';
import { FaSadCry } from 'react-icons/fa';
import { Frown } from 'lucide-react';

export default function BlogPageContent({
  lang,
  variant,
}: {
  lang: string;
  variant?: string;
}) {
  const { t } = useTranslation(lang, 'common');
  const selectedCategoryBlogId = useBlogStore(
    (state) => state.selectedCategoryBlogId
  );
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const blog_category_id = selectedCategoryBlogId ? selectedCategoryBlogId : '';
  const opt = { blog_category_id, page, limit, sort: 'desc' };
  const { data, isLoading, error } = useBlogsQuery(opt);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // console.log(data);

  // console.log('selectedCategoryBlogId', selectedCategoryBlogId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 py-8">
        <LoadingSkeleton count={limit} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Alert message={error.message} />
      </div>
    );
  }

  if (!data?.data || data?.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="py-8 flex items-center flex-col bg-gray-100 px-4 md:px-8 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-600 flex items-center gap-2 flex-row">
            <Frown className='' /> {t('no-blog-found-title')}
          </h2>
          <p className="text-gray-500">
            {t('no-blog-found-desc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <BlogListContent dataBlog={data} className={`pt-8 pb-8`} lang={lang} />
      <Pagination
        current={page}
        onChange={handlePageChange}
        pageSize={limit}
        total={data?.pagination?.totalData || 0}
        prevIcon={
          <GrPrevious size={14} className={`m-auto my-1.5 rtl:rotate-180`} />
        }
        nextIcon={
          <GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`} />
        }
        className="blog-pagination"
      />
    </>
  );
}

const LoadingSkeleton = ({ count = 5 }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="w-full flex flex-col gap-2 items-center justify-start"
    >
      <div className="animate-pulse flex space-x-4 flex-col md:flex-row w-full">
        <div className="rounded-lg bg-gray-200 h-72  w-full max-w-[25rem]" />
        <div className="rounded-lg bg-gray-200 h-72 w-full hidden md:block" />
      </div>
    </div>
  ));
