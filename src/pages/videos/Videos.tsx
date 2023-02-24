/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { Footer } from "../../components";
import { useAuth } from "../../context/Auth";
import SearchPageLoading from "../../utils/SearchPageLoading";
import { Helmet } from "react-helmet";
import useVideos from "./components/useVideos";

const Videos = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const { loading, videos, hasMore, error } = useVideos({
    pageNumber: currentPage,
  });
  //infinite scroll

  const observer = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useCallback(
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
  console.log(videos);
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Header />
      <div className="max-w-7xl mx-auto p-3  w-full py-14">
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-3 w-full">
          {videos?.map((video, index) => {
            if (videos.length === index + 1) {
              return (
                <div
                  key={index}
                  ref={lastVideoElementRef}
                  onClick={() => navigate(`/video/${video.slug}`)}
                  className="cursor-pointer overflow-hidden flex flex-col items-start  w-full"
                >
                  <div className="w-full">
                    <ReactPlayer
                      url={video.blog_cover.original_url}
                      controls={true}
                      width={"100%"}
                      height={"224px"}
                      light={
                        <img
                          src={video.thumbnail.original_url}
                          alt="My video thumbnail"
                          className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                        />
                      }
                      style={{ backgroundImage: "none" }}
                      // playIcon={<button>Play</button>}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 md:line-clamp-3">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                      {parse(video.body)}
                    </p>
                    <p className="text-gray-400 text-sm font-light dark:text-gray-300">
                      {video.created_at}
                    </p>
                    <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                      {video.category.name}
                    </h4>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={index}
                  onClick={() => navigate(`/video/${video.slug}`)}
                  className="cursor-pointer overflow-hidden flex flex-col items-start  w-full"
                >
                  <div className="w-full">
                    <ReactPlayer
                      url={video.blog_cover.original_url}
                      controls={true}
                      width={"100%"}
                      height={"224px"}
                      light={
                        <img
                          src={video.thumbnail.original_url}
                          alt="My video thumbnail"
                          className="object-cover w-full max-h-56 h-full hover:scale-105 duration-300"
                        />
                      }
                      style={{ backgroundImage: "none" }}
                      // playIcon={<button>Play</button>}
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 md:line-clamp-3">
                      {video.title}
                    </h3>
                    <p className="text-gray-600 text-sm font-normal line-clamp-2 dark:text-gray-200">
                      {parse(video.body)}
                    </p>
                    <p className="text-gray-400 text-sm font-light dark:text-gray-300">
                      {video.created_at}
                    </p>
                    <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-300">
                      {video.category.name}
                    </h4>
                  </div>
                </div>
              );
            }
          })}
        </div>
        {loading && <GridLoading />}
      </div>

      <Footer />
    </div>
  );
};

export default Videos;
