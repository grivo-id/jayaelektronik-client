'use client';

import { useBlogsQuery } from '@framework/blog/get-all-blogs';
import { BlogListContent } from './blog-list-content';

import React from 'react';

export default function BlogPageContent({
  lang,
  variant,
}: {
  lang: string;
  variant?: string;
}) {
  const opt = { page: 1, limit: 10, sort: 'desc' };
  const { data, isLoading, error } = useBlogsQuery(opt);
  const dataBlog = data;
  // console.log(data)

  const renderBlogContent = (variant: any) => {
    switch (variant) {
      case 'list':
        return (
          <BlogListContent
            dataBlog={dataBlog}
            className={`pt-8 pb-8`}
            lang={lang}
          />
        );
      default:
        return (
          <BlogListContent
            dataBlog={dataBlog}
            className={`pt-8 pb-8`}
            lang={lang}
          />
        );
    }
  };
  return (
    <>
      {!isLoading ? (
        renderBlogContent(variant)
      ) : (
        <div className={'pt-8 pb-8'}>Loading...</div>
      )}
    </>
  );
}
