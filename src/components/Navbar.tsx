import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "./Drawer";
import Header from "./Header";
import MegaMenu from "./MegaMenu";
import "./style.css";
const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState<boolean>(false);
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
    <>
      <Header />
      <div className=" hidden md:flex bg-white">
        {categoriesData.isFetched && categoriesData.isSuccess ? (
          <div className="max-w-7xl mx-auto flex items-center overflow-x-hidden  p-2">
            <div className=" flex items-center space-x-8 overflow-x-hidden flex-grow">
              {categoriesData?.data?.data?.data?.map((category: any) => (
                <Link
                  key={category.id}
                  to={`/categories/${category.id}`}
                  className="group whitespace-nowrap flex items-center 
                 text-[15px] font-medium rounded-md"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {/* <div className="absolute top-0 right-0 bg-gradient-to-l from-black h-10 w-1/2"/> */}
            <div
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              className="bg-main-bg p-2 rounded-sm cursor-pointer"
            > 
              <BsThreeDotsVertical className="text-white" />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <div className="md:hidden flex items-end justify-end p-2">
        <div
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          className="  bg-main-bg p-2 rounded-sm cursor-pointer w-fit  "
        >
          <FaBars className="text-white" />
        </div>
      </div>
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />

      {/* mega menu component */}
      <MegaMenu isMegaMenuOpen={isMegaMenuOpen} setIsMegaMenuOpen={setIsMegaMenuOpen}/>
    </>
  );
};

export default Navbar;
