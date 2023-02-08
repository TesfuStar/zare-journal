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
                  {/* <h2 className="font-semibold text-2xl text-gray-700">
                    Stay Tuned in with Our Newsletter
                  </h2> */}
                  <p className="pt-3 font-medium text-md text-gray-600">
                    We hand-pick our favorites and send you the hottest deals
                    every week
                  </p>

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
