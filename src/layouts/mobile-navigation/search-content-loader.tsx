import ContentLoader from 'react-content-loader';

export default function SearchResultLoaderMobile(props: any) {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-start">
      <div className="animate-pulse flex space-x-4 w-full">
        <div className="rounded-lg bg-gray-200 h-14 w-14" />
        <div className="rounded-lg bg-gray-200 h-14 w-full" />
      </div>
    </div>
  );
}
