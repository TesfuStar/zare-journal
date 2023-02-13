import React from "react";

const SearchPageLoading = () => {
  //0953855698
  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
      <div className="md:col-span-8 relative w-full  flex flex-col space-y-2  animate-pulse max-h-44 md:max-h-[500px] flex-shrink-0">
        {Array(5)
          .fill(0)
          .map((item) => (
            <div className="flex items-start space-x-2 w-full">
              <div className=" bg-gray-200   w-96 h-44 rounded-md"></div>
              <div className="flex flex-col items-start space-y-2 w-full">
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
      <div className="md:col-span-4 w-full flex flex-col space-y-2 animate-pulse">
        {Array(8)
          .fill(0)
          .map((item) => (
            <div className="flex items-start space-x-2 w-full">
              <div className=" bg-gray-200   w-44 h-28 rounded-md"></div>
              <div className="flex flex-col items-start space-y-2 w-full">
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
                <div className=" bg-gray-200   w-full h-4 rounded-md"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchPageLoading;
