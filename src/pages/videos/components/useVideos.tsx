import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Props {
  pageNumber: number;
  id?: string;
}

interface CateName {
  name: string;
}
interface Blog {
  // Define the shape of a Blog object
  id: string;
  title: string;
  slug: string;
  body: string;
  sub_heading: string;
  blog_cover: {
    original_url: string;
    mime_type: string;
  };
  created_at: string;
  category: {
    name: string;
  };
  thumbnail: {
    original_url: string;
    mime_type: string;
  };
}

interface HomeSectionData {
  data: {
    data: Blog[];
  };
}

// articles
const useVideos = ({ pageNumber }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}videos`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res: AxiosResponse<HomeSectionData>) => {
        // console.log(res?.data?.data?.data);

        setVideos((preVideos) => {
          return Array.from(
            new Set<Blog>([...preVideos, ...res.data.data?.data])
          );
        });
        setHasMore(res.data.data?.data?.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, videos, hasMore };
};

export default useVideos;
