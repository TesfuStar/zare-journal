import React, { useEffect, useState } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";

interface Props {
  key: number;
  category: any;
  ClickHandler: any;
  mySet: any;
}
const CategoryCard = ({ category, ClickHandler, mySet }: Props) => {
  const [IsClicked, setIsClicked] = useState(false);
  useEffect(() => {
    if (IsClicked === false && mySet.size !== 0) {
      mySet.delete(category?.id);
    }
  }, [IsClicked]);
  return (
    <div
      onClick={() => {
        setIsClicked((prev) => !prev);
        ClickHandler(category);
      }}
      className={`relative overflow-hidden ${!category.category_image.original_url && "bg-gray-500"} cursor-pointer hover:scale-105 transition-all duration-500`}
    >
      <div className="absolute top-5 right-5 bg-white rounded-t-full p-1 rounded-full cursor-pointer">
        {IsClicked && (
          <BsFillPatchCheckFill className="text-red-500" size={15} />
        )}
      </div>
      <img
        src={category.category_image.original_url}
        alt=""
        className="h-28 w-full object-cover rounded-md "
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-600 to-transparent" />
      <h3 className="absolute bottom-2 left-2 text-white font-medium text-[15px]">
        {category.name}
      </h3>
      //{" "}
    </div>
  );
};

export default CategoryCard;
