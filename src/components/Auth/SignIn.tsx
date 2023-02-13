import { useState, useRef } from "react";
import { useHome } from "../../context/HomeContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { IoLogoGoogle } from "react-icons/io";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../context/Auth";
import { PulseLoader } from "react-spinners";
interface Props {
  isLogin: boolean;
  isSignInModalOpen: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setIsSignInModalOpen: (isSignInModalOpen: boolean) => void;
}
const SignIn = ({
  isLogin,
  setIsLogin,
  setIsSignInModalOpen,
  isSignInModalOpen,
}: Props) => {
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
  //google login
  const googleLogin = useGoogleLogin({
    onSuccess: async (response: any) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        console.log(res?.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  //facebook
  const responseFacebook = (response: any) => {
    console.log(response);
  };

  function SocialLogin() {
    return (
      <>
        {/* google and face book */}
        <div className="flex flex-col items-center space-y-2">
          <button
            onClick={googleLogin as any}
            className="p-3 w-full hover:opacity-95 flex items-center space-x-2
              justify-center bg-sky-600 font-normal text-white text-[15px] rounded-[4px]"
          >
            <IoLogoGoogle size={22} className="text-white" />{" "}
            <span className=" text-[15px]">Continue with Google</span>
          </button>

          <FacebookLogin
            appId="450246093961092"
            autoLoad={false}
            fields="name,email,picture"
            // onClick={responseFacebook}
            callback={responseFacebook}
            render={(renderProps: any) => (
              <button
                className="p-3 w-full hover:opacity-95 flex items-center space-x-2
    justify-center bg-blue-700 font-normal text-white text-[15px] rounded-[4px]"
                onClick={renderProps.onClick}
              >
                <FaFacebookF size={22} className="text-white" />{" "}
                <span className=" text-[15px]">Continue with Facebook</span>
              </button>
            )}
          />
        </div>
      </>
    );
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin) {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        setError("password don't match!");
        return;
      }
    }
    loginMutationSubmitHandler();
  };

  //POST REQUEST
  const loginMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        isLogin
          ? `${process.env.REACT_APP_BACKEND_URL}login`
          : `${process.env.REACT_APP_BACKEND_URL}register`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const loginMutationSubmitHandler = async () => {
    try {
      loginMutation.mutate(
        isLogin
          ? {
              email: emailRef.current?.value,
              password: passwordRef.current?.value,
            }
          : {
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
            setIsSignInModalOpen(false);
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
          <span className="block sm:inline font-medium">{error}</span>
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
      <div className="mt-2 flex flex-col items-center space-y-2">
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-2"
        >
          {!isLogin && (
            <input
              ref={nameRef}
              type="text"
              name=""
              id=""
              placeholder="Name"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
          )}
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
          {!isLogin && (
            <input
              ref={confirmPasswordRef}
              type="password"
              placeholder="Confirm Password"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
          )}
          <button
            disabled={loginMutation.isLoading}
            type="submit"
            className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70 disabled:hover:bg-main-bg  w-full flex items-center justify-center"
          >
            {loginMutation.isLoading ? (
              <PulseLoader color="#fff" />
            ) : isLogin ? (
              " Sign up"
            ) : (
              " sign in"
            )}
          </button>
        </form>
      </div>
      <p className="text-gray-400 font-normal py-2">
        {isLogin ? "Don't have account ?" : "Already have account ?"}
        <span
          onClick={() => setIsLogin(!isLogin)}
          className="text-main-color font-medium cursor-pointer"
        >
          {isLogin ? " Sign up" : " sign in"}
        </span>
      </p>

      <div className="flex items-center justify-center space-x-2 py-4">
        <div className="w-20 h-[1px] bg-gray-300" />
        <p className="font-medium text-dark-color">or</p>
        <div className="w-20 h-[1px] bg-gray-300" />
      </div>
      <SocialLogin />
    </>
  );
};

export default SignIn;
