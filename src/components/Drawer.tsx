import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import Logo from "../assets/Logo.svg";
interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
}
export default function Drawer({ isDrawerOpen, setIsDrawerOpen }: Props) {
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
          " w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isDrawerOpen ? " translate-x-0 " : " translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
          <header className="fixed flex items-center justify-between p-4 font-bold text-lg bg-white w-full">
          <img src={Logo} alt="" className="h-10" />
            <FaTimes
              size={20}
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </header>
          <div className="px-4">
            {categoriesData.isFetched ? (
              <div className=" flex flex-col items-start space-y-3 ">
                {categoriesData?.data?.data?.data?.map((category: any) => (
                  <Link
                    key={category.id}
                    to={"/categories"}
                    className="font-medium text-lg"
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
