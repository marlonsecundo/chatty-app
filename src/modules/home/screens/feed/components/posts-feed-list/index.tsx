import AuthContext from "@/src/contexts/auth-context";
import PostContext, { usePost } from "@/src/contexts/post-context";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { FeedWrapper, StyledFlatList } from "./styles";
import Toast from "react-native-root-toast";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import PostCard from "./components/post-card";
import { Post } from "@/src/models/post";
import LoadingPosts from "./components/loading-posts";
import ListEnd from "./components/list-end";

const PostsFeedList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { posts, loadPosts, postPagResult } = usePost();

  const [reachedTheEnd, setReachedTheEnd] = useState(false);

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
    if (postPagResult?.meta.currentPage === postPagResult?.meta.lastPage) {
      setReachedTheEnd(true);
      return;
    }

    if (!postPagResult?.meta.currentPage) return;

    handleLoadPosts(postPagResult?.meta.currentPage + 1);
  }, [postPagResult]);

  const renderItem = useCallback(({ item }: { item: Post }) => {
    return <PostCard key={item.id} post={item}></PostCard>;
  }, []);

  useEffect(() => {
    handleLoadPosts(1, true);
  }, []);

  const listFooterComp = reachedTheEnd ? (
    <ListEnd></ListEnd>
  ) : (
    <LoadingPosts></LoadingPosts>
  );

  return (
    <FeedWrapper>
      <StyledFlatList
        data={posts ?? []}
        renderItem={renderItem}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.05}
        ListFooterComponent={listFooterComp}
      />
    </FeedWrapper>
  );
};

export default PostsFeedList;
