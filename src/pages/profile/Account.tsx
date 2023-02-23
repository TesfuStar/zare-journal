import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import { BsCameraFill } from "react-icons/bs";
import { useAuth } from "../../context/Auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import UpdatePassword from "./components/UpdatePassword";
import { ToastContainer, toast, Slide, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare var URL: any;
const Account = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const { user, token, logout, login } = useAuth();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState();
  const [isEditName, setSIsEditName] = useState<boolean>(false);
  const [isUpdatingPassword, setSIsUpdatingPassword] = useState<boolean>(false);

  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
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
  function handleNameSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nameRef.current?.value) {
      toast.info("enter your name", options);
      return;
    }
    updateProfileMutationSubmitHandler();
  }
  const handleUploadImage = (data: any) => {
    setSelectedImage(URL.createObjectURL(data[0]));
    setImage(data);
    console.log(image);
  };
  const handleUpdateProfile = () => {
    if (!image) {
      toast.info("please upload your profile", options);
      return;
    }
    updateProfileMutationSubmitHandler();
  };
  const updateProfileMutation = useMutation(
    async (newData: any) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}update-profile`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const updateProfileMutationSubmitHandler = async () => {
    try {
      let formData = new FormData();
      formData.append(
        "name",
        nameRef.current?.value ? nameRef.current?.value : user.name
      );
      image && formData.append("profile_photo", image[0]);
      updateProfileMutation.mutate(formData, {
        onSuccess: (responseData: any) => {
          login(token, responseData?.data?.data);
          toast.info("success", options);
          setSIsUpdatingPassword(false);
          setSIsEditName(false);
        },
        onError: (err: any) => {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  function UpdateName() {
    return (
      <>
        <div className="flex items-center justify-between p-2 space-x-2 w-full">
          {isEditName ? (
            <form
              action=""
              className="w-full flex items-center space-x-2"
              onSubmit={handleNameSubmit}
            >
              <input
                ref={nameRef}
                type="text"
                name=""
                id=""
                required
                className="w-full p-2 rounded-sm border border-gray-300 bg-transparent dark:text-white focus:outline-none ring-0"
              />
              <button
                type="submit"
                className="bg-gray-300 dark:bg-gray-700 dark:text-white p-2 font-semibold px-5 rounded-sm text-black text-[15px] hover:bg-gray-400/80"
              >
                Save
              </button>
            </form>
          ) : (
            <h1 className="font-semibold text-gray-700 dark:text-white">
              {user?.name}
            </h1>
          )}
          <button
            onClick={() => {
              setSIsEditName(!isEditName);
            }}
            className="bg-gray-300 dark:bg-gray-700 dark:text-white p-2 font-semibold px-5 rounded-sm text-black text-[15px] hover:bg-gray-400/80"
          >
            {isEditName ? "Cancel" : "Edit"}
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="dark:bg-dark-bg h-fit w-full">
      <div className="flex flex-col items-start space-y-3 w-full">
        <div className="flex items-center justify-between space-x-2 pb-10 w-full">
          <h1 className="font-semibold text-lg text-gray-700 dark:text-white">
            user Information
          </h1>
          <button
            onClick={logout}
            className="bg-gray-300 dark:bg-gray-700 dark:text-white p-2 font-semibold px-5 rounded-sm text-black text-[15px] hover:bg-gray-400/80"
          >
            Log Out
          </button>
        </div>

        {/* image upload */}
        <div className="w-full flex items-center justify-between p-2 ">
          <Dropzone
            onDrop={(acceptedFiles) => handleUploadImage(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {selectedImage ? (
                    <div className="">
                      <img
                        src={selectedImage}
                        className="w-20 h-20 object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="cursor-pointer  w-full flex  items-center justify-center space-x-2">
                      <BsCameraFill size={50} className="text-main-color" />
                      <h1 className="whitespace-nowrap font-semibold text-blue-color dark:text-white text-sm capitalize">
                        Update Photo
                      </h1>
                    </div>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
          <button
            onClick={handleUpdateProfile}
            className="bg-gray-300 p-2 font-semibold dark:bg-gray-700 dark:text-white px-5 rounded-sm text-black text-[15px] hover:bg-gray-400/80"
          >
            Update Profile
          </button>
        </div>
        <UpdateName />
        {!isUpdatingPassword ? (
          <>
            <div className="flex items-center justify-between p-2 gap-3 w-full">
              <input
                type="password"
                value={"01451515454"}
                className="w-full p-2 rounded-sm border border-gray-300 bg-transparent dark:text-white focus:outline-none ring-0"
              />
              <button
                onClick={() => setSIsUpdatingPassword(true)}
                className="bg-gray-300 dark:bg-gray-700 dark:text-white p-2 font-semibold px-5 rounded-sm text-black text-[15px] hover:bg-gray-400/80"
              >
                change
              </button>
            </div>
          </>
        ) : (
          <div className="w-full flex flex-col">
            {" "}
            <UpdatePassword
              isUpdatingPassword={isUpdatingPassword}
              setSIsUpdatingPassword={setSIsUpdatingPassword}
            />
          </div>
        )}
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
      />
    </div>
  );
};

export default Account;
