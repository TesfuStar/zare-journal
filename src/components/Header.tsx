import React from "react";
import Logo from "../assets/Logo.svg";
import { BiSearch } from "react-icons/bi";
import SubscribeModal from "./subscription/SubscribeModal";
import {AiOutlineGoogle} from 'react-icons/ai'
import { useHome } from "../context/HomeContext";
const Header: React.FC = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen } = useHome();
  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto p-2 flex items-center justify-between">
          <img src={Logo} alt="" className="h-10" />
          <div className="flex items-center space-x-4">
            <BiSearch size={20} className="cursor-pointer" />
            <button
              onClick={() => setIsSubscriptionModalOpen(true)}
              className="bg-main-bg hover:bg-main-bg/70 p-2 px-3 rounded-sm text-white font-normal text-[15px]"
            >
              Subscribe
            </button>
                 <div>
                    <p className="text-gray-500">or</p>
                 </div>
          </div>
        </div>
      </div>
      <SubscribeModal />
    </>
  );
};

export default Header;
