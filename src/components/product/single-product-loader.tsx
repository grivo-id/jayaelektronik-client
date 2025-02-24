export default function SingleProductLoader() {
  return (
    <div className="w-full flex flex-col my-4 md:my-8 gap-4 items-center justify-start">
      <div className="animate-pulse flex gap-4 w-full flex-col lg:flex-row justify-center">
        <div className="rounded-lg bg-gray-200 h-full min-h-[30rem] w-full " />
        <div className="rounded-lg bg-gray-200 h-full min-h-[30rem] w-full" />
      </div>
    </div>
  );
}
