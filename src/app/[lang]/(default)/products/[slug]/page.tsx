import Container from '@components/ui/container';
import ProductSingleDetails from '@components/product/product';
import RelatedProductFeed from '@components/product/feeds/related-product-feed';
import ProductDetailBreadcrumb from '@components/ui/product-detail-breadcrumb';

export default async function Page({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) {
  return (
    <>
      <div className="pt-6 lg:pt-7 pb-10">
        <Container>
          <ProductDetailBreadcrumb lang={lang} />
          <ProductSingleDetails lang={lang} />
          <RelatedProductFeed
            uniqueKey="related-products"
            lang={lang}
            className="mb-8 lg:mb-12"
          />
        </Container>
      </div>
    </>
  );
}
