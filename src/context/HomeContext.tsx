import { createContext, useState, useEffect, useContext } from "react";

const HomeContext = createContext<any | null>(null);

export function useHome() {
  return useContext(HomeContext);
}

export function HomeProvider({ children }: any) {
  const [checked, setChecked] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] =
    useState<boolean>(false);
  const [isSubscriptionSuccess, setIsSubscriptionSuccess] =
    useState<boolean>(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    setTimeout(() => setChecked(true), 2000);
  }, []);

  //Return
  return (
    <HomeContext.Provider
      value={{
        checked,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        setIsSignInModalOpen,
        isSignInModalOpen,
        email,
        setEmail,
        isSubscriptionSuccess,
        setIsSubscriptionSuccess,searchString, setSearchString
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
