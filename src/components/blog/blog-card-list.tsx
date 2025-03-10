import cn from 'classnames';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { Blog } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import { productPlaceholder } from '@assets/placeholders';
import { ROUTES } from '@utils/routes';
import { BsArrowRight, BsClock } from 'react-icons/bs';

interface BlogProps {
  blog: Blog;
  className?: string;
  lang: string;
}

const convertToSlug = (text: string): string => {
  return text
    ?.replace(/[^\w\s-]/g, '')
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

const BlogCardList: React.FC<BlogProps> = ({ blog, className, lang }) => {
  const {
    blog_title,
    blog_banner_image,
    blog_desc,
    blog_created_date,
    blog_category_name,
  } = blog ?? {};

  const { t } = useTranslation(lang, 'common');
  const slug = convertToSlug(blog_title);

  return (
    <article
      className={cn(
        'flex flex-col sm:flex-row blog-card overflow-hidden w-full border border-black/10 rounded-xl',
        className
      )}
      title={blog_title}
    >
      <div className="relative flex-shrink-0 w-[360px] lg:w-[440px]">
        <Link
          href={`/${lang}${ROUTES.BLOG}/${slug}`}
          className="text-skin-base "
        >
          <div className="card-img-container flex overflow-hidden  mx-auto relative sm:rounded-l-xl h-[360px] ">
            <Image
              src={blog_banner_image ?? productPlaceholder}
              alt={blog_title || 'Product Image'}
              width={0}
              height={0}
              className="object-cover bg-fill-thumbnail"
              fill
              sizes="(max-width: 768px) 100vw,
                              (max-width: 1200px) 50vw,
                              100vw"
            />
          </div>
        </Link>
      </div>

      <div className="flex flex-col justify-center py-5 px-5 sm:px-8 h-full overflow-hidden relative">
        <span className='text-white bg-brand w-fit px-2 py-0.5 text-xs rounded shadow-sm'>{blog_category_name}</span>
        <h4 className={'font-medium text-2xl lg:text-3xl mb-3.5 '}>
          <Link
            href={`/${lang}${ROUTES.BLOG}/${slug}`}
            className="text-skin-base line-clamp-2 hover:text-skin-primary"
          >
            {blog_title}
          </Link>
        </h4>
        <div className="post-exerpt mb-5 lg:mb-8 text-gray-500">
          <span
            className="line-clamp-1"
            dangerouslySetInnerHTML={{ __html: blog_desc }}
          />
        </div>
        <div className={'flex justify-start'}>
          <div className="entry-meta text-13px text-gray-500 flex">
            <span className="post-on pe-2.5 relative flex items-center gap-1.5">
              {' '}
              <BsClock className="transition " />{' '}
              {formatDate(blog_created_date)}
            </span>
            {/* <span className="has-dot px-2.5 relative">
                {getCountview(totalWatchCount)} {t('text-view')}
              </span> */}
          </div>
          <Link
            href={`/${lang}${ROUTES.BLOG}/${slug}`}
            className="text-gray-500 hover:text-skin-primary text-13px flex items-center gap-1.5"
          >
            {t('text-read-more')}
            <BsArrowRight className={`rtl:rotate-180`} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCardList;
