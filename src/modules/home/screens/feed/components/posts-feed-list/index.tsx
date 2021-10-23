import AuthContext from "@/src/contexts/auth-context";
import PostContext from "@/src/contexts/post-context";
import React, { useCallback, useContext, useEffect } from "react";
import { FeedWrapper, StyledFlatList } from "./styles";
import Toast from "react-native-root-toast";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import PostCard from "../post-card";
import { Post } from "@/src/models/post";
import LoadingPosts from "../loading-posts";

const PostsFeedList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { posts, loadPosts, loading, postPagResult } = useContext(PostContext);

  const handleLoadPosts = useCallback(
    async (page: number, clearBefore: boolean = false) => {
      try {
        await loadPosts({ token: token ?? "", page, limit: 10 }, clearBefore);
      } catch (err) {
        const exception = getExceptionFromError(err);

        Toast.show(exception.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.CENTER,
        });
      }
    },
    [token]
  );

  const handleOnReachEnd = useCallback(() => {
    if (postPagResult?.meta.currentPage === postPagResult?.meta.lastPage)
      return;

    if (!postPagResult?.meta.currentPage) return;

    handleLoadPosts(postPagResult?.meta.currentPage + 1);
  }, [postPagResult]);

  const renderItem = useCallback(({ item }: { item: Post }) => {
    return <PostCard key={item.id} post={item}></PostCard>;
  }, []);

  useEffect(() => {
    handleLoadPosts(1, true);
  }, []);

  return (
    <FeedWrapper>
      <StyledFlatList
        data={posts ?? []}
        renderItem={renderItem}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.05}
        ListFooterComponent={<LoadingPosts></LoadingPosts>}
      />
    </FeedWrapper>
  );
};

export default PostsFeedList;
