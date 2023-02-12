import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GridLoading from "../../utils/GridLoading";

const Category: React.FC = () => {
  const { id } = useParams();
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
      onSuccess: (res) => {},
    }
  );
  return (
    <div className="max-w-7xl mx-auto p-3">
      {blogCategoryData?.isFetched ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {blogCategoryData?.data?.data?.data?.map((item: any) => (
              <div
                key={item.id}
                onClick={() => navigate(`/blog/${item.id}`)}
                className="cursor-pointer overflow-hidden flex flex-col items-start "
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
        </div>
      ) : (
        <GridLoading />
      )}
    </div>
  );
};

export default Category;
