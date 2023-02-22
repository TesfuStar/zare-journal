import { useState, useRef, useEffect } from "react";
import Frame from "../../assets/login.png";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleData } from "../../utils/Interface";
import { useAuth } from "../../context/Auth";

const SignIn = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isCoverPage, setIsCoverPage] = useState<boolean>(true);
  const [googleData, setGoogleData] = useState<GoogleData | null>(null);
  const { login } = useAuth();
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  useEffect(() => {
    if (googleData) {
      googleMutationSubmitHandler();
    }
  }, [googleData]);
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

        setGoogleData(res?.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  //facebook
  const responseFacebook = (response: any) => {
    console.log(response);
    setGoogleData(response);
  };
  //google login
  const googleMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        isLogin
          ? `${process.env.REACT_APP_BACKEND_URL}social-register`
          : `${process.env.REACT_APP_BACKEND_URL}social-register`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const googleMutationSubmitHandler = async () => {
    try {
      googleMutation.mutate(
        {
          name: googleData?.name,
          email: googleData?.email,
          password: googleData?.sub,
        },
        {
          onSuccess: (responseData: any) => {
            console.log(responseData?.data);
            login(
              responseData?.data?.data?.token,
              responseData?.data?.data?.user
            );
          },
          onError: (err: any) => {},
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  function SocialLogin() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-5">
        <button
          onClick={googleLogin as any}
          className="p-2 w-full hover:opacity-95 flex items-center space-x-2
        justify-center border border-gray-600  font-normal text-dark-color text-[15px] rounded-[4px]"
        >
          <FcGoogle size={20} className="text-white" />{" "}
          <span className=" text-[15px]">Google</span>
        </button>
        <FacebookLogin
          appId="2211226365745867"
          autoLoad={false}
          fields="name,email,picture"
          onClick={responseFacebook}
          callback={responseFacebook}
          render={(renderProps: any) => (
            <button
              className="p-2 w-full hover:opacity-95 flex items-center space-x-2
        justify-center border border-gray-600  font-normal text-dark-color text-[15px] rounded-[4px]"
            >
              <BsFacebook size={20} className="text-sky-600" />{" "}
              <span className=" text-[15px]">Facebook</span>
            </button>
          )}
        />
      </div>
    );
  }
  return (
    <div className="relative">
      <img
        src={Frame}
        alt=""
        className="absolute inset-0 w-full h-full object-cover flex md:hidden"
      />
      <div className="max-w-2xl mx-auto w-full min-h-screen flex items-center justify-center p-3">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1">
          <img src={Frame} alt="" className="h-full hidden md:flex" />
          <div className="w-full relative flex flex-col item-start justify-center space-y-2 pr-3 py-5  bg-white md:bg-transparent p-4">
            <p
              onClick={() => {
                isCoverPage
                  ? setIsCoverPage(false)
                  : isLogin
                  ? setIsLogin(false)
                  : setIsLogin(true);
              }}
              className="text-main-color font-semibold absolute top-3 right-3 text-[15px] cursor-pointer "
            >
              {isCoverPage ? "Sign in" : isLogin ? "SignUp" : "Sign in"}
            </p>
            {/*  */}
            {isCoverPage ? (
              <div className="flex flex-col items-start space-y-1 w-full">
                <p className="text-normal">Welcome to zare-journal </p>
                <h3 className="font-semibold text-lg">
                  Please Create an account.
                </h3>
                <button
                  onClick={() => setIsCoverPage(false)}
                  className="bg-main-bg hover:bg-main-bg/80 p-2 rounded-sm text-white text-[15px] w-full"
                >
                  Continue with Email
                </button>
              </div>
            ) : isLogin ? (
              <Login />
            ) : (
              <Signup />
            )}
            {/* google */}

            <div className="flex items-center justify-center space-x-2">
              <div className="w-16 h-[1px] bg-gray-300" />
              <p className="text-gray-400 font-normal">or</p>
              <div className="w-16 h-[1px] bg-gray-300" />
            </div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
