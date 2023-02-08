import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const HomePage: React.FC = () => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const homePageData = useQuery(
    ["getHomePageDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}articles`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {},
    }
  );

  console.log(homePageData?.data?.data?.data?.todays_pick)
  return <div>
    
    {/* todays pick */}
    
  </div>;
};

export default HomePage;
