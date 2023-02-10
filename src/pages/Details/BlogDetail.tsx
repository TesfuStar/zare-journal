/* eslint-disable no-lone-blocks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import {  useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const blogDetailsData = useQuery(
    ["getBlogDetailsDataApi", id],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}article/${id}`, {
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
  console.log(blogDetailsData?.data?.data?.data);
  return (
    <div className="max-w-7xl mx-auto p-3 py-4">
      {blogDetailsData.isFetched ? (
        <div className="flex flex-col items-start space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col items-start space-y-2">
              <p className="text-main-color text-[15px]">
                {blogDetailsData?.data?.data?.data?.published_at +
                  " " +
                  blogDetailsData?.data?.data?.data?.reading_time +
                  " "}
                to read
              </p>
              <h2 className="text-xl md:text-4xl font-bold">
                {blogDetailsData?.data?.data?.data?.title}
              </h2>
              <p className="text-gray-500 text-sm font-normal">
                {blogDetailsData?.data?.data?.data?.sub_heading}
              </p>
            </div>
            {/*  */}
            <div className=" flex items-center justify-center">
              <img
                src={
                  blogDetailsData?.data?.data?.data?.blog_cover?.original_url
                }
                alt=""
                className=""
              />
            </div>
          </div>
          {/* detail part */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-10">
            <div className="md:col-span-8 flex flex-col items-start space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {blogDetailsData?.data?.data?.data?.sub_heading}
              </h2>
              <p className="text-gray-500  font-normal">
                {blogDetailsData?.data?.data?.data?.body}
              </p>
              {/* comment */}
              <div className="flex w-full flex-col pt-3">
                <div className=" flex items-center justify-between">
                  <h2 className="text-lg  font-semibold ">Comment</h2>
                  <p className="font-medium text-main-color">See All</p>
                </div>
                <div className="flex flex-col items-start space-y-3 w-full">
                  {blogDetailsData?.data?.data?.data?.comments?.map(
                    (comment: any) => (
                      <div className="border p-3 rounded-sm border-dark-color/70 w-full">
                        <div className="flex items-center space-x-2">
                          <img
                            src={comment.author.profile_photo_url}
                            alt=""
                            className="rounded-full"
                          />
                          <div className="flex flex-col items-start space-y-1">
                            <h3 className="capitalize font-semibold">
                              {comment.author.name}
                            </h3>
                            <p className="text-main-color text-normal">
                              {comment.created_at}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-500">{comment.body}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
              {/* write comment */}
              <div className="flex flex-col items-start space-y-2 w-full">
                <h2 className="text-xl  font-bold ">Write Your Comment</h2>
                <textarea
                  name=""
                  id=""
                  rows={4}
                  className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
                ></textarea>
                <button
                  type="submit"
                  className="px-5 rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70  w-fit"
                >
                  comment
                </button>
              </div>
            </div>
            <div className="md:col-span-4"></div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BlogDetail;
