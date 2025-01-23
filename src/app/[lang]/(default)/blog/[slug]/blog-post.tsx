'use client';
import type { FC } from 'react';
import Alert from '@components/ui/alert';
import cn from 'classnames';
import { useParams } from 'next/navigation';

import { useBlogPostQuery } from '@framework/blog/get-blog-post';
import BlogPostCard from '@components/blog/blog-post-card';

interface blogGridProps {
  className?: string;
  lang: string;
}

export const BlogPost: FC<blogGridProps> = ({ className, lang }) => {
  const params = useParams();
  const decodedSlug = decodeURIComponent(params.slug as string);
  const opt = {
    blog_title: decodedSlug,
  };
  const { data, isLoading, error } = useBlogPostQuery(opt);
  // console.log(data);\
  const blog = data || {}
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div className={cn('blog-post w-full ', className)}>
        {error ? (
          <div className="col-span-full ">
            <Alert message={error?.message} />
          </div>
        ) : (
          <BlogPostCard key={`blog--post`} blogData={blog} lang={lang} />
        )}
      </div>
    </>
  );
};
