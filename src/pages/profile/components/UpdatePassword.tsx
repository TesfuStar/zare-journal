// @typescript-eslint/no-unused-vars
import React, { useState, useRef } from "react";
import { useAuth } from "../../../context/Auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  isUpdatingPassword: boolean;
  setSIsUpdatingPassword: (isUpdatingPassword: boolean) => void;
}
const UpdatePassword = ({
  isUpdatingPassword,
  setSIsUpdatingPassword,
}: Props) => {
  const { token, user } = useAuth();
  const [error, setError] = useState<string>("");
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("password don't match!");
      return;
    }
    changePasswordMutationSubmitHandler();
  };
  const changePasswordMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}change-password`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const changePasswordMutationSubmitHandler = async () => {
    try {
      changePasswordMutation.mutate(
        {
          current_password: oldPasswordRef.current?.value,
          new_password: passwordRef.current?.value,
          confirm_new_password: confirmPasswordRef.current?.value,
        },
        {
          onSuccess: (responseData: any) => {
            setSIsUpdatingPassword(false)
          },
          onError: (err: any) => {
            setError("Incorrect Email or Password");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full bg-white dark:bg-dark-bg p-3 rounded-md ">
      <div className="max-w-lg mx-auto w-full flex flex-col items-center space-y-2 ">
        <h2 className="font-semibold text-dark-gray dark:text-gray-300">
          Change Password
        </h2>
        <div className="w-full mt-2 flex flex-col items-center space-y-2">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center space-y-2"
          >
            <input
              ref={oldPasswordRef}
              type="password"
              name=""
              id=""
              placeholder="old password"
              className="w-full p-2 rounded-sm border border-gray-300 bg-transparent dark:text-white focus:outline-none ring-0"
              required
            />
            <input
              ref={passwordRef}
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-full p-2 rounded-sm border border-gray-300 bg-transparent dark:text-white focus:outline-none ring-0"
              required
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-sm border border-gray-300 bg-transparent dark:text-white focus:outline-none ring-0"
              required
            />
            <button
              disabled={changePasswordMutation.isLoading}
              type="submit"
              className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
            >
              {changePasswordMutation.isLoading ? (
                <PulseLoader color="#fff" />
              ) : (
                " Update Password"
              )}
            </button>
          </form>
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
        limit={1}
      />
    </div>
  );
};

export default UpdatePassword;
