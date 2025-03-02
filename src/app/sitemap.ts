import { MetadataRoute } from 'next';
import { getAxiosAllBlogPosts } from 'src/framework/metadata-rest/blog-api';
import { getAxiosAllProducts } from 'src/framework/metadata-rest/product-api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ['ina', 'en'];
  const baseUrl = 'https://jayaelektronik.com';

  const staticRoutes = [
    '',
    '/products',
    '/about-us',
    '/contact-us',
    '/products',
    '/brands',
    '/shops',
    '/blog',
    '/faq',
    '/signin',
    '/signup',
    '/checkout',
    '/privacy',
    '/terms',
  ];

  const staticEntries = languages.flatMap((lang) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: route === '' ? 1.0 : 0.9,
    }))
  );

  const productEntries: MetadataRoute.Sitemap = [];
  const batchSize = 100;
  const totalBatches = Math.ceil(678 / batchSize);

  for (let batch = 1; batch <= totalBatches; batch++) {
    const response = await getAxiosAllProducts({
      page: batch,
      limit: batchSize,
      sort: 'desc',
    });

    if (response.success && response.data) {
      const products = Array.isArray(response.data)
        ? response.data
        : [response.data];

      products.forEach((product) => {
        const productSlug = product.product_name
          ?.replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim()
          .replace(/^-+|-+$/g, '');
        const productUrl = `${product.product_id}.${productSlug}`;

        languages.forEach((lang) => {
          productEntries.push({
            url: `${baseUrl}/${lang}/products/${productUrl}`,
            lastModified: new Date(
              product.product_updated_at || product.product_created_date
            ),
            changeFrequency: 'daily' as const,
            priority: 0.8,
          });
        });
      });
    }
  }

  const blogEntries: MetadataRoute.Sitemap = [];
  const blogSize = 10;
  const totalBlogBatches = Math.ceil(100 / blogSize);

  for (let batch = 1; batch <= totalBlogBatches; batch++) {
    const response = await getAxiosAllBlogPosts({
      page: batch,
      limit: batchSize,
      sort: 'desc',
    });

    if (response.success && response.data) {
      const blogs = Array.isArray(response.data)
        ? response.data
        : [response.data];

      blogs.forEach((blog) => {
        const blogTitleSlug = blog.blog_title
          ?.replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim();

        languages.forEach((lang) => {
          blogEntries.push({
            url: `${baseUrl}/${lang}/blog/${blogTitleSlug}`,
            lastModified: new Date(blog.blog_created_date),
            changeFrequency: 'daily' as const,
            priority: 0.7,
          });
        });
      });
    }
  }

  return [...staticEntries, ...productEntries, ...blogEntries];
}
