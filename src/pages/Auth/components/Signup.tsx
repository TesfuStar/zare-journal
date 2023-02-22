import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IoLogoGoogle } from "react-icons/io";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { useAuth } from "../../../context/Auth";

const Signup = () => {
  const [error, setError] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const { login } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
      setError("password don't match!");
      return;
    }
    signUpMutationSubmitHandler();
  };

  //POST REQUEST
  const signUpMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}register`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const signUpMutationSubmitHandler = async () => {
    try {
      signUpMutation.mutate(
        {
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          confirm_password: confirmPasswordRef.current?.value,
        },
        {
          onSuccess: (responseData: any) => {
            login(
              responseData?.data?.data?.token,
              responseData?.data?.data?.user
            );
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
  //Return

  return (
    <>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline font-medium text-sm">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              onClick={() => setError("")}
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="flex flex-col w-full ">
        <div className="mt-2 flex flex-col items-center space-y-2">
          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center space-y-2"
          >
            <input
              ref={nameRef}
              type="text"
              name=""
              id=""
              placeholder="Name"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
            <input
              ref={emailRef}
              type="email"
              name=""
              id=""
              placeholder="Email"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
            <input
              ref={passwordRef}
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
            <button
              disabled={signUpMutation.isLoading}
              type="submit"
              className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
            >
              {signUpMutation.isLoading ? (
                <PulseLoader color="#fff" />
              ) : (
                " sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
