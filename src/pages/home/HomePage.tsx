/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";
import HomeGridLoading from "../../utils/HomeGridLoading";

const HomePage: React.FC = () => {
  const [todaysPick, setTodaysPick] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const homePageData = useQuery(
    ["getHomePageDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}articles`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {
        setTodaysPick(
          res?.data?.data?.todays_pick?.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          }))
        );
      },
      onError: (err) => {
        setError("something went wrong!");
      },
    }
  );

  const Error = () => {
    return (
      <div className="flex items-center justify-center">
        <h1 className="font-semibold text-xl text-center">{error}</h1>
      </div>
    );
  };
  //trending
  function TrendingStory() {
    return (
      <>
        <div className="border-b border-gray-300 flex items-center justify-between pb-2 mb-4 ">
          <h2 className="font-bold text-xl">Trending Stories</h2>
          <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
            <AiOutlineArrowRight className="text-white" />
          </div>
        </div>

        {homePageData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3">
            {homePageData?.data?.data?.data?.trending?.map((item: any) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className="flex flex-col items-start cursor-pointer overflow-hidden"
              >
                <img
                  src={item.blog_cover.original_url}
                  alt=""
                  className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                  // className="w-full"
                />
                <p className="text-gray-400 text-sm font-light pt-3">
                  {item.created_at}
                </p>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm font-normal line-clamp-2">
                  {item.body}
                </p>
                <h4 className=" text-[15px] p-1 cursor-pointer">
                  {item.category.name}
                </h4>
              </div>
            ))}
          </div>
        ) : (
          <GridLoading />
        )}
        {error && <Error />}
      </>
    );
  }
  //business_investment
  function BusinessInvestment() {
    return (
      <>
        <div className="border-b border-gray-300 flex items-center justify-between pb-2 mb-4">
          <h2 className="font-bold text-xl">Business & investment</h2>
          <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
            <AiOutlineArrowRight className="text-white" />
          </div>
        </div>

        {homePageData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3">
            {homePageData?.data?.data?.data?.business_investment?.map(
              (item: any) => (
                <div
                  onClick={() => navigate(`/blog/${item.id}`)}
                  key={item.id}
                  className="cursor-pointer overflow-hidden flex flex-col items-start"
                >
                  <img
                    src={item.blog_cover.original_url}
                    alt=""
                    className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                    // className="w-full"
                  />
                  <p className="text-gray-400 text-sm font-light pt-3">
                    {item.created_at}
                  </p>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-normal line-clamp-2">
                    {item.body}
                  </p>
                  <h4 className=" text-[15px] p-1 cursor-pointer">
                    {item.category.name}
                  </h4>
                </div>
              )
            )}
          </div>
        ) : (
          <GridLoading />
        )}
        {error && <Error />}
      </>
    );
  }

  //videos
  function Videos() {
    return (
      <>
        <div className="border-b border-gray-300 flex items-center justify-between pb-2 mb-4">
          <h2 className="font-bold text-xl">Videos</h2>
          <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
            <AiOutlineArrowRight className="text-white" />
          </div>
        </div>

        {homePageData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3">
            {homePageData?.data?.data?.data?.business_investment?.map(
              (item: any) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/blog/${item.id}`)}
                  className="cursor-pointer overflow-hidden flex flex-col items-start"
                >
                  <img
                    src={item.blog_cover.original_url}
                    alt=""
                    className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                    // className="w-full"
                  />
                  <p className="text-gray-400 text-sm font-light pt-3">
                    {item.created_at}
                  </p>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-normal line-clamp-2">
                    {item.body}
                  </p>
                  <h4 className=" text-[15px] p-1 cursor-pointer">
                    {item.category.name}
                  </h4>
                </div>
              )
            )}
          </div>
        ) : (
          <GridLoading />
        )}
        {error && <Error />}
      </>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-2 pt-6">
      {/* todays pick */}
      {homePageData.isFetched ? (
        <>
          <h1 className="border-b border-gray-300 font-bold mb-3 text-lg ">
            Today’s Pick
          </h1>
          <div className="hidden md:grid grid-rows-5 grid-flow-col gap-3 ">
            {todaysPick?.map((item: any, index: number) => (
              <div
                onClick={() => navigate(`/blog/${item.id}`)}
                key={index}
                className={`${
                  index === 0
                    ? "row-span-2  col-span-2 "
                    : index === 1
                    ? "row-span-3 col-span-2 "
                    : index === 2
                    ? "row-span-5 col-span-5 h-full "
                    : index === 3
                    ? "row-span-2 col-span-2"
                    : index === 4 && " row-span-3 col-span-2"
                } flex flex-col items-start space-y-1 overflow-hidden`}
              >
                <img
                  src={item.blog_cover.original_url}
                  alt=""
                  className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                    item.index === 3 ? "h-auto " : "max-h-56 h-full "
                  }`}
                  // className="w-full"
                />
                <p className="text-gray-400 text-sm font-light">
                  {item.created_at}
                </p>
                <h3
                  className={`font-bold text-gray-900 ${
                    item.index === 3 ? "text-5xl " : " "
                  } `}
                >
                  {item.title}
                </h3>
                <h4 className="border border-gray-300 text-[15px] p-1 cursor-pointer">
                  {item.category.name}
                </h4>
              </div>
            ))}
          </div>
          {/* for small screen */}
          <div className=" md:hidden grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3">
            {todaysPick?.map((item: any) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className="cursor-pointer overflow-hidden flex flex-col items-start"
              >
                <img
                  src={item.blog_cover.original_url}
                  alt=""
                  className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                  // className="w-full"
                />
                <p className="text-gray-400 text-sm font-light pt-3">
                  {item.created_at}
                </p>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 text-sm font-normal line-clamp-2">
                  {item.body}
                </p>
                <h4 className=" text-[15px] p-1 cursor-pointer">
                  {item.category.name}
                </h4>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className=" w-full hidden md:flex">
            <HomeGridLoading />
          </div>
          <div className="w-full flex md:hidden">
            <GridLoading />
          </div>
        </>
      )}
      {error && <Error />}
      <TrendingStory />
      <BusinessInvestment />
      <Videos />
    </div>
  );
};

export default HomePage;
