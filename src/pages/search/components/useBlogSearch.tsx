import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface Props {
  query: string;
  pageNumber: number;
}

interface Book {
  // Define the shape of a book object
}

interface BlogSearchData {
  docs: Book[];
}

const useBlogSearch = ({ query, pageNumber }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBooks([]);
  }, [query]);

  console.log({ hasMore });

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}search-articles`,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res: AxiosResponse<BlogSearchData>) => {
        console.log({ res });
        setBooks((prevBooks) => {
          return Array.from(new Set<Book>([...prevBooks, ...res.data.docs]));
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);

  return { loading, error, books, hasMore };
};

export default useBlogSearch;
