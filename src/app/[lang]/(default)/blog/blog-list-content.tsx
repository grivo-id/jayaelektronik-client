'use client';
import type { FC } from 'react';
import cn from 'classnames';
import BlogCardList from '@components/blog/blog-card-list';

interface blogGridProps {
  dataBlog?: any;
  className?: string;
  lang: string;
}

export const BlogListContent: FC<blogGridProps> = ({
  dataBlog,
  className = '',
  lang,
}) => {
  return (
    <>
      <div className={cn('grid grid-cols-1 gap-[35px] ', className)}>
        {dataBlog?.data.map((item: any) => {
          return (
            <BlogCardList
              key={`blog--key-${item.blog_id}`}
              blog={item}
              lang={lang}
            />
          );
        })}
      </div>
    </>
  );
};
