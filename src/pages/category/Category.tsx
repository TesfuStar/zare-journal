/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { Footer } from "../../components";
import { Helmet } from "react-helmet";

interface Trending {
  title: string;
  body: string;
  sub_heading: string;
  blog_cover: {
    original_url: string;
  };
}
const Category: React.FC = () => {
  const { id } = useParams();
  const [trendingStory, setTrendingStory] = useState<Trending[]>([]);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const blogCategoryData = useQuery(
    ["getBlogCategoryDataApi", id],
    async () =>
      await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}article-by-category/${id}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res: any) => {
        setTrendingStory(
          res?.data?.data?.todays_pick?.map((item: any, index: number) => ({
            ...item,
            index: index + 1,
          }))
        );
      },
    }
  );
  console.log(trendingStory[0]?.sub_heading);
  function TrendingStory() {
    return (
      <div>
        {(blogCategoryData?.isFetched && blogCategoryData?.isSuccess) && (
          <Helmet>
            <title>ZareJournal-{trendingStory[0]?.title}</title>
            <meta
              name="description"
              content={`${trendingStory[0]?.sub_heading}`}
            />
            <meta
              property="og:image"
              content={trendingStory[0]?.blog_cover?.original_url}
            />
          </Helmet>
        )}
        <h2 className="font-bold text-xl py-5 dark:text-white">
          {blogCategoryData?.data?.data?.data?.category?.name}
        </h2>
        <div className="w-full hidden md:flex">
          {blogCategoryData?.isFetched ? (
            <div className="grid grid-rows-5 grid-flow-col gap-4 w-full">
              {trendingStory?.slice(0, 3)?.map((item: any, index: number) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/blog/${item.id}`)}
                  className={`${
                    index === 0
                      ? "row-span-4 col-span-2 h-full w-full"
                      : index === 1
                      ? "row-span-2 "
                      : "row-span-2 "
                  } flex flex-col items-start space-y-1 overflow-hidden w-full`}
                >
                  {item.blog_cover.mime_type.includes("video") ? (
                    <div
                      className={` object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                        item.index === 1 ? "h-auto " : "max-h-52 h-full "
                      } `}
                    >
                      <ReactPlayer
                        url={item.blog_cover.original_url}
                        controls={true}
                        width={"100%"}
                        height={"100%"}
                        light={
                          <img
                            src={item.thumbnail.original_url}
                            alt="My video thumbnail"
                            className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                          />
                        }
                        style={{ backgroundImage: "none" }}
                        // playIcon={<button>Play</button>}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.blog_cover.original_url}
                      alt=""
                      className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                        item.index === 1 ? "h-auto " : "max-h-52 h-full "
                      }`}
                    />
                  )}
                  <p className="text-gray-400  dark:text-gray-300 text-sm font-light pt-3">
                    {item.created_at}
                  </p>
                  <h3
                    className={`font-bold text-gray-900 dark:text-white ${
                      item.index === 1 ? "text-5xl " : " "
                    } `}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                    {parse(item.body)}
                  </p>
                  <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-200">
                    {item.category.name}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-rows-5 grid-flow-col gap-4 animate-pulse w-full">
              <div className="row-span-4 col-span-2 bg-gray-200 dark:bg-gray-600 p-20"></div>
              <div className=" row-span-2 bg-gray-200 dark:bg-gray-600 p-20"></div>
              <div className="row-span-2  bg-gray-200 dark:bg-gray-600 p-20"></div>
            </div>
          )}
        </div>
        {/* for small screen */}
        <div className="flex md:hidden w-full">
          {blogCategoryData?.isFetched ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:hidden">
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {blogCategoryData?.data?.data?.data?.todays_pick?.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/blog/${item.id}`)}
                      className="cursor-pointer overflow-hidden flex flex-col items-start "
                    >
                      {item.blog_cover.mime_type.includes("video") ? (
                        <div className="w-full ">
                          <ReactPlayer
                            url={item.blog_cover.original_url}
                            controls={true}
                            width={"100%"}
                            height={"224px"}
                          />
                        </div>
                      ) : (
                        <img
                          src={item.blog_cover.original_url}
                          alt=""
                          className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                          // className="w-full"
                        />
                      )}
                      <p className="text-gray-400 text-sm font-light pt-3">
                        {item.created_at}
                      </p>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm font-normal line-clamp-2">
                        {parse(item.body)}
                      </p>
                      <h4 className=" text-[15px] p-1 cursor-pointer">
                        {item.category.name}
                      </h4>
                    </div>
                  )
                )}
              </div>
            </div>
          ) : (
            <GridLoading />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Header />
      <div className="max-w-7xl mx-auto p-3">
        {blogCategoryData?.isFetched ? (
          <div>
            <TrendingStory />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {blogCategoryData?.data?.data?.data?.by_category?.map(
                  (item: any) => (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/blog/${item.id}`)}
                      className="cursor-pointer overflow-hidden flex flex-col items-start "
                    >
                      {item.blog_cover.mime_type.includes("video") ? (
                        <div className="w-full ">
                          <ReactPlayer
                            url={item.blog_cover.original_url}
                            controls={true}
                            width={"100%"}
                            height={"224px"}
                          />
                        </div>
                      ) : (
                        <img
                          src={item.blog_cover.original_url}
                          alt=""
                          className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                          // className="w-full"
                        />
                      )}
                      <p className="text-gray-400 text-sm font-light pt-3 dark:text-gray-300">
                        {item.created_at}
                      </p>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                        {parse(item.body)}
                      </p>
                      <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                        {item.category.name}
                      </h4>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        ) : (
          <GridLoading />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Category;

{
  /* <div className="grid grid-rows-5 grid-flow-col gap-4">
<div className="row-span-4 col-span-2 bg-red-500 p-3">01</div>
<div className=" row-span-2 bg-red-500 p-3">02</div>
<div className="row-span-2  bg-red-500 p-3">03</div>
</div> */
}
