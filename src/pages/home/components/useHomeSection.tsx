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
  body: string;
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
    articles: { data: Blog[] };
    home_section: { name: string };
    todays_pick: Blog[];
  };
}

// articles
const useHomeSection = ({ pageNumber, id }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [name, setName] = useState<string>("");
  const [todayPick, setTodayPick] = useState<Blog[]>([]);
  useEffect(() => {
    setBlogs([]);
  }, [id]);

  console.log({ hasMore });

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}home-section/${id}`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res: AxiosResponse<HomeSectionData>) => {
        console.log(res?.data?.data?.home_section?.name);
        setName(res?.data?.data?.home_section?.name);
        setTodayPick(res?.data?.data?.todays_pick)
        setBlogs((prevBlogs) => {
          return Array.from(
            new Set<Blog>([...prevBlogs, ...res.data.data?.articles?.data])
          );
        });
        setHasMore(res.data.data?.articles?.data?.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [id, pageNumber]);

  return { loading, error, blogs, hasMore, name,todayPick };
};

export default useHomeSection;
