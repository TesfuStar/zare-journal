import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useHome } from "../../context/HomeContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Frame from "../../assets/login.png";
import { useAuth } from "../../context/Auth";
import { FaTablet } from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";
import CategoryCard from "./CategoryCard";

interface Cat {
  id: string[];
}
interface Props {
  emailRef: React.RefObject<HTMLInputElement>;
  email: string;
}
const CategorySelection = ({ emailRef, email }: Props) => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen } = useHome();
  const { user, token, logout } = useAuth();
  const mySet = new Set<string>();
  const { currentMode } = useThemeContext();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const categoriesData = useQuery(
    ["getCategoriesDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}categories`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res: any) => {},
    }
  );

  function ClickHandler(data: any) {
    mySet.add(data?.id);
  }

  const handleSubmit = () => {
    if (mySet.size < 1) {
      return;
    }
    categoryAddSubmitHandler();
  };
  //submit the categories
  console.log({ mySet });
  const categoryAddMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}subscribe`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const categoryAddSubmitHandler = async () => {
    try {
      categoryAddMutation.mutate(
        {
          email: email,
          categories: [...mySet],
        },
        {
          onSuccess: (responseData: any) => {
            setIsSubscriptionModalOpen(false);
            localStorage.setItem("zare-journal-subscriber", "1");
          },
          onError: (err: any) => {
            // setError("something went wrong");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-10 p-3 ">
      {categoriesData.isFetched ? (
        <div className="flex flex-col items-center overflow-y-scroll scrollbar-hide">
          <h3
            className={`font-semibold text-xl   pb-3 ${
              currentMode === "Dark" ? "text-gray-100" : "text-gray-500"
            }`}
          >
            Select a Categories
          </h3>
          <p
            className={`font-normal   pb-3 ${
              currentMode === "Dark" ? "text-gray-100" : "text-gray-500"
            }`}
          >
            You can select a multiple categories.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pb-3">
            {categoriesData?.data?.data?.data?.map(
              (category: any, index: number) => (
                <CategoryCard
                  key={index}
                  category={category}
                  ClickHandler={ClickHandler}
                  mySet={mySet}
                />
              )
            )}
          </div>

          <div className="flex items-end justify-end w-full">
            <button
              disabled={categoryAddMutation.isLoading}
              className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white flex items-center justify-center
                     hover:bg-main-bg/80  w-44"
              onClick={handleSubmit}
            >
              {categoryAddMutation.isLoading ? (
                <PulseLoader color="#fff" />
              ) : (
                "Done"
              )}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CategorySelection;
