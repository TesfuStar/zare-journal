import React from "react";
import Logo from "../assets/Logo.svg";
import { BiSearch } from "react-icons/bi";
import SubscribeModal from "./subscription/SubscribeModal";
import { useHome } from "../context/HomeContext";
import SignInModal from "./Auth/SignInModal";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
const Header: React.FC = () => {
  const { setIsSubscriptionModalOpen, setIsSignInModalOpen } = useHome();
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  console.log(user, token);
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto p-2 flex items-center justify-between">
          <Link to={"/"}>
            <img src={Logo} alt="" className="h-10" />
          </Link>
          <div className="flex items-center space-x-4">
            <BiSearch
              onClick={() => navigate("/search")}
              size={20}
              className="cursor-pointer"
            />
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="bg-main-bg hover:bg-main-bg/70 p-2 px-3 rounded-sm text-white font-normal text-[15px]"
            >
              Subscribe
            </button>
            {!user && !token ? (
              <div>
                <p
                  onClick={() => setIsSignInModalOpen(true)}
                  className="text-dark-color font-medium text-[15px] cursor-pointer"
                >
                  Sign In
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
        </div>
      </div>
      <SubscribeModal />
      <SignInModal />
    </>
  );
};

export default Header;
