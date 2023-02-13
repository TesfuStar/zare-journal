import React from "react";

const DetailsLoading = () => {
  return (
    <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3">
      <div className="md:col-span-8 relative w-full  flex flex-col space-y-2  animate-pulse max-h-44 md:max-h-[500px] flex-shrink-0">
        <div className="relative bg-gray-200  w-full h-64 flex flex-col flex-grow rounded-md"></div>
        <div className="mt-2 bg-gray-200   w-[70%] h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200    w-[70%] h-3 rounded-md"></div>
        <div className="mt-2 bg-gray-200   w-[70%] h-3 rounded-md"></div>
      </div>
      <div className="md:col-span-4 w-full flex flex-col space-y-2">
        <div className="mt-2 bg-gray-200   w-full h-20 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[60%] h-3 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[50%] h-2 rounded-md"></div>
        <div className="mt-2 bg-gray-200   w-full h-20 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[60%] h-3 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[50%] h-2 rounded-md"></div>
        <div className="mt-2 bg-gray-200   w-full h-20 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[60%] h-3 rounded-md"></div>
        <div className=" bg-gray-200   left-3 w-[50%] h-2 rounded-md"></div>
      </div>
    </div>
  );
};

export default DetailsLoading;
