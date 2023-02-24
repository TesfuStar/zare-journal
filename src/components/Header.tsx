import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import DarkLogo from "../assets/Dark-Logo.svg";
import { BiSearch } from "react-icons/bi";
import SubscribeModal from "./subscription/SubscribeModal";
import { useHome } from "../context/HomeContext";
import SignInModal from "./Auth/SignInModal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import axios from "axios";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { Switch } from "@headlessui/react";
import { useThemeContext } from "../context/ThemeContext";
import Drawer from "./Drawer";
import MegaMenu from "./MegaMenu";
import { FaBars } from "react-icons/fa";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const isSubscribed = localStorage.getItem("zare-journal-subscriber")
  const { currentMode, setMode } = useThemeContext();
  const { setIsSubscriptionModalOpen, setIsSignInModalOpen } = useHome();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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

  function Categories() {
    return (
      <div className=" hidden md:flex flex-grow w-full">
        {categoriesData.isFetched && categoriesData.isSuccess ? (
          <div className="w-full flex items-start justify-start overflow-x-hidden  ">
            <div className="w-full  flex items-start space-x-8 overflow-x-hidden flex-grow">
              {categoriesData?.data?.data?.data
                ?.slice(0, 5)
                ?.map((category: any) => (
                  <Link
                    key={category.id}
                    to={`/categories/${category.id}`}
                    className="group whitespace-nowrap flex items-center dark:text-white
               text-[15px] font-medium rounded-md"
                  >
                    {category.name}
                  </Link>
                ))}
            </div>
           {categoriesData?.data?.data?.data?.length > 5 && <div
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className=" rounded-sm cursor-pointer"
            >
              <BsThreeDotsVertical className="dark:text-white" />
            </div>}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
  function handleChange() {
    setMode(currentMode === "Light" ? "Dark" : "Light");
  }
  function DarkMode() {
    return (
      <Switch
        checked={currentMode === "Light"}
        onChange={handleChange}
        className={`${currentMode === "Light" ? "bg-gray-400" : "bg-gray-700"}
        relative inline-flex h-[18px] w-[34px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            currentMode === "Light" ? "translate-x-4" : "translate-x-0"
          }
          pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    );
  }
  return (
    <>
      <div className="bg-white dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto p-3 flex items-center justify-between gap-4">
          <div className="flex items-center flex-grow  space-x-5">
            <Link to={"/"}>
              {currentMode === "Light" ? (
                <img src={Logo} alt="" className="h-10" />
              ) : (
                <img src={DarkLogo} alt="" className="h-10" />
              )}
            </Link>
            {/* categories */}
            <Categories />
          </div>
          <div className="flex items-center space-x-4">
            <div className=" items-center hidden md:flex space-x-3 lg:space-x-5">
              <DarkMode />
              <BiSearch
                onClick={() => navigate("/search")}
                size={20}
                className="cursor-pointer dark:text-white"
              />
              {(!user?.subscribed && !isSubscribed)&& (
                <button
                  onClick={() => setIsSubscriptionModalOpen(true)}
                  className="bg-main-bg hover:bg-main-bg/70 p-2 px-3 rounded-sm text-white font-normal text-[15px] uppercase"
                >
                  Subscribe
                </button>
              )}
              {!user && !token ? (
                <div>
                  <p
                    onClick={() => navigate("/signin")}
                    className="text-dark-color dark:text-white font-medium text-[15px] cursor-pointer"
                  >
                    SIGN IN
                  </p>
                </div>
              ) : (
                <div>
                  <img
                    onClick={() => navigate("/profile/account")}
                    src={user?.profile_photo_url}
                    alt=""
                    className="h-12 w-12 rounded-full cursor-pointer"
                  />
                </div>
              )}
            </div>
            <FaBars
              onClick={() => {
                setIsDrawerOpen(true);
              }}
              size={20}
              className="text-dark-color dark:text-white md:hidden flex cursor-pointer"
            />
          </div>
        </div>
      </div>
      <SubscribeModal />
      <SignInModal />
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      {/* mega menu component */}
      <MegaMenu
        isMegaMenuOpen={isMegaMenuOpen}
        setIsMegaMenuOpen={setIsMegaMenuOpen}
      />
    </>
  );
};

export default Header;
