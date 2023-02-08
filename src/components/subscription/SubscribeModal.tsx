import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useHome } from "../../context/HomeContext";
import { IoLogoGoogle } from "react-icons/io";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FaFacebookF } from "react-icons/fa";
import axios from "axios";
const SubscribeModal = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen } = useHome();

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
  return (
    <>
      <Transition appear show={isSubscriptionModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsSubscriptionModalOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className="w-full max-w-md transform overflow-hidden rounded-md bg-white 
                p-6  align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900"
                  >
                    Subscribe for Daily Newsletter
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col items-center space-y-2">
                    <input
                      type="email"
                      name=""
                      id=""
                      placeholder="Email"
                      className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
                    />
                    <button
                      className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                     hover:bg-main-bg/80  w-full"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="w-20 h-[1px] bg-gray-300" />
                    <p className="font-medium text-dark-color">or</p>
                    <div className="w-20 h-[1px] bg-gray-300" />
                  </div>
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
                      autoLoad={true}
                      fields="name,email,picture"
                      // onClick={responseFacebook}
                      callback={responseFacebook}
                      render={(renderProps: any) => (
                        <button
                          className="p-2 w-full hover:opacity-95 flex items-center space-x-2
    justify-center bg-blue-700 font-normal text-white text-[15px] rounded-[4px]"
                        >
                          <FaFacebookF size={22} className="text-white" />{" "}
                          <span className=" text-[15px]">
                            Continue with Facebook
                          </span>
                        </button>
                      )}
                    />
                  </div>
                  <div className="mt-4"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SubscribeModal;
