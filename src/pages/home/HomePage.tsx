import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const HomePage:React.FC = () => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const homePageData = useQuery(
        ["getHomePageDataApi"],
        async () =>
          await axios.get(`http://192.168.0.144:8000/api/articles`, {
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
  return (
    <div>HomePage</div>
  )
}

export default HomePage