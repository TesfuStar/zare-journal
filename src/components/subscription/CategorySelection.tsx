import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useHome } from "../../context/HomeContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Frame from "../../assets/login.png";
import { useAuth } from "../../context/Auth";
import { FaTablet } from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";

interface Cat {
  id: string[];
}
interface Props {
  emailRef: React.RefObject<HTMLInputElement>;
  email: string;
}
const CategorySelection = ({ emailRef, email }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [cats, setCats] = useState<string[]>([]);
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen } = useHome();

  const { user, token, logout } = useAuth();
  const mySet = new Set();
  const { currentMode } = useThemeContext();
  let myCategories: any = [];
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

  console.log(categoriesData?.data?.data?.data);

  function handleAddCategory(id: any) {
    myCategories.some((category: any) => category.id === id);
    if (!myCategories.some((category: any) => category === id)) {
      myCategories.push(id);
      myCategories && setCats(myCategories);
    } else {
      const category = myCategories.indexOf(id);
      myCategories.splice(category, 1);
      myCategories && setCats(myCategories);
    }
  }
  console.log({ myCategories, email });

  const handleSubmit = () => {
    if (myCategories.length > 0) {
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
          categories: cats,
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
            {categoriesData?.data?.data?.data?.map((category: any) => (
              <div
                onClick={() => {
                  handleAddCategory(category.id);
                  setIsClicked((prev) => !prev);
                }}
                className="relative overflow-hidden cursor-pointer hover:scale-105 transition-all duration-500"
              >
                <div className="absolute top-5 right-5 bg-white rounded-t-full p-1">
                  {myCategories.includes(category.id) && (
                    <FaTablet className="text-red-500" />
                  )}
                </div>
                <img
                  src={category.category_image.original_url}
                  alt=""
                  className="h-36 w-full object-cover "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-600 to-transparent" />
                <h3 className="absolute bottom-2 left-2 text-white font-medium text-[15px]">
                  {category.name}
                </h3>
              </div>
            ))}
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
