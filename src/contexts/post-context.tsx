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
import postService, {
  FetchPostProps,
  StorePostProps,
} from "../services/post.service";

interface PostContextProps {
  posts: Post[];
  fetchPosts: (args: FetchPostProps, replace: boolean) => Promise<void>;
  storePost: (args: StorePostProps) => Promise<Post>;
  postPagResult?: PaginationResult<Post>;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const PostProvider: React.FC = ({ children }) => {
  const [postPagResult, setPostPagResult] = useState<PaginationResult<Post>>();
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(
    async (args: FetchPostProps, replace: boolean) => {
      try {
        const result = await postService.fetchPosts(args);

        setPostPagResult(result ?? undefined);

        const resultData = result?.data ?? [];

        if (replace) {
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
      const post = await postService.createPost(args);

      if (!post) throw NullException({ message: "Post Null" });

      setPosts((prevPosts) => [post, ...prevPosts]);

      return post;
    } catch (err) {
      throw err;
    }
  }, []);

  return (
    <PostContext.Provider
      value={{ fetchPosts, posts, postPagResult, storePost }}
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
