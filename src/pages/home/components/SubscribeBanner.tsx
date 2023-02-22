import { useRef } from "react";
import Frame from "../../../assets/login.png";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
const SubscribeBanner: React.FC = () => {
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
          onSuccess: (responseData: any) => {},
          onError: (err: any) => {
            // setError("something went wrong");
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Frame})`,
        backgroundPosition: "center",
        width: "100%",
        minHeight: "350px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="my-5 flex items-center justify-center"
    >
      <div className="max-w-md mx-auto bg-white flex flex-col items-center justify-center space-y-2 p-3 w-full">
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
};

export default SubscribeBanner;
