/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";
import HomeGridLoading from "../../utils/HomeGridLoading";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { Footer } from "../../components";
import { useAuth } from "../../context/Auth";
import SubscribeBanner from "./components/SubscribeBanner";
import useHomeSection from "./components/useHomeSection";
import SearchPageLoading from "../../utils/SearchPageLoading";

const HomeSection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, blogs, hasMore, error, name, todayPick } = useHomeSection({
    pageNumber: currentPage,
    id: id,
  });
  console.log(blogs);

  //infinite scroll

  const observer = useRef<IntersectionObserver | null>(null);
  const lastBookElementRef = useCallback(
    (node: Element | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage((prevCurrentPage) => prevCurrentPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  //todays pick
  function TrendingStory() {
    return (
      <div className=" w-full">
        <div className="w-full hidden md:flex">
          <div className="grid grid-rows-5 grid-flow-col gap-4 w-full">
            {todayPick?.map((item: any, index: number) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className={`${
                  index === 0
                    ? "row-span-4 col-span-2 h-full w-full "
                    : index === 1
                    ? "row-span-2 "
                    : "row-span-2 "
                } flex flex-col items-start space-y-1 overflow-hidden w-full`}
              >
                {item.blog_cover.mime_type.includes("video") ? (
                  <div
                    className={` object-cover w-full hover:scale-105 duration-300 cursor-pointer ${
                      item.index === 0 ? "h-full " : "max-h-52 h-full "
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
                      index === 0 ? "h-[600px] " : "max-h-52 h-full "
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
        </div>
        {loading && (
          <div className="hidden md:grid grid-rows-5 grid-flow-col gap-4 animate-pulse w-full">
            <div className=" w-full row-span-4 col-span-2 bg-gray-200 dark:bg-gray-600 p-20"></div>
            <div className="  w-full row-span-2 bg-gray-200 dark:bg-gray-600 p-20"></div>
            <div className=" w-full row-span-2  bg-gray-200 dark:bg-gray-600 p-20"></div>
          </div>
        )}
        {/* for small screen */}
        <div className="flex md:hidden w-full">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {todayPick?.map((item: any) => (
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
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-bg">
      <Header />
      {/*  */}
      <div className="max-w-7xl mx-auto p-3 flex flex-col items-start space-y-3 w-full">
        {/* infinite scroll */}
        <h3 className="font-bold text-xl   text-center dark:text-gray-200">
          {name}
        </h3>
        <TrendingStory />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogs.map((blog, index) => {
            if (blogs.length === index + 1) {
              return (
                <div
                  ref={lastBookElementRef}
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  key={blog.id}
                  className="cursor-pointer overflow-hidden flex flex-col  items-start w-full "
                >
                  {blog.blog_cover.mime_type.includes("video") ? (
                    <div
                      className="h-full  md:h-44 cursor-pointer hover:scale-[1.03] w-36 md:w-56 
                      object-cover transition-all duration-500 ease-out"
                    >
                      <ReactPlayer
                        url={blog.blog_cover.original_url}
                        controls={true}
                        width={"100%"}
                        height={"100%"}
                      />
                    </div>
                  ) : (
                    <img
                      src={blog.blog_cover.original_url}
                      alt=""
                      className="h-full  md:h-44 cursor-pointer hover:scale-[1.03] w-36 md:w-56 
                   object-cover transition-all duration-500 ease-out"
                    />
                  )}

                  <div className="pt-2">
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 md:line-clamp-3">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                      {parse(blog.body)}
                    </p>
                    <p className="text-gray-400 text-sm font-light dark:text-gray-300">
                      {blog.created_at}
                    </p>
                    <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                      {blog.category.name}
                    </h4>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  onClick={() => navigate(`/blog/${blog.id}`)}
                  key={blog.id}
                  className="cursor-pointer overflow-hidden flex flex-col  items-start w-full "
                >
                  {blog.blog_cover.mime_type.includes("video") ? (
                    <div className="w-full">
                      <ReactPlayer
                        url={blog.blog_cover.original_url}
                        controls={true}
                        width={"100%"}
                        height={"100%"}
                        light={
                          <img
                            src={blog.thumbnail.original_url}
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
                      src={blog.blog_cover.original_url}
                      alt=""
                      className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                      // className="w-full"
                    />
                  )}
                  <div className="pt-2">
                    <h3 className="font-bold text-gray-900 line-clamp-1 md:line-clamp-2 dark:text-white">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                      {parse(blog.body)}
                    </p>
                    <p className="text-gray-400 text-sm font-light dark:text-gray-300">
                      {blog.created_at}
                    </p>
                    <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                      {blog.category.name}
                    </h4>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="w-full">{loading && <GridLoading />}</div>
        <div>{error && "Error"}</div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeSection;
