import AuthContext from "@/src/contexts/auth-context";
import PostContext, { usePost } from "@/src/contexts/post-context";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { FeedWrapper, StyledFlatList } from "./styles";
import Toast from "react-native-root-toast";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import PostCard from "./components/post-card";
import { Post } from "@/src/models/post";
import LoadingPosts from "./components/loading-posts";
import ListEnd from "./components/list-end";
import { ListRenderItem, RefreshControl } from "react-native";
import { View } from "@motify/components";

const PostsFeedList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { posts, fetchPosts, postPagResult } = usePost();
  const fistTimeRef = useRef(true);

  const [reachedTheEnd, setReachedTheEnd] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const handleFetchPosts = useCallback(
    async (page: number, replace: boolean = false) => {
      try {
        await fetchPosts({ token: token ?? "", page, limit: 10 }, replace);
      } catch (err) {
        const exception = getExceptionFromError(err);

        Toast.show(exception.message);
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

    handleFetchPosts(postPagResult?.meta.currentPage + 1);
  }, [postPagResult]);

  const renderItem: ListRenderItem<Post> = useCallback(({ item }) => {
    return <PostCard key={item.id} post={item}></PostCard>;
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await handleFetchPosts(1, true);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    handleFetchPosts(1, true);
  }, []);

  // If is the first time that fetch the posts and its your result is empty, so the user reached the end of the feed
  useEffect(() => {
    if (fistTimeRef.current) {
      if (posts.length < 1) {
        setReachedTheEnd(true);
      }
    }

    fistTimeRef.current = false;
  }, [posts]);

  const listFooterComp = reachedTheEnd ? (
    <ListEnd></ListEnd>
  ) : (
    <LoadingPosts></LoadingPosts>
  );

  return (
    <FeedWrapper>
      <StyledFlatList<React.ElementType>
        data={posts ?? []}
        renderItem={renderItem}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.05}
        ListFooterComponent={listFooterComp}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </FeedWrapper>
  );
};

export default PostsFeedList;
