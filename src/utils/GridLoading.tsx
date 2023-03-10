import React from "react";

const GridLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {Array(16)
        .fill(0)
        .map((item) => (
          <div className="relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
            <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-56 flex flex-col flex-grow rounded-md"></div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
            <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
          </div>
        ))}
    </div>
  );
};

export default GridLoading;
