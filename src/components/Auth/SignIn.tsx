import { useState, useRef } from "react";
import { useHome } from "../../context/HomeContext";
import { IoLogoGoogle } from "react-icons/io";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import axios from "axios";
import { useHref } from "react-router-dom";

interface Props {
  isLogin: boolean;
}
const SignIn = ({ isLogin }: Props) => {
  const [error, setError] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
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
            className="p-2 w-full hover:opacity-95 flex items-center space-x-2
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
                className="p-2 w-full hover:opacity-95 flex items-center space-x-2
    justify-center bg-blue-700 font-normal text-white text-[15px] rounded-[4px]"
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
    console.log(emailRef.current?.value)
  };
  //Return
  return (
    <>
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
            />
          )}
          <input
            ref={emailRef}
            type="email"
            name=""
            id=""
            placeholder="Email"
            className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
          />
          <input
            ref={passwordRef}
            type="password"
            name=""
            id=""
            placeholder="Password"
            className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
          />
          <button
            type="submit"
            className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                   hover:bg-main-bg/70  w-full"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>
      </div>
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
