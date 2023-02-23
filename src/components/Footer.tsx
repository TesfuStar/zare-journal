import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast, Slide, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DarkLogo from "../assets/Dark-Logo.svg";
import { useThemeContext } from "../context/ThemeContext";
import { useHome } from "../context/HomeContext";
const Footer: React.FC = () => {
  const { currentMode, setMode } = useThemeContext();
  const {
    isSubscriptionModalOpen,
    setIsSubscriptionModalOpen,
    isSubscriptionSuccess,
    setIsSubscriptionSuccess,
    email,
    setEmail,
  } = useHome();
  const emailRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
      onSuccess: (res) => {},
    }
  );

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setEmail(emailRef?.current?.value);
    setIsSubscriptionModalOpen(true);
    setIsSubscriptionSuccess(true);
    if (emailRef && emailRef.current) {
      emailRef.current.value = "";
    }
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
    <>
      <div className="max-w-7xl mx-auto border-y border-gray-300  dark:border-gray-500 py-3 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-2">
          <div className="flex flex-col items-start space-y-2">
            <Link to={"/"}>
              {currentMode === "Light" ? (
                <img src={Logo} alt="" className="h-10" />
              ) : (
                <img src={DarkLogo} alt="" className="h-10" />
              )}
            </Link>
            <div className="flex flex-col items-start space-y-2 pt-3 text-[15px]">
              {categoriesData.isFetched &&
                categoriesData?.data?.data?.data
                  ?.slice(1, 5)
                  ?.map((category: any) => (
                    <p
                      key={category.id}
                      onClick={() => navigate(`/categories/${category.id}`)}
                      className="font-medium text-gray-500 cursor-pointer dark:text-gray-300"
                    >
                      {" "}
                      {category.name}
                    </p>
                  ))}
            </div>
          </div>
          {/* 2nd grid */}
          <div className="flex flex-col items-start space-y-2">
            <h2 className="font-bold text-xl dark:text-white">
              More from Zare journal
            </h2>
            <p className="font-normal text-[15px] text-gray-500 dark:text-gray-300">
              Zare Journal is a Pan-African Digital Media based in Addis Ababa,
              Ethiopia, that aggregates news primarily on the African Continent.
              Follow us on our socials to get updates and even more Zare
              content.
            </p>
          </div>
          {/* 3rd grid */}
          <div>
            <p className=" font-bold text-xl dark:text-white">
              Subscribe to Our Newsletter
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-2 flex flex-col space-y-2"
            >
              <input
                type="email"
                ref={emailRef}
                
                placeholder="Email"
                className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0 bg-transparent dark:border-gray-500 dark:text-white"
                required
              />
              <button
                type="submit"
                className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                     hover:bg-main-bg/80  w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-300 pt-3 dark:border-gray-500 flex items-center justify-center ">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
            {new Date().getFullYear()} Zare Journal. All Right Reserved
          </p>
        </div>
      </div>
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
    </>
  );
};

export default Footer;
