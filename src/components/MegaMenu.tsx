import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Logo from "../assets/Logo.svg";
interface Props {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (isMegaMenuOpen: boolean) => void;
}
export default function MegaMenu({ isMegaMenuOpen, setIsMegaMenuOpen }: Props) {
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
      {isMegaMenuOpen && (
        <main
          className={
            " hidden md:flex fixed  overflow-hidden z-10 inset-0 transform ease-in-out  items-center justify-center" +
            (isMegaMenuOpen
              ? " transition-opacity opacity-100 duration-500 translate-y-0  "
              : " transition-all delay-400 opacity-0 translate-y-20  ")
          }
        >
          <section
            className={
              "absolute h-fit  z-50 bg-white dark:bg-gray-800  flex-grow p-5   max-w-5xl w-full  top-[55px]  flex items-center justify-center delay-400 duration-500 ease-in-out transition-all transform  " +
              (isMegaMenuOpen ? "translate-y-0 " : " translate-y-20")
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {categoriesData?.data?.data?.data?.slice(5, categoriesData?.data?.data?.data?.length)?.map((category: any) => (
                <Link
                  key={category.id}
                  onClick={() => setIsMegaMenuOpen(false)}
                  to={`/categories/${category.slug}`}
                  className="group whitespace-nowrap flex items-center 
                 text-[15px] font-medium rounded-md dark:text-white"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
          <section
            className=" w-screen h-full cursor-pointer overflow-hidden "
            onClick={() => {
              setIsMegaMenuOpen(false);
            }}
          ></section>
        </main>
      )}
    </>
  );
}
