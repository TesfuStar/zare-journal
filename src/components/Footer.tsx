import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
const Footer: React.FC = () => {
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
  return (
    <>
      <div className="max-w-7xl mx-auto border-y border-gray-300 p-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-2">
          <div className="flex flex-col items-start space-y-2">
            <img src={Logo} alt="" />
            <div className="flex flex-col items-start space-y-2 pt-3 text-[15px]">
              {categoriesData.isFetched &&
                categoriesData?.data?.data?.data
                  ?.slice(1, 5)
                  ?.map((category: any) => (
                    <p className="font-medium text-gray-500 cursor-pointer">
                      {" "}
                      {category.name}
                    </p>
                  ))}
            </div>
          </div>
          {/* 2nd grid */}
          <div className="flex flex-col items-start space-y-2">
            <h2 className="font-bold text-xl">More from Zare journal</h2>
            <p className="font-normal text-[15px] text-gray-500 cursor-pointer">
              Zare Journal is a Pan-African Digital Media based in Addis Ababa,
              Ethiopia, that aggregates news primarily on the African Continent.
              Follow us on our socials to get updates and even more Zare
              content.
            </p>
          </div>
          {/* 3rd grid */}
          <div>
            <p className=" font-bold text-xl ">
              Subscribe to Our Newsletter
            </p>

            <div className="mt-2 flex flex-col space-y-2">
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              />
              <button
                className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                     hover:bg-main-bg/80  w-full"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-1 flex items-center justify-center">
          <p className="text-sm font-medium text-gray-500 text-center">
            {new Date().getFullYear()} Zare Journal. All Right Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
