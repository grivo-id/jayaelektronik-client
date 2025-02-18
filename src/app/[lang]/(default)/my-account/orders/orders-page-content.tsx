'use client';
import { Fragment, useState } from 'react';
import { useOrdersQuery } from '@framework/order/get-all-orders';
import { Table } from '@components/ui/table';
import { CreatedAt, Status } from '@components/order/order-table';
import Alert from '@components/ui/alert';
import { TotalPrice } from '@components/order/price';
import ActionsButton from '@components/ui/action-button';
import usePrice from '@framework/product/use-price';
import Button from '@components/ui/button';

export default function OrdersPageContent({ lang }: { lang: string }) {
  // const { data, isLoading } = useOrdersQuery({});
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useOrdersQuery({
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center text-center justify-start gap-1 text-lg text-brand-dark">
        <span className="font-semibold ">Order History</span>
        {data && (
          <span className="opacity-70">({data.pagination.totalData})</span>
        )}
      </div>

      {error ? (
        <div className="col-span-full">
          <Alert message={error?.message} />
        </div>
      ) : isLoading ? (
        Array.from({ length: 3 }).map((_, idx) => (
          <span key={idx}>loading</span>
        ))
      ) : data ? (
        <>
          <div className="order-list-table-wraper">
            <Table
              className="order-list-table"
              columns={columns}
              data={data.data}
              rowKey="order_id"
              scroll={{ x: 750 }}
            />
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <button
              onClick={() => handlePageChange(page - 1)}
              className={`bg-brand px-2 py-1 text-white rounded-md hover:opacity-80 transition duration-200  ease-in-out ${
                !data.pagination.hasPrevPage ? 'opacity-75' : ''
              }`}
              disabled={!data.pagination.hasPrevPage}
            >
              Previous
            </button>

            {getPageNumbers().map((pageNum, index) => (
              <Fragment key={index}>
                {pageNum === -1 ? (
                  <span className="px-2">...</span>
                ) : (
                  <button
                    // variant={pageNum === page ? 'primary' : 'border'}
                    onClick={() => handlePageChange(pageNum)}
                    className={` text-white px-2 py-1 rounded-md ${
                      pageNum === page ? 'bg-brand' : 'bg-brand/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )}
              </Fragment>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
              className={`bg-brand px-2 py-1 text-white rounded-md hover:opacity-80 transition duration-200  ease-in-out ${
                !data.pagination.hasNextPage ? 'opacity-75' : ''
              }`}
              disabled={!data.pagination.hasNextPage}
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

const columns = [
  {
    title: 'Order Number',
    dataIndex: 'order_id',
    key: 'order_id',
    className: 'id-cell',
    width: 140,
  },
  {
    title: 'Order Date',
    dataIndex: 'order_created_date',
    key: 'order_created_date',
    width: 120,
    render: function createdAt(items: any) {
      return <CreatedAt createdAt={items} />;
    },
  },
  {
    title: 'Total Product',
    dataIndex: 'products',
    key: 'products',
    width: 120,
    render: function status(item: any) {
      return <TotalProduct item={item} />;
    },
  },
  {
    title: 'Total',
    key: 'order_grand_total',
    width: 130,
    render: function totalPrice(items: any) {
      return <TotalPrice items={items} />;
    },
  },
  {
    title: 'Status',
    key: 'order_is_completed',
    width: 120,
    render: function status(item: any) {
      return <Status item={item} />;
    },
  },
  {
    title: 'Coupon',
    dataIndex: 'coupon_detail',
    key: 'coupon_detail',
    width: 120,
    render: function status(item: any) {
      return <Coupon item={item} />;
    },
  },

  {
    title: 'Actions',
    dataIndex: '',
    key: 'operations',
    width: 80,
    render: function actionsButton(item: any) {
      return <ActionsButton item={item} />;
    },
    className: 'operations-cell',
  },
];

export const Coupon: React.FC<{ item?: any }> = ({ item }) => {
  const { price } = usePrice({
    amount: item.coupon_max_discount,
    currencyCode: 'IDR',
  });
  return (
    <>
      {item ? (
        <div className="flex flex-col text-brand-dark">
          <span className="font-medium">{item.coupon_code}</span>
          <span className="opacity-75">{item.coupon_percentage}%</span>
          <span className="opacity-75">Max {price}</span>
        </div>
      ) : null}
    </>
  );
};

export const TotalProduct: React.FC<{ item?: any }> = ({ item }) => {
  return (
    <>
      {item ? (
        <span className=" text-brand-dark">{item.length} Product</span>
      ) : null}
    </>
  );
};
