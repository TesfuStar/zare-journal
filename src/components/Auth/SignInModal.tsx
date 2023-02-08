import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useHome } from "../../context/HomeContext";

const SignInModal = () => {
  const { isSignInModalOpen, setIsSignInModalOpen } = useHome();
  const [isLogin, setIsLogin] = useState<boolean>(false);



  return (
    <>
      <Transition appear show={isSignInModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsSignInModalOpen(false)}
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
                    {isLogin ? "Sign In" : "Sign Up"}
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
                      className=" rounded-sm  bg-main-bg p-3 text-sm font-medium text-white
                   hover:bg-main-bg/70  w-full"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="flex items-center justify-center space-x-2 py-4">
                    <div className="w-20 h-[1px] bg-gray-300" />
                    <p className="font-medium text-dark-color">or</p>
                    <div className="w-20 h-[1px] bg-gray-300" />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default SignInModal;
