/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";
import HomeGridLoading from "../../utils/HomeGridLoading";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { Footer } from "../../components";
import { useAuth } from "../../context/Auth";
import SubscribeBanner from "./components/SubscribeBanner";
const HomePage: React.FC = () => {
  const { user } = useAuth();
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

  console.log(homePageData?.data?.data?.data);
  const Error = () => {
    return (
      <div className="flex items-center justify-center py-10">
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
                {item.blog_cover.mime_type.includes("video") ? (
                  <div className="">
                    <ReactPlayer
                      url={item.blog_cover.original_url}
                      controls={true}
                      width={"100%"}
                      height={"100%"}
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
            ))}
          </div>
        ) : (
          <GridLoading />
        )}
        {error && <Error />}
      </>
    );
  }
  //MostRecent
  function MostRecent() {
    return (
      <>
        {homePageData.isFetched ? (
          <div className="flex flex-col items-start space-y-2 gap-3">
            {homePageData?.data?.data?.data?.most_recent?.map((item: any) => (
              <div
                onClick={() => navigate(`/blog/${item.id}`)}
                key={item.id}
                className="cursor-pointer overflow-hidden flex  items-center w-full border-b border-gray-300 dark:border-gray-500"
              >
                <div className="flex flex-col items-start flex-grow ">
                  <h4 className=" text-[15px]  cursor-pointer font-medium dark:text-gray-300">
                    {item.category.name}
                  </h4>
                  <p className="text-gray-400 text-sm font-light pt-3 dark:text-gray-300">
                    {item.created_at}
                  </p>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
                {item.blog_cover.mime_type.includes("video") ? (
                  <div className="flex items-end justify-end self-end">
                    <ReactPlayer
                      url={item.blog_cover.original_url}
                      light={
                        <img
                          src={item.thumbnail.original_url}
                          alt="My video thumbnail"
                          className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                        />
                      }
                      controls={true}
                      width={"80px"}
                      height={"80px"}
                    />
                  </div>
                ) : (
                  <img
                    src={item.blog_cover.original_url}
                    alt=""
                    className="object-cover w-20 h-20 hover:scale-105 duration-300"
                    // className="w-full"
                  />
                )}
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

  //videos
  function Videos() {
    return (
      <>
        <div className="border-b border-gray-300 flex items-center justify-between pb-2 mb-4">
          <h2 className="font-bold text-xl pt-4 dark:text-white">Videos</h2>
          <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
            <AiOutlineArrowRight className="text-white" />
          </div>
        </div>

        {homePageData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3">
            {homePageData?.data?.data?.data?.videos?.map((item: any) => (
              <div
                key={item.id}
                onClick={() =>
                  !item.blog_cover.mime_type.includes("video") &&
                  navigate(`/blog/${item.id}`)
                }
                className="cursor-pointer overflow-hidden flex flex-col items-start  w-full"
              >
                {item.blog_cover.mime_type.includes("video") ? (
                  <div className="w-full">
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
                    className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                    // className="w-full"
                  />
                )}

                <p className="text-gray-400 text-sm font-light pt-3 dark:text-gray-300">
                  {item.created_at}
                </p>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-300">
                  {parse(item.body)}
                </p>
                <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
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
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Header />
      <div className="max-w-7xl mx-auto p-2 pt-6">
        {/* todays pick */}
        {homePageData.isFetched ? (
          <>
            <h1 className="border-b border-gray-300 font-bold mb-3 text-lg dark:text-gray-100">
              Today’s Pick
            </h1>
            <div className="hidden md:grid grid-col-1 md:grid-cols-12 gap-3 md:gap-5 order-last">
              <div className="md:col-span-8 grid grid-rows-4 grid-flow-col gap-3 ">
                {todaysPick?.map((item: any, index: number) => (
                  <div
                    onClick={() =>
                      !item.blog_cover.mime_type.includes("video") &&
                      navigate(`/blog/${item.id}`)
                    }
                    key={index}
                    className={`${
                      index === 0
                        ? "row-span-2 w-52"
                        : index === 1
                        ? "row-span-2 w-52"
                        : "row-span-4 h-full w-full"
                    } flex flex-col items-start space-y-1 overflow-hidden`}
                  >
                    {item.blog_cover.mime_type.includes("video") ? (
                      <div
                        className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                          item.index === 2 ? "h-auto " : "max-h-56 h-full "
                        }`}
                      >
                        <ReactPlayer
                          url={item.blog_cover.original_url}
                          light={
                            <img
                              src={item.thumbnail.original_url}
                              alt="My video thumbnail"
                              className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                                item.index === 3
                                  ? "h-auto "
                                  : "max-h-56 h-full "
                              }`}
                            />
                          }
                          controls={true}
                          width={"100%"}
                          height={"100%"}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.blog_cover.original_url}
                        alt=""
                        className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                          item.index === 3
                            ? "h-auto bg-red-500"
                            : "max-h-56 h-full bg-amber-500 "
                        }`}
                        // className="w-full"
                      />
                    )}
                    <p className="text-gray-400 dark:text-gray-300 text-sm font-light pt-3">
                      {item.created_at}
                    </p>
                    <h3
                      className={`font-semibold text-gray-900 dark:text-white ${
                        item.index === 3 ? "md:text-3xl lg:text-6xl " : " "
                      } `}
                    >
                      {item.title}
                    </h3>
                    <h4 className=" text-[15px] p-1 cursor-pointer line-clamp-2 dark:text-gray-200">
                      {item.index === 3 && item.sub_heading}
                    </h4>
                    <h4 className="border border-gray-300 text-[15px] p-1 cursor-pointer dark:text-gray-200">
                      {item.category.name}
                    </h4>
                  </div>
                ))}
              </div>
              <div className="md:col-span-4 w-full">
                <MostRecent />
              </div>
              {/* most recent */}
            </div>
            {/* for small screen */}
            <div className="flex flex-col items-start space-y-2 md:hidden">
              <div className="  grid grid-cols-1 gap-3 order-first">
                {todaysPick?.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/blog/${item.id}`)}
                    className="cursor-pointer overflow-hidden flex flex-col items-start"
                  >
                        {item.blog_cover.mime_type.includes("video") ? (
                      <div
                        className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                          item.index === 2 ? "h-auto " : "max-h-56 h-full "
                        }`}
                      >
                        <ReactPlayer
                          url={item.blog_cover.original_url}
                          light={
                            <img
                              src={item.thumbnail.original_url}
                              alt="My video thumbnail"
                              className={`object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                                item.index === 3
                                  ? "h-auto "
                                  : "max-h-56 h-full "
                              }`}
                            />
                          }
                          controls={true}
                          width={"100%"}
                          height={"100%"}
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
                  
                    <p className="text-gray-400 dark:text-gray-300 text-sm font-light pt-3">
                      {item.created_at}
                    </p>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm font-normal line-clamp-2">
                      {parse(item.body)}
                    </p>
                    <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                      {item.category.name}
                    </h4>
                  </div>
                ))}
              </div>
              <MostRecent />
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
        <div>
          {homePageData?.data?.data?.data?.homepages?.map(
            (home: any) =>
              home.articles?.length > 0 && (
                <div>
                  <div className="border-b border-gray-300 dark:border-gray-500 flex items-center justify-between pb-2 mb-4">
                    <h2 className="font-bold text-xl pt-4 capitalize dark:text-white">
                      {home.name}
                    </h2>
                    <div className="bg-main-bg p-2 rounded-sm cursor-pointer">
                      <AiOutlineArrowRight className="text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {home.articles?.map((article: any) => (
                      <div
                        key={article.id}
                        onClick={() => navigate(`/blog/${article.id}`)}
                        className="relative flex flex-col items-start cursor-pointer overflow-hidden"
                      >
                        {article.blog_cover.mime_type.includes("video") ? (
                          <div className="w-full">
                            <ReactPlayer
                              url={article.blog_cover.original_url}
                              light={
                                <img
                                  src={article.thumbnail.original_url}
                                  alt="My video thumbnail"
                                  className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                                />
                              }
                              controls={true}
                              width={"100%"}
                              height={"100%"}
                            />
                          </div>
                        ) : (
                          <img
                            src={article.blog_cover.original_url}
                            alt=""
                            className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                            // className="w-full"
                          />
                        )}
                        <p className="text-gray-400 text-sm font-light pt-3 dark:text-gray-300">
                          {article.created_at}
                        </p>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-300">
                          {parse(article.body)}
                        </p>
                        <h4 className="font-medium flex items-end justify-end text-[15px] p-1 cursor-pointer dark:text-gray-300 pt-3">
                          {article.category.name}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
        {/* <TrendingStory /> */}
        <Videos />
      </div>
      {!user?.subscribed && <SubscribeBanner />}
      <Footer />
    </div>
  );
};

export default HomePage;

{
  /* <Player
                    autoPlay
                    poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    
                  >
                    <ControlBar autoHide={false} disableDefaultControls={true}>
                      <PlayToggle />
                    </ControlBar>
                  </Player> */
}
