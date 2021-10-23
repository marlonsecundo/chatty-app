import React, { MutableRefObject, useCallback, useRef, useState } from "react";
import { createContext } from "react";
import { Exception } from "../exceptions";
import { PaginationResult } from "../models/pagination-result";
import { Post } from "../models/post";
import { FetchPostProps, fetchPosts } from "../services/post.service";

interface PostContextProps {
  posts: Post[];
  loadPosts: (args: FetchPostProps, clearBefore: boolean) => Promise<void>;
  loading: boolean;
  postPagResult?: PaginationResult<Post>;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider: React.FC = ({ children }) => {
  const [postPagResult, setPostPagResult] = useState<PaginationResult<Post>>();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(
    async (args: FetchPostProps, clearBefore: boolean) => {
      try {
        setLoading(true);

        const result = await fetchPosts(args);

        setPostPagResult(result ?? undefined);

        const resultData = result?.data ?? [];

        if (clearBefore) {
          setPosts(resultData);
        } else {
          setPosts((prevPosts) => [...prevPosts, ...resultData]);
        }
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <PostContext.Provider value={{ loadPosts, posts, loading, postPagResult }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
