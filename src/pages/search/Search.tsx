import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import SearchPageLoading from "../../utils/SearchPageLoading";
const Search: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchString, setSearchString] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [search, setSearch] = useState<number>(1);
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const searchPageData = useQuery(
    ["getSearchPageDataApi", search, currentPage],
    async () =>
      await axios.get(
         searchString
          ? `${process.env.REACT_APP_BACKEND_URL}search-articles?${searchString}`
          : `${process.env.REACT_APP_BACKEND_URL}search-articles?page=${currentPage}`,
        {
          headers,
        }
      ),
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
  useEffect(() => {
    if (searchPageData.isLoading) {
      setError("");
    }
  }, [searchPageData.isLoading]);
  const handleSearch = () => {
    if (!searchString) return;
    setSearch((prev) => prev + 1);
  };
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col p-3">
      <div className="flex flex-col items-center justify-center py-10">
        <h3 className="font-bold text-xl md:text-3xl pb-10">Search articles</h3>

        <div
          className="pl-3 max-w-5xl border border-gray-600 max-auto rounded-sm
         w-full flex flex-grow items-center h-12 "
        >
          <BiSearch className=" text-xl h-full flex text-gray-500" />
          <input
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="Search blogs, news, categories"
            className="w-full p-2 h-full rounded-sm border-none text-gray-500 font-medium
             focus:outline-none ring-0 text-sm"
          />
          <button
            onClick={handleSearch}
            className="text-white font-medium px-5 hover:bg-red-500/70  bg-red-500 h-full"
          >
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
              {searchPageData?.data?.data?.data?.data?.map((item: any) => (
                <div
                  onClick={() => navigate(`/blog/${item.id}`)}
                  key={item.id}
                  className="flex items-start space-x-2 cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.blog_cover.original_url}
                    alt=""
                    className="h-36  md:h-56 cursor-pointer hover:scale-[1.03] w-36 md:w-64 
                   object-cover transition-all duration-500 ease-out"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1 md:line-clamp-3">
                      {item.title}
                    </h3>
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
              ))}
              <div className="flex items-center justify-center w-full space-x-3">
                {searchPageData?.data?.data?.data?.prev_page_url && <button
                 onClick={()=>setCurrentPage(prev=>prev -1)}
                  className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-fit flex items-center justify-center"
                >
                  prev
                </button>}
                {searchPageData?.data?.data?.data?.next_page_url && <button
                onClick={()=>setCurrentPage(prev=>prev + 1)}
                  className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-fit flex items-center justify-center"
                >
                  Next
                </button>}
              </div>
            </div>
            {/* most popular */}
            <div className="md:col-span-8"></div>
          </div>
        ) : (
          <SearchPageLoading />
        )}
        {error && (
          <h1 className="font-bold text-xl md:text-3xl pb-10">{error}</h1>
        )}
      </div>
    </div>
  );
};

export default Search;
