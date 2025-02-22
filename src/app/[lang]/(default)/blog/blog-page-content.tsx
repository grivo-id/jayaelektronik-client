'use client';

import { useBlogsQuery } from '@framework/blog/get-all-blogs';
import { BlogListContent } from './blog-list-content';
import { GrNext, GrPrevious } from 'react-icons/gr';
import React, { useState } from 'react';
import Pagination from '@components/ui/pagination';

export default function BlogPageContent({
  lang,
  variant,
}: {
  lang: string;
  variant?: string;
}) {
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const opt = { page, limit, sort: 'desc' };
  const { data, isLoading, error } = useBlogsQuery(opt);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
        <div className={'pt-8 pb-8'}>Loading...</div>
      )}
    </>
  );
}
