'use client';

import { useBlogsQuery } from '@framework/blog/get-all-blogs';
import { BlogListContent } from './blog-list-content';
import { GrNext, GrPrevious } from 'react-icons/gr';
import React, { useState } from 'react';
import Pagination from '@components/ui/pagination';
import { useBlogStore } from 'src/zustandStore/blogStore';

export default function BlogPageContent({
  lang,
  variant,
}: {
  lang: string;
  variant?: string;
}) {
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

  // console.log('selectedCategoryBlogId', selectedCategoryBlogId);

  return (
    <>
      {!isLoading ? (
        <>
          <BlogListContent
            dataBlog={data}
            className={`pt-8 pb-8`}
            lang={lang}
          />
          <Pagination
            current={page}
            onChange={handlePageChange}
            pageSize={limit}
            total={data?.pagination?.totalData || 0}
            prevIcon={
              <GrPrevious
                size={14}
                className={`m-auto my-1.5 rtl:rotate-180`}
              />
            }
            nextIcon={
              <GrNext size={14} className={`m-auto my-1.5 rtl:rotate-180`} />
            }
            className="blog-pagination"
          />
        </>
      ) : (
        <div className="flex flex-col gap-4 py-8">
          <LoadingSkeleton count={limit} />
        </div>
      )}
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
