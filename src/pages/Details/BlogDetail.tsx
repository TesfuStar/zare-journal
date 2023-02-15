/* eslint-disable no-lone-blocks */
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { useHome } from "../../context/HomeContext";
import { ToastContainer, toast, Slide, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PulseLoader } from "react-spinners";
import DetailsLoading from "../../utils/DetailsLoading";
import parse from "html-react-parser";
import ReactPlayer from "react-player";
const BlogDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth();
  const { setIsSignInModalOpen } = useHome();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const [commentValue, setCommentValue] = useState<string>("");
  const [success, setSuccess] = useState<number>(1);
  const [seeAllComments, setSeeAllComments] = useState<boolean>(false);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const header = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const blogDetailsData = useQuery(
    ["getBlogDetailsDataApi", id, success],
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
  console.log(blogDetailsData?.data?.data);
  //
  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user && !token) {
      setIsSignInModalOpen(true);
      return;
    }
    if (commentRef.current?.value) {
      return;
    }

    commentSubmitHandler();
  };
  const commentMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}comments`,
        newData,
        {
          headers: header,
        }
      ),
    {
      retry: false,
    }
  );

  const commentSubmitHandler = async () => {
    try {
      commentMutation.mutate(
        { body: commentValue, user_id: user.id, blog_id: id },
        {
          onSuccess: (responseData: any) => {
            setCommentValue("");
            setSuccess((prev) => prev + 1);
            toast.info("success", options);
          },
          onError: (err: any) => {
            // setError("Incorrect Email or Password");
          },
        }
      );
    } catch (err) {}
  };
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };
  return (
    <div className="max-w-7xl mx-auto p-3 py-4">
      {blogDetailsData.isFetched && blogDetailsData.isSuccess ? (
        <div className="flex flex-col items-start space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col items-start space-y-2">
              <p className="text-main-color text-[15px]">
                {blogDetailsData?.data?.data?.data?.blog?.published_at +
                  " " +
                  blogDetailsData?.data?.data?.data?.blog?.reading_time +
                  " "}
                to read
              </p>
              <h2 className="text-xl md:text-4xl font-bold">
                {blogDetailsData?.data?.data?.data?.blog?.title}
              </h2>
              <p className="text-gray-500 text-sm font-normal">
                {blogDetailsData?.data?.data?.data?.blog?.sub_heading}
              </p>
            </div>
            {/*  */}
            <div className=" flex items-center justify-center">
              {blogDetailsData?.data?.data?.data?.blog.blog_cover.mime_type.includes(
                "video"
              ) ? (
                <div className="w-full">
                  <ReactPlayer
                    url={
                      blogDetailsData?.data?.data?.data?.blog?.blog_cover
                        ?.original_url
                    }
                    controls={true}
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              ) : (
                <img
                  src={
                    blogDetailsData?.data?.data?.data?.blog?.blog_cover
                      ?.original_url
                  }
                  alt=""
                  className="max-h-80 w-full object-contain"
                />
              )}
            </div>
          </div>
          {/* detail part */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-10">
            <div className="md:col-span-8 flex flex-col items-start space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {blogDetailsData?.data?.data?.data?.blog?.sub_heading}
              </h2>
              <p className="text-gray-500  font-normal">
                {parse(blogDetailsData?.data?.data?.data?.blog?.body)}
              </p>
              {/* comment */}
              <div className="flex w-full flex-col pt-3">
                <div className=" flex items-center justify-between">
                  <h2 className="text-lg  font-semibold ">Comment</h2>
                  <p
                    onClick={() => setSeeAllComments(!seeAllComments)}
                    className="font-medium text-main-color cursor-pointer"
                  >
                    {!seeAllComments ? "See All" : "See less"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  {!seeAllComments
                    ? blogDetailsData?.data?.data?.data?.blog?.comments
                        ?.slice(0, 2)
                        ?.map((comment: any) => (
                          <div className="border p-3  rounded-sm border-dark-color/70 w-full h-fit">
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
                            <p className={`text-gray-500 `}>
                              {seeMore && selectedComment === comment.id
                                ? comment.body
                                : comment.body.slice(1, 150)}
                              <span
                                onClick={() => {
                                  setSelectedComment(comment.id);
                                  setSeeMore(!seeMore);
                                }}
                                className="text-main-color/70 cursor-pointer font-medium text-[15px]"
                              >
                                {seeMore && selectedComment === comment.id
                                  ? "...ShowLess"
                                  : "...ShowMore"}
                              </span>
                            </p>
                          </div>
                        ))
                    : blogDetailsData?.data?.data?.data?.blog?.comments?.map(
                        (comment: any) => (
                          <div className="border p-3  rounded-sm border-dark-color/70 w-full h-fit">
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
                            <p className={`text-gray-500 `}>
                              {seeMore && selectedComment === comment.id
                                ? comment.body
                                : comment.body.slice(1, 150)}
                              <span
                                onClick={() => {
                                  setSelectedComment(comment.id);
                                  setSeeMore(!seeMore);
                                }}
                                className="text-main-color/70 cursor-pointer font-medium text-[15px]"
                              >
                                {seeMore && selectedComment === comment.id
                                  ? "...ShowLess"
                                  : "...ShowMore"}
                              </span>
                            </p>
                          </div>
                        )
                      )}
                </div>
              </div>
              {/* write comment */}
              <form
                onSubmit={handleComment}
                className="flex flex-col items-start space-y-2 w-full"
              >
                <h2 className="text-xl  font-bold ">Write Your Comment</h2>
                <textarea
                  disabled={commentMutation.isLoading}
                  required
                  value={commentValue}
                  onChange={(e) => setCommentValue(e.target.value)}
                  rows={4}
                  className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
                ></textarea>
                <button
                  disabled={commentMutation.isLoading}
                  type="submit"
                  className="px-5 rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70  w-fit flex items-center justify-center"
                >
                  {commentMutation.isLoading ? (
                    <PulseLoader color="#fff" />
                  ) : (
                    "comment"
                  )}
                </button>
              </form>
            </div>
            {/* related */}
            <div className="md:col-span-4">
              <h1  className="text-xl  font-bold pb-3">Most Popular</h1>
              <div className="flex flex-col items-start space-y-2">
                {blogDetailsData?.data?.data?.data?.related?.map(
                  (item: any) => (
                    <div
                      onClick={() => navigate(`/blog/${item.id}`)}
                      key={item.id}
                      className="flex items-start space-x-2 cursor-pointer overflow-hidden"
                    >
                      <img
                        src={item.blog_cover.original_url}
                        alt=""
                        className="h-24   cursor-pointer hover:scale-[1.03] w-24
                      object-cover transition-all duration-500 ease-out"
                      />
                      <div>
                        <p className=" text-[15px] p-1 cursor-pointer">
                          {item.category.name}
                        </p>
                        <h3 className="font-bold text-gray-900 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm font-light">
                          {item.created_at}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailsLoading />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        transition={Slide}
      />
    </div>
  );
};

export default BlogDetail;
