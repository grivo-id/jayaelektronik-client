'use client';

import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { Blog } from '@framework/types';

import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import { getCountview } from '@utils/get-countview';
import LabelIcon from '@components/icons/label-icon';
import TagLabel from '@components/ui/tag-label';
import SocialShareThis from '@components/ui/share-this';

interface BlogProps {
  blogData: any;
  className?: string;
  lang: string;
}

const convertToSlug = (text: string): string => {
  return text
    ?.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

function formatDate(dateString: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-GB',
    options
  );
  return formattedDate;
}

const BlogPostCard: React.FC<BlogProps> = ({ blogData, className, lang }) => {
  const {
    blog_title,
    blog_banner_image,
    blog_created_date,
    blog_category_name,
    category,
    blog_keywords,
    user_name,
    blog_desc,
  } = blogData.data;
  const { t } = useTranslation(lang, 'common');
  const title = convertToSlug(blog_title);
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${ROUTES.BLOG}/${blog_title}`;
  console.log(blogData);

  return (
    <article
      className={cn(
        'flex flex-col product-card overflow-hidden  h-full',
        className
      )}
      title={title}
    >
      <div className="pb-5 h-full relative">
        <div className="text-base font-semibold mb-2.5 text-skin-primary">
          {category}
        </div>
        <h4 className={'font-bold text-2xl lg:text-4xl mb-3.5 '}>
          <Link
            href={`/${lang}${ROUTES.BLOG}/${blog_title}`}
            className="text-skin-base line-clamp-2 hover:text-skin-primary"
          >
            {blog_title}
          </Link>
        </h4>
        <div className="entry-meta text-13px text-gray-400">
          <span className="post-by pe-2.5 relative inline-block">
            {' '}
            By {user_name}
          </span>
          <span className="has-dot px-2.5 relative inline-block">
            {formatDate(blog_created_date)}
          </span>
          <span className="has-dot ps-2.5 relative inline-block">
            {blog_category_name}
          </span>
        </div>
      </div>
      <div className="relative flex-shrink-0 mb-10">
        <Link
          href={`/${lang}${ROUTES.BLOG}/${blog_title}`}
          className="text-skin-base "
        >
          <div className="card-img-container max-w-[1050px] overflow-hidden flex mx-auto relative rounded-xl">
            <Image
              src={blog_banner_image ?? productPlaceholder}
              alt={blog_title || 'Product Image'}
              width={1050}
              height={460}
              priority
              className="object-cover bg-skin-thumbnail"
            />
          </div>
        </Link>
      </div>
      <div className="single-content text-sm sm:text-15px text-skin-muted leading-[2em] space-y-4 lg:space-y-5 xl:space-y-7 mb-10">
        <p dangerouslySetInnerHTML={{ __html: blog_desc }} />
      </div>
      <hr className="w-full border-gray-200 mb-6" />
      <div
        className={
          'entry-bottom by-5 flex flex-col gap-3 md:flex-row justify-between'
        }
      >
        <div className={`tags`}>
          {Array.isArray(blog_keywords) && (
            <ul className="pt-0">
              <li className="text-sm text-skin-base text-opacity-80 inline-flex items-center justify-center me-2 relative top-1">
                <LabelIcon className="me-2" /> {t('text-tags')}:
              </li>
              {blog_keywords?.map((item: any) => (
                <li
                  className="inline-block p-[3px]"
                  key={`tag-${item.blog_keyword_id}`}
                >
                  <TagLabel data={{ name: item.blog_keyword_name }} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={`social-icons single-share`}>
          <SocialShareThis
            className={`flex items-center opacity-100 top-full`}
            shareUrl={blogUrl}
            lang={lang}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
