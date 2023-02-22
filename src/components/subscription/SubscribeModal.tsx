import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { useHome } from "../../context/HomeContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast, Slide, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategorySelection from "./CategorySelection";
import Frame from "../../assets/login.png";
const SubscribeModal = () => {
  const { isSubscriptionModalOpen, setIsSubscriptionModalOpen } = useHome();
  const [isSubscriptionSuccess, setIsSubscriptionSuccess] =
    useState<boolean>(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutationSubmitHandler();
  };
  //SUBSCRIPTION POST REQUEST
  const subscribeMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}subscribe`,
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
      subscribeMutation.mutate(
        {
          email: emailRef.current?.value,
        },
        {
          onSuccess: (responseData: any) => {
            setIsSubscriptionModalOpen(false);
            toast.info("successfully subscribed", options);
            setIsSubscriptionSuccess(true);
          },
          onError: (err: any) => {
            // setError("something went wrong");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const options: ToastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  function Subscription() {
    return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2  py-5 md:py-0">
        <img src={Frame} alt="" className="h-full hidden md:flex" />
        <div className="flex flex-col items-center justify-center space-y-2 p-2 w-full">
          <p className="pt-3 font-semibold text-lg text-gray-700">
            Subscribe to Our Newsletter
          </p>

          <form
            onSubmit={handleSubscribe}
            className="w-full  flex flex-col items-center space-y-2"
          >
            <input
              type="email"
              ref={emailRef}
              placeholder="Email"
              className="w-full p-2 rounded-sm border border-gray-300 focus:outline-none ring-0"
              required
            />
            <button
              className=" rounded-sm  bg-main-bg p-3 text-[15px] font-normal text-white
                     hover:bg-main-bg/80  w-full"
            >
              {subscribeMutation.isLoading ? (
                <PulseLoader color="#fff" />
              ) : (
                "Subscribe"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }
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
                  className="w-full max-w-2xl transform overflow-hidden rounded-md bg-white 
              align-middle shadow-xl transition-all"
                >
                  {!isSubscriptionSuccess ? (
                    <Subscription />
                  ) : (
                    <CategorySelection />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
      />
    </>
  );
};

export default SubscribeModal;
