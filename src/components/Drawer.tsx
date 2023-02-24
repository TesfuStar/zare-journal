import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Logo from "../assets/Logo.svg";
import DarkLogo from "../assets/Dark-Logo.svg";
import { useThemeContext } from "../context/ThemeContext";
import { useAuth } from "../context/Auth";
import { BiSearch } from "react-icons/bi";
interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}
export default function Drawer({ isDrawerOpen, setIsDrawerOpen }: Props) {
  const { currentMode, setMode } = useThemeContext();
  const { user, token, logout } = useAuth();
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
  return (
    <main
      className={
        " fixed  overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isDrawerOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 translate-x-full  ")
      }
    >
      <section
        className={
          " w-screen max-w-lg right-0 absolute bg-white dark:bg-dark-bg h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isDrawerOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="pl-3 relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full ">
          <header className="fixed flex items-center justify-between p-4 font-bold text-lg  w-full">
            {currentMode === "Light" ? (
              <img src={Logo} alt="" className="h-10" />
            ) : (
              <img src={DarkLogo} alt="" className="h-10" />
            )}
           
            <FaTimes
              size={20}
              onClick={() => {
                setIsDrawerOpen(false);
              }}
              className="dark:text-white text-dark-color"
            />
          </header>
          <div className="px-4 pt-14">
            {categoriesData.isFetched ? (
              <div className=" flex flex-col items-start space-y-3 w-full">
                {categoriesData?.data?.data?.data?.map((category: any) => (
                  <Link
                    key={category.id}
                    to={"/categories"}
                    className="w-full font-medium text-lg dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            ) : (
              <div>
                <PulseLoader color="#EF5138" />
              </div>
            )}
          </div>
          {/*  */}
          <div className="px-4">
            <div
              onClick={() => navigate("/search")}
              className="flex items-center space-x-2 border-b border-gray-300 dark:border-gray-700 pb-2"
            >
              <BiSearch size={16} className="cursor-pointer dark:text-white" />
              <p className="cursor-pointer dark:text-white text-[15px]">
                search
              </p>
            </div>
            {!user && !token ? (
              <div className="pt-3 w-full">
                <Link
                  to={"/signin"}
                  className="w-full font-medium text-lg dark:text-white border-b border-gray-300 dark:border-gray-700 pb-2"
                >
                  SIGN IN
                </Link>
              </div>
            ) : (
              <div className="pt-3">
                <p
                  onClick={() => navigate("/profile/account")}
                  className="text-dark-color dark:text-white font-medium text-[15px] cursor-pointer"
                >
                  Account
                </p>
              </div>
            )}
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer overflow-hidden "
        onClick={() => {
          setIsDrawerOpen(false);
        }}
      ></section>
    </main>
  );
}
