import React from "react";

const HomeGridLoading = () => {
  return (
    <div className="grid grid-rows-5 grid-flow-col gap-4 animate-pulse mb-4 w-full">
      <div className="row-span-2 col-span-2 relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
        <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-44 flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
      </div>
      <div className="row-span-3 col-span-2 relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
        <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-44 flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
      </div>
      {/* center */}
      <div className="row-span-5 col-span-3 relative w-full h-full flex flex-col space-y-2  animate-pulse flex-shrink-0">
        <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-full flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
      </div>
      {/* fourth */}
      <div className="row-span-2 col-span-2 relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
        <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-44 flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
      </div>
      {/* fifth */}
      <div className="row-span-3 col-span-2 relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
        <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-44 flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
        <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
      </div>
    </div>
  );
};

export default HomeGridLoading;
