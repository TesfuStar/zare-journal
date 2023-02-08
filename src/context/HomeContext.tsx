import { createContext, useState, useEffect, useContext } from "react";

const HomeContext = createContext<any | null>(null);

export function useHome() {
  return useContext(HomeContext);
}

export function HomeProvider({ children }: any) {
  const [checked, setChecked] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(true);

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
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
