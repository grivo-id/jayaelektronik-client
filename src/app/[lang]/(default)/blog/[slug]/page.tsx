import Container from '@components/ui/container';
import { Metadata } from 'next';
import Breadcrumb from '@components/ui/breadcrumb';
import { BlogPost } from './blog-post';
import React from 'react';
import { getAxiosBlogDetailByTitle } from 'src/framework/metadata-rest/blog-api';
import { Blog, BlogKeyword } from '@framework/types';
import Script from 'next/script';

type MetaDataProps = {
  params: {
    lang: string;
    slug: string;
  };
};

type PageProps = {
  children: React.ReactNode;
  params: { lang: string; slug: string };
};

export async function generateMetadata({ params }: MetaDataProps) {
  const { lang, slug } = params;
  const currentLang = lang ? lang : 'ina';
  const blogSlug = slug.replace(/-/g, ' ');

  try {
    const result = await getAxiosBlogDetailByTitle(blogSlug);
    const blog = result.data;
    console.log(blog);

    const keywordsString = blog.blog_keywords
      ? blog.blog_keywords
          .map((kw: BlogKeyword) => kw.blog_keyword_name)
          .join(', ')
      : '';
    const combinedKeywords = `${keywordsString}, jayaelektronik, jaya elektronik, papua, jayapura`;

    return {
      title: blog.blog_title,
      description: blog.blog_desc,
      keywords: combinedKeywords,
      authors: [
        {
          name: blog.user_name || 'Jaya Elektronik',
          url: 'https://www.jayaelektronik.com',
        },
      ],
      robots: 'index, follow',
      openGraph: {
        type: 'article',
        url: `https://www.jayaelektronik.com/${currentLang}/blog/${slug}`,
        title: blog.blog_title,
        description: blog.blog_desc,
        siteName: 'Jaya Elektronik',
        images: [
          {
            url: blog.blog_banner_image,
            alt: blog.blog_title,
          },
        ],
        publishedTime: blog.blog_created_date,
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.blog_title,
        description: blog.blog_desc,
        images: [blog.blog_banner_image],
      },
      alternates: {
        languages: {
          en: `https://www.jayaelektronik.com/en/blog/${slug}`,
          id: `https://www.jayaelektronik.com/ina/blog/${slug}`,
        },
        canonical: `https://www.jayaelektronik.com/${currentLang}/blog/${slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post - Jaya Elektronik',
      description: 'Read the latest articles from Jaya Elektronik',
      robots: 'noindex',
    };
  }
}

export default async function Page({ children, params }: PageProps) {
  const { lang, slug } = params;

  const blogSlug = slug.replace(/-/g, ' ');
  console.log(slug, '\n', blogSlug);

  const result = await getAxiosBlogDetailByTitle(blogSlug);
  const jsonLdData = generateJsonLd(result.data);

  return (
    <>
      <Script id="blogDetail-jsonld" type="application/ld+json">
        {JSON.stringify(jsonLdData)}
      </Script>
      <Container>
        <div className="pt-7 lg:pt-11 pb-10 blog-category">
          <Breadcrumb lang={lang} />
          <div className="max-w-screen-lg m-auto">
            <BlogPost key={'blogPost'} className={`pt-8 pb-8`} lang={lang} />
          </div>
        </div>
      </Container>
    </>
  );
}

const generateJsonLd = (blog: Blog) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.blog_title,
    image: [blog.blog_banner_image].filter(Boolean),
    description: blog.blog_desc,
    datePublished: blog.blog_created_date,
    author: {
      '@type': 'Organization',
      name: 'Jaya Elektronik',
    },
  };

  return jsonLd;
};
