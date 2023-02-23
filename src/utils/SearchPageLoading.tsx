import React from "react";

const SearchPageLoading = () => {
  return (
    <div className=" w-full h-full">
      <div className=" w-full flex flex-col space-y-2  animate-pulse ">
        {Array(5)
          .fill(0)
          .map((item) => (
            <div className="flex items-start space-x-2 w-full">
              <div className=" bg-gray-200 dark:bg-gray-600   w-96 h-44 rounded-md "></div>
              <div className="flex flex-col items-start space-y-2 w-full">
                <div className=" bg-gray-200 dark:bg-gray-600   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200 dark:bg-gray-600   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200 dark:bg-gray-600   w-full h-4 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPageLoading;
