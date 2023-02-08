import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Navbar: React.FC = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const categoriesData = useQuery(
    ["getCategoriesDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}categories`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {},
    }
  );

  console.log(categoriesData?.data?.data);
  return (
    <>
      <Header />
      <div className="bg-white">
        {categoriesData.isFetched ? (
          <div className="max-w-7xl mx-auto flex items-center overflow-x-hidden  p-2">
            <div className=" flex items-center space-x-8 overflow-x-hidden flex-grow">
              {categoriesData?.data?.data?.data?.map((category: any) => (
                <NavLink
                  to={""}
                  // className={({ isActive }) => [
                  //   "group flex items-center  text-base font-medium rounded-md",
                  //   isActive ? " text-red-600  text-lg " : "",
                  // ]}
                  className="group whitespace-nowrap flex items-center 
                 text-[15px] font-medium rounded-md"
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
            {/* <div className="absolute top-0 right-0 bg-gradient-to-l from-black h-10 w-1/2"/> */}
            <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
              <BsThreeDotsVertical className="text-white" />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default Navbar;
