export default function MovieDetailsSkeleton() {
  return (
    <div className="rounded-lg border p-6 mb-8  bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
        <div className="lg:col-span-1 ">
          <div className=" border-none overflow-hidden aspect-2/3  bg-gray-200 dark:bg-gray-700">
            <img className="w-full h-full object-fill" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="w-60 h-8 bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div className="w-15 h-6 bg-gray-200 dark:bg-gray-700 mb-4"></div>
          <div className="flex gap-4">
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 mb-4"></div>
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 mb-4"></div>
            <div className="w-20 h-6 bg-gray-200 dark:bg-gray-700 mb-4"></div>
          </div>
          <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 mb-2"></div>
          <div className="w-60 h-8 bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
