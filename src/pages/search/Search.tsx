import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Search: React.FC = () => {
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const searchPageData = useQuery(
    ["getSearchPageDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}articles`, {
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
    <div className="max-w-7xl mx-auto w-full flex flex-col">
      <div className="flex flex-col items-center justify-center py-10">
        <h3 className="font-bold text-xl md:text-3xl pb-10">Search articles</h3>

        <div className="pl-3 max-w-5xl border-2 border-dark-color max-auto w-full flex flex-grow items-center h-12 ">
          <BiSearch className=" text-xl h-full flex text-gray-500" />
          <input
            type="text"
            placeholder="Search blogs, news, categories"
            className="w-full p-2 h-full rounded-sm border-none focus:outline-none ring-0"
          />
          <button className="text-white font-medium px-5 hover:bg-red-500/70  bg-red-500 h-full">
            search
          </button>
        </div>
      </div>

      {/* results */}
      <div className="flex flex-col items-center justify-center py-10">
        <h3 className="font-bold text-xl md:text-3xl pb-10">Results</h3>
        {searchPageData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-8 flex flex-col items-start space-y-4">
              {searchPageData?.data?.data?.data?.business_investment?.map(
                (item: any) => (
                  <div
                    onClick={() => navigate(`/blog/${item.id}`)}
                    key={item.id}
                    className="flex items-start space-x-2 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.blog_cover.original_url}
                      alt=""
                      className=" h-64 cursor-pointer hover:scale-[1.03] max-w-64 lg:w-80 w-full
                  object-cover transition-all duration-500 ease-out "
                    />
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm font-normal line-clamp-2">
                        {item.body}
                      </p>
                      <p className="text-gray-400 text-sm font-light">
                        {item.created_at}
                      </p>
                      <h4 className=" text-[15px] p-1 cursor-pointer">
                        {item.category.name}
                      </h4>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* most popular */}
            <div className="md:col-span-8"></div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Search;
