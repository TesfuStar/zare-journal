import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UseComment from "./components/UseComment";

const MyComment = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<any>(null);
  const { loading, comments, hasMore, error } = UseComment({
    pageNumber: currentPage,
  });

  //infinite scroll

  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentElementRef = useCallback(
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

  return (
    <div className=" max-h-[500px] h-full overflow-y-scroll scrollbar-hide">
      <div className="flex w-full flex-col items-start space-y-2">
        <h1 className="pb-1 font-medium text-dark-color dark:text-white">
          Your Comments
        </h1>
        {comments?.map((comment, index) => {
          if (comments.length === index + 1) {
            return (
              <div
                ref={lastCommentElementRef}
                onClick={() =>
                  comment.blog.blog_cover.mime_type.includes("video")
                    ? navigate(`/video/${comment.blog_id}`)
                    : navigate(`/blog/${comment.blog_id}`)
                }
                key={index}
                className="border p-3  rounded-sm border-dark-color/50 dark:border-gray-500 w-full"
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
                      {comment.created_at}
                    </p>
                    <h3 className="capitalize font-semibold dark:text-white">
                      {comment.blog.title}
                    </h3>
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
                          {seeMore && selectedComment === comment.id
                            ? "...see less"
                            : "...see more"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                onClick={() =>
                  comment.blog.blog_cover.mime_type.includes("video")
                    ? navigate(`/video/${comment.blog_id}`)
                    : navigate(`/blog/${comment.blog_id}`)
                }
                key={index}
                className="border p-3  rounded-sm border-dark-color/50 dark:border-gray-500 w-full"
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
                      {comment.created_at}
                    </p>

                    <h3 className="capitalize font-semibold dark:text-white">
                      {comment.blog.title}
                    </h3>
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
                          {seeMore && selectedComment === comment.id
                            ? "...see less"
                            : "...see more"}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      {loading && (
        <div className="pt-3 grid grid-cols-1 gap-2 w-full">
          {Array(5)
            .fill(0)
            .map((item) => (
              <div className="relative w-full  flex flex-col space-y-2  animate-pulse  flex-shrink-0">
                <div className="relative bg-gray-200 dark:bg-gray-600  w-full h-20 flex flex-col flex-grow rounded-md"></div>
                <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
                <div className="mt-2 bg-gray-200 dark:bg-gray-600   w-20 h-3 rounded-md"></div>
                <div className=" bg-gray-200 dark:bg-gray-600   left-3 w-[70%] h-3 rounded-md"></div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyComment;
