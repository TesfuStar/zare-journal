import React, { useEffect, useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SearchPageLoading from "../../utils/SearchPageLoading";
import parse from "html-react-parser";
import useBlogSearch from "./components/useBlogSearch";
import ReactPlayer from "react-player";
import Header from "../../components/Header";
import { useHome } from "../../context/HomeContext";
import { Helmet } from "react-helmet";
import { Footer } from "../../components";
const Search: React.FC = () => {
  const homeRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [searchString, setSearchString] = useState<string>("");
  const { searchString, setSearchString } = useHome();
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<number>(1);
  const [sort, setSort] = useState("latest");
  const { loading, blogs, hasMore, popularBlogs } = useBlogSearch({
    query: searchString,
    pageNumber: currentPage,
    sort: sort,
  });
  console.log({ popularBlogs });
  useEffect(() => {
    setCurrentPage(1);
  }, [searchString]);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  console.log(blogs);
  const searchPageData = useQuery(
    ["getSearchPageDataApi", search, currentPage, sort],
    async () =>
      await axios.get(
        searchString
          ? currentPage == 1
            ? `${process.env.REACT_APP_BACKEND_URL}search-articles?search=${searchString}&sortBy=${sort}`
            : `${process.env.REACT_APP_BACKEND_URL}search-articles?page=${currentPage}&sortBy=${sort}`
          : `${process.env.REACT_APP_BACKEND_URL}search-articles?page=${currentPage}&sortBy=${sort}`,
        {
          headers,
        }
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {
        homeRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      },
      onError: (err) => {
        setError("something went wrong.");
      },
    }
  );
  //subcategories
  const subCategoriesData = useQuery(
    ["getSubCategoriesDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}sub-categories`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {},
      onError: (err) => {
        setError("something went wrong.");
      },
    }
  );

  console.log(subCategoriesData?.data?.data?.data);
  useEffect(() => {
    if (searchPageData.isLoading) {
      setError("");
    }
  }, [searchPageData.isLoading]);
  const handleSearch = () => {
    if (!searchString) return;
    setSearch((prev) => prev + 1);
  };

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

  function SubCategories() {
    return (
      <div className="">
        {subCategoriesData.isFetched ? (
          <div className="flex items-center gap- flex-wrap">
            {subCategoriesData?.data?.data?.data
              ?.slice(0, 100)
              ?.map((item: any) => (
                <p
                  onClick={() => setSearchString(item.name)}
                  className={`text-dark-color dark:text-white ${
                    searchString === item.name
                      ? "bg-main-color/50"
                      : "bg-gray-500/20 "
                  } cursor-pointer text-sm hover:underline p-1 rounded-full font-medium`}
                >
                  {item.name}
                </p>
              ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-dark-bg">
      <Helmet>
        <title>Search | ZareJournal</title>
        <meta
          name="description"
          content="Bringing you the world, one story at a time."
        />
      </Helmet>
      <Header />
      <div className=" max-w-7xl mx-auto w-full flex flex-col p-3">
        <div className="flex flex-col items-center justify-center py-10">
          <h3 className="font-bold text-xl md:text-3xl pb-10 dark:text-white">
            Search articles
          </h3>

          <div
            className="pl-3 max-w-5xl border border-gray-600 max-auto rounded-sm
         w-full flex flex-grow items-center h-12 "
          >
            <BiSearch className=" text-xl h-full flex text-gray-500" />
            <input
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              type="text"
              placeholder="Search articles and categories"
              className="w-full p-2 h-full rounded-sm border-none text-gray-500 font-medium bg-transparent dark:text-white
             focus:outline-none ring-0 text-sm"
            />
            <button
              onClick={handleSearch}
              className="text-white font-medium px-5 hover:bg-red-500/70  bg-red-500 h-full"
            >
              search
            </button>
          </div>
          <div className="max-w-5xl mx-auto pt-5 w-full flex items-start justify-between ">
            <SubCategories />
            <select
              name=""
              onChange={(e) => setSort(e.target.value)}
              className="p p-2 font-medium text-gray-500  rounded-sm ring-0 w-fit  px-5
               bg-transparent border-gray-400 border focus:outline-none focus:border-gray-400 dark:text-gray-200"
            >
              <option value="latest" className="text-gray-700 p-2">
                Latest
              </option>
              <option value="popular">Popular</option>
            </select>
          </div>
        </div>

        {/* results */}
        {searchString && (
          <div className="flex items-start justify-start self-start pt-5">
            <h4 className="font-medium text-center dark:text-gray-300">
              search results for {searchString}
            </h4>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start relative">
          <div className="md:col-span-8 flex flex-col items-start space-y-3 order-last md:order-1">
            {/* infinite scroll */}
            <h3 className="font-bold text-xl   text-center dark:text-gray-200">
              Results
            </h3>
            <div className="flex flex-col items-center justify-center space-y-5">
              {blogs.map((blog, index) => {
                if (blogs.length === index + 1) {
                  return (
                    <div
                      ref={lastBookElementRef}
                      // onClick={() => navigate(`/blog/${blog.id}`)}
                      onClick={() =>
                        blog.blog_cover.mime_type.includes("video")
                          ? navigate(`/video/${blog.id}`)
                          : navigate(`/blog/${blog.id}`)
                      }
                      key={blog.id}
                      className="flex item-start space-x-2 cursor-pointer overflow-hidden w-full"
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
                          className="h-36  md:h-[200px] cursor-pointer hover:scale-[1.03] w-36 md:w-[300px] md:min-w-[300px]
                          object-cover transition-all duration-500 ease-out object-center"
                        />
                      )}

                      <div>
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
                      onClick={() =>
                        blog.blog_cover.mime_type.includes("video")
                          ? navigate(`/video/${blog.id}`)
                          : navigate(`/blog/${blog.id}`)
                      }
                      key={blog.id}
                      className="flex item-start space-x-2 cursor-pointer overflow-hidden  w-full"
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
                          className="h-36  md:h-[200px] cursor-pointer hover:scale-[1.03] w-36 md:w-[300px] md:min-w-[300px]
                          object-cover transition-all duration-500 ease-out object-center"
                        />
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 line-clamp-1 md:line-clamp-3 dark:text-white">
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
            {blogs.length < 1 && !loading && (
              <div>
                <h1 className="text-xl font-semibold text-dark-color dark:text-white">
                  No Blogs found..
                </h1>
              </div>
            )}
            <div className="w-full">{loading && <SearchPageLoading />}</div>
            <div>{error && "Error"}</div>
          </div>
          {/* popular blog */}
          <div className="md:col-span-4 flex flex-col items-start space-y-3 md:sticky md:top-0 order-1 md:order-last">
            <h3 className="font-bold text-xl   text-center dark:text-gray-200">
              Most Popular
            </h3>
            {popularBlogs?.map((blog) => (
              <div
                onClick={() =>
                  blog.blog_cover.mime_type.includes("video")
                    ? navigate(`/video/${blog.id}`)
                    : navigate(`/blog/${blog.id}`)
                }
                key={blog.id}
                className="flex items-start pb-2 space-x-2 cursor-pointer overflow-hidden border-b border-gray-300 dark:border-gray-600"
              >
                {blog.blog_cover.mime_type.includes("video") ? (
                  <div className="">
                    <ReactPlayer
                      url={blog.blog_cover.original_url}
                      controls={true}
                      width={"80px"}
                      height={"80px"}
                    />
                  </div>
                ) : (
                  <img
                    src={blog.blog_cover.original_url}
                    alt=""
                    className="h-20 cursor-pointer hover:scale-[1.03] w-20 
                    object-cover transition-all duration-500 ease-out"
                  />
                )}

                <div>
                  <h4 className=" text-[15px] p-1 cursor-pointer dark:text-gray-200">
                    {blog.category.name}
                  </h4>
                  <h3 className="font-semibold text-gray-900 line-clamp-2 dark:text-white">
                    {blog.title}
                  </h3>

                  <p className="text-gray-400 text-sm font-light dark:text-gray-200">
                    {blog.created_at}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className=" w-full flex flex-col space-y-2 animate-pulse">
                {Array(5)
                  .fill(0)
                  .map((item) => (
                    <div className="flex items-start space-x-2 w-full">
                      <div className=" bg-gray-200 dark:bg-gray-600 w-44 h-28 rounded-md"></div>
                      <div className="flex flex-col items-start space-y-2 w-full">
                        <div className=" bg-gray-200 dark:bg-gray-600 w-full h-4 rounded-md"></div>
                        <div className=" bg-gray-200 dark:bg-gray-600 w-full h-4 rounded-md"></div>
                        <div className=" bg-gray-200 dark:bg-gray-600 w-full h-4 rounded-md"></div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
