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
import Header from "../../components/Header";
import { Footer } from "../../components";
import { Helmet } from "react-helmet";
const BlogDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth();
  const { searchString, setSearchString } = useHome();
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
      navigate("/signin");
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
    <div className="bg-white dark:bg-dark-bg">
      <Header />
      <div className="max-w-7xl mx-auto p-3 md:p-0 py-4">
        {blogDetailsData.isFetched && blogDetailsData.isSuccess ? (
          <div className="flex flex-col items-start space-y-2">
            <Helmet>
              <meta charSet="utf-8" />
              <title>{blogDetailsData?.data?.data?.data?.blog?.title}</title>
              <meta
                name="description"
                content={blogDetailsData?.data?.data?.data?.blog?.sub_heading}
              />

              {blogDetailsData?.data?.data?.data?.blog.blog_cover.mime_type.includes(
                "video"
              ) ? (
                <meta
                  property="og:video"
                  content={
                    blogDetailsData?.data?.data?.data?.blog?.blog_cover
                      ?.original_url
                  }
                />
              ) : (
                <meta
                  property="og:image"
                  content={
                    blogDetailsData?.data?.data?.data?.blog?.blog_cover
                      ?.original_url
                  }
                />
              )}
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-10  w-full">
              <div className="flex flex-col items-start space-y-2">
                <p className="text-gray-500 dark:text-gray-300 text-[15px]">
                  {blogDetailsData?.data?.data?.data?.blog?.published_at +
                    " • " +
                    blogDetailsData?.data?.data?.data?.blog?.reading_time +
                    " "}
                  to read
                </p>
                <h2 className="text-xl md:text-4xl lg:text-5xl font-bold dark:text-white w-full md:w-[400px]">
                  {blogDetailsData?.data?.data?.data?.blog?.title}
                </h2>
                <p className="text-gray-500 text-sm font-normal dark:text-gray-300 w-full md:w-96">
                  {blogDetailsData?.data?.data?.data?.blog?.sub_heading}
                </p>
              </div>
              {/*  */}
              <div className="  flex items-end  justify-end self-end">
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
                    className="max-h-80 w-full object-cover  flex items-end  justify-end self-end"
                  />
                )}
              </div>
            </div>
            {/* detail part */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10">
              <div className="md:col-span-7 flex flex-col items-start space-y-4">
                <p className="text-gray-500  font-normal dark:text-gray-300 text-left">
                  {parse(blogDetailsData?.data?.data?.data?.blog?.body)}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {blogDetailsData?.data?.data?.data?.blog?.sub_categories?.map(
                    (item: any) => (
                      <p
                        onClick={() => {
                          navigate("/search");
                          setSearchString(item.name);
                        }}
                        className={`text-dark-color dark:text-white bg-gray-500/20  cursor-pointer text-[13px] hover:underline p-1 rounded-full `}
                      >
                        {item.name}
                      </p>
                    )
                  )}
                </div>
                {/* comment */}
                <div className="flex w-full flex-col pt-3">
                  {blogDetailsData?.data?.data?.data?.blog?.comments?.length >
                    0 && (
                    <div className=" flex items-center justify-between">
                      <h2 className="text-lg  font-semibold dark:text-gray-300">
                        Comments (
                        {blogDetailsData?.data?.data?.data?.blog?.comment_count}
                        )
                      </h2>
                      {blogDetailsData?.data?.data?.data?.blog?.comments
                        ?.length > 10 && (
                        <p
                          onClick={() => setSeeAllComments(!seeAllComments)}
                          className="font-medium text-main-color cursor-pointer"
                        >
                          {!seeAllComments ? "See All" : "See less"}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 w-full">
                    {!seeAllComments
                      ? blogDetailsData?.data?.data?.data?.blog?.comments
                          ?.slice(0, 2)
                          ?.map((comment: any) => (
                            <div
                              className={`border p-3  rounded-sm border-dark-color/50 dark:border-gray-500 w-full ${
                                seeMore ? "h-fit" : "h-full"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <img
                                  src={comment.author.profile_photo_url}
                                  alt=""
                                  className="rounded-full bg-main-bg h-12 w-12 "
                                />
                                <div className="flex flex-col items-start space-y-1">
                                  <h3 className="capitalize font-semibold dark:text-white">
                                    {comment.author.name}
                                  </h3>
                                  <p className="text-gray-400 dark:text-white text-normal text-[12px]">
                                    {comment.diffForHumans}
                                  </p>
                                  <p
                                    className={`text-gray-500 dark:text-gray-300  text-[15px]`}
                                  >
                                    {seeMore && selectedComment === comment.id
                                      ? comment.body
                                      : comment.body.slice(0, 90)}
                                    {comment.body?.length > 90 && (
                                      <span
                                        onClick={() => {
                                          setSelectedComment(comment.id);
                                          setSeeMore(!seeMore);
                                        }}
                                        className="text-main-color cursor-pointer  font-medium text-[13px]"
                                      >
                                        {seeMore &&
                                        selectedComment === comment.id
                                          ? "...see less"
                                          : "...see more"}
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                      : blogDetailsData?.data?.data?.data?.blog?.comments?.map(
                          (comment: any) => (
                            <div
                              className={`border p-3  rounded-sm border-dark-color/50 w-full  dark:border-gray-500  ${
                                seeMore ? "h-fit" : "h-full"
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <img
                                  src={comment.author.profile_photo_url}
                                  alt=""
                                  className="rounded-full bg-main-bg h-12 w-12 "
                                />
                                <div className="flex flex-col items-start space-y-1">
                                  <h3 className="capitalize font-semibold dark:text-white">
                                    {comment.author.name}
                                  </h3>
                                  <p className="text-gray-400 dark:text-white text-normal text-[12px]">
                                    {comment.diffForHumans}
                                  </p>
                                  <p
                                    className={`text-gray-500 dark:text-gray-300  text-[15px]`}
                                  >
                                    {seeMore && selectedComment === comment.id
                                      ? comment.body
                                      : comment.body.slice(0, 90)}
                                    <span
                                      onClick={() => {
                                        setSelectedComment(comment.id);
                                        setSeeMore(!seeMore);
                                      }}
                                      className="text-main-color cursor-pointer font-medium text-[13px] "
                                    >
                                      {seeMore && selectedComment === comment.id
                                        ? "...see less"
                                        : "...see more"}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                  </div>
                </div>
                {/* write comment */}
                <form
                  onSubmit={handleComment}
                  className="flex flex-col items-start space-y-2 w-full pb-3"
                >
                  <h2 className="text-xl  font-bold dark:text-white">
                    Write Your Comment
                  </h2>
                  <textarea
                    disabled={commentMutation.isLoading}
                    placeholder="Type your comment..."
                    required
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    rows={4}
                    className="w-full p-2 rounded-sm border border-gray-300 dark:border-gray-500 focus:outline-none ring-0 bg-transparent dark:text-gray-300"
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
              <div className="md:col-span-5">
                <h1 className="text-xl  font-bold pb-3 dark:text-white">
                  Most Popular
                </h1>
                <div className="flex flex-col items-start space-y-2 ">
                  {blogDetailsData?.data?.data?.data?.related?.map(
                    (item: any) => (
                      <div
                        onClick={() => navigate(`/blog/${item.slug}`)}
                        key={item.id}
                        className="w-full flex items-start pb-2 space-x-2 cursor-pointer overflow-hidden border-b border-gray-300 dark:border-gray-600"
                      >
                        <img
                          src={item.blog_cover.original_url}
                          alt=""
                          className="h-24   cursor-pointer hover:scale-[1.03] w-24
                      object-cover transition-all duration-500 ease-out"
                        />
                        <div>
                          <p className=" text-[15px] p-1 cursor-pointer dark:text-gray-200">
                            {item.category.name}
                          </p>
                          <h3 className="font-bold text-gray-900 line-clamp-2 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-gray-400 text-sm font-light dark:text-gray-300">
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
      <Footer />
    </div>
  );
};

export default BlogDetail;
