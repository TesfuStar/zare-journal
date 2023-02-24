import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useAuth } from "../../../context/Auth";

interface Props {
  pageNumber: number;
}

interface Comment {
  // Define the shape of a Blog object
  id: string;
  title: string;
  body: string;
  blog_id: string;
  created_at: string;
  author: {
    name: string;
    profile_photo_url: string;
  };
  blog: {
    title:string;
    blog_cover: {
      mime_type: string;
    };
  };
}

interface CommentData {
  data: {
    data: Comment[];
  };
}
// articles
const UseComment = ({ pageNumber }: Props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const { token } = useAuth();

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel: () => void;
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_BACKEND_URL}my-comments`,
      params: { page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      headers: headers,
    })
      .then((res: AxiosResponse<CommentData>) => {
        console.log(res?.data?.data);
        setComments((prevComment) => {
          return Array.from(
            new Set<Comment>([...prevComment, ...res.data.data?.data])
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

  return { loading, error, comments, hasMore };
};

export default UseComment;
