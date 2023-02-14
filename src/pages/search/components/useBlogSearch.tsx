import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Props {
  query: string;
  pageNumber: number;
  sort: string;
}

interface Blog {
  // Define the shape of a Blog object
  id: string;
  title: string;
  body: string;
  blog_cover: {
    original_url: string;
    mime_type:string;
  };
  created_at: string;
  category: {
    name: string;
  };
}

interface BlogSearchData {
  data: { search: { data: Blog[] }; most_popular:Blog[]  };
}

// most_popular
const useBlogSearch = ({ query, pageNumber, sort }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBlogs([]);
    setPopularBlogs([])
  }, [query, sort]);

  console.log({ hasMore });

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}search-articles`,
      params: { search: query, page: pageNumber, sortBy: sort },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res: AxiosResponse<BlogSearchData>) => {
        // console.log(res.data.data.most_popular);
        // console.log({ res });
        setBlogs((prevBlogs) => {
          return Array.from(
            new Set<Blog>([...prevBlogs, ...res.data.data?.search?.data])
          );
        });
        setPopularBlogs(res.data.data.most_popular)
        setHasMore(res.data.data?.search?.data?.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber, sort]);

  return { loading, error, blogs, hasMore,popularBlogs };
};

export default useBlogSearch;
