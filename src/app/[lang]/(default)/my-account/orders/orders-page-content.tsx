'use client';

import { useOrdersQuery } from '@framework/order/get-all-orders';
import { Table } from '@components/ui/table';
import OrderTable, { CreatedAt, Status } from '@components/order/order-table';
import Alert from '@components/ui/alert';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import { TotalPrice } from '@components/order/price';
import ActionsButton from '@components/ui/action-button';
import usePrice from '@framework/product/use-price';

export default function OrdersPageContent({ lang }: { lang: string }) {
  // const { data, isLoading } = useOrdersQuery({});
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useOrdersQuery({
    page: 1,
    limit: 25,
    sort: 'desc',
  });
  console.log(data?.pages);

  return (
    <div>
      {error ? (
        <div className="col-span-full">
          <Alert message={error?.message} />
        </div>
      ) : isLoading && !data?.pages?.length ? (
        Array.from({ length: 3 }).map((_, idx) => (
          <ProductCardLoader
            key={`order--key-${idx}`}
            uniqueKey={`order--key-${idx}`}
          />
        ))
      ) : data?.pages ? (
        data.pages.map((page, pageIndex) => (
          <div
            key={`order-table-${pageIndex}`}
            className="order-list-table-wraper"
          >
            <Table
              className="order-list-table "
              columns={columns}
              data={page.data}
              rowKey="order_id"
              scroll={{ x: 750 }}
            />
          </div>
        ))
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
    title: 'Address',
    dataIndex: 'order_address',
    key: 'order_address',
    width: 160,
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
