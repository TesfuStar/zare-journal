import React from "react";

const GridLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(16)
        .fill(0)
        .map((item) => (
          <div className="relative w-full  flex flex-col space-y-2  animate-pulse max-h-32 md:max-h-52 flex-shrink-0">
            <div className="relative bg-gray-200  w-full h-44 flex flex-col flex-grow rounded-md"></div>
            <div className="mt-2 bg-gray-200   w-20 h-3 rounded-md"></div>
            <div className="mt-2 bg-gray-200   w-20 h-3 rounded-md"></div>
            <div className=" bg-gray-200   left-3 w-[70%] h-3 rounded-md"></div>
          </div>
        ))}
    </div>
  );
};

export default GridLoading;
