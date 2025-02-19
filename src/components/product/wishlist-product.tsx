'use client';
import { Fragment, useState } from 'react';
import WishlistProductCard from '@components/product/wishlist-product-card';
import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';

interface ProductWishlistProps {
  className?: string;
  lang: string;
}

export default function ProductWishlistGrid({
  className = '',
  lang,
}: ProductWishlistProps) {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, error } = useWishlistProductsQuery({
    page,
    limit,
    sort: 'desc',
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const getPageNumbers = () => {
    if (!data?.pagination.totalPages) return [];

    const totalPages = data.pagination.totalPages;
    const currentPage = data.pagination.currentPage;
    let pages: number[] = [];

    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      pages = [1];

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      if (start > 2) pages.push(-1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push(-1);
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn(className)}>
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <LoadingSkeleton count={limit} />
          ) : data ? (
            <>
              {data.data.map((product: any) => (
                <WishlistProductCard
                  key={`product--key${product.product_id}`}
                  product={product}
                  lang={lang}
                />
              ))}

              <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                <PaginationButton
                  onClick={() => handlePageChange(page - 1)}
                  disabled={!data.pagination.hasPrevPage}
                >
                  Previous
                </PaginationButton>

                {getPageNumbers().map((pageNum, index) => (
                  <Fragment key={index}>
                    {pageNum === -1 ? (
                      <span className="px-2">...</span>
                    ) : (
                      <PageNumber
                        pageNum={pageNum}
                        currentPage={page}
                        onClick={() => handlePageChange(pageNum)}
                      />
                    )}
                  </Fragment>
                ))}

                <PaginationButton
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!data.pagination.hasNextPage}
                >
                  Next
                </PaginationButton>
              </div>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}

const LoadingSkeleton = ({ count = 5 }: { count: number }) =>
  Array.from({ length: count }).map((_, index) => (
    <div
      key={index}
      className="w-full flex flex-col gap-4 items-center justify-start"
    >
      <div className="animate-pulse flex space-x-4 w-full">
        <div className="rounded-lg bg-gray-200 h-20 w-14" />
        <div className="rounded-lg bg-gray-200 h-20 w-full" />
      </div>
    </div>
  ));

const PaginationButton = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'bg-brand px-2 py-1 text-white rounded-md transition duration-200 ease-in-out',
      'hover:opacity-80',
      disabled && 'opacity-75'
    )}
  >
    {children}
  </button>
);

const PageNumber = ({
  pageNum,
  currentPage,
  onClick,
}: {
  pageNum: number;
  currentPage: number;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'text-white px-2 py-1 rounded-md',
      pageNum === currentPage ? 'bg-brand' : 'bg-brand/50'
    )}
  >
    {pageNum}
  </button>
);
