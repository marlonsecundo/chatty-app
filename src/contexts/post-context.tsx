import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { createContext } from "react";
import { ContextHookException, Exception, NullException } from "../exceptions";
import { PaginationResult } from "../models/pagination-result";
import { Post } from "../models/post";
import {
  createPost,
  FetchPostProps,
  fetchPosts,
  StorePostProps,
} from "../services/post.service";

interface PostContextProps {
  posts: Post[];
  loadPosts: (args: FetchPostProps, clearBefore: boolean) => Promise<void>;
  storePost: (args: StorePostProps) => Promise<Post>;
  postPagResult?: PaginationResult<Post>;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider: React.FC = ({ children }) => {
  const [postPagResult, setPostPagResult] = useState<PaginationResult<Post>>();
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(
    async (args: FetchPostProps, clearBefore: boolean) => {
      try {
        const result = await fetchPosts(args);

        setPostPagResult(result ?? undefined);

        const resultData = result?.data ?? [];

        if (clearBefore) {
          setPosts(resultData);
        } else {
          setPosts((prevPosts) => {
            // Filter duplicated posts
            const newPosts = resultData.filter(
              (p) => !prevPosts.find((i) => i.id === p.id)
            );

            return [...prevPosts, ...newPosts];
          });
        }
      } catch (err) {
        throw err;
      }
    },
    []
  );

  const storePost = useCallback(async (args: StorePostProps): Promise<Post> => {
    try {
      const post = await createPost(args);

      if (!post) throw NullException({ message: "Post Null" });

      setPosts((prevPosts) => [post, ...prevPosts]);

      return post;
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <PostContext.Provider
      value={{ loadPosts, posts, postPagResult, storePost }}
    >
      {children}
    </PostContext.Provider>
  );
};

export function usePost() {
  const context = useContext(PostContext);

  if (!context) {
    throw ContextHookException({ hookName: "usePost" });
  }

  return context;
}

export default PostContext;