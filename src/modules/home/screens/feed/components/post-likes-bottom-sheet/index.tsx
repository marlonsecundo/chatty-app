import { Column } from "@/src/ui-components/layout/column";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, StyleSheet, RefreshControl, ListRenderItem } from "react-native";
import { View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PostLikeCard from "./components/post-like-card";
import { PostLike } from "@/src/models/post-like";
import { Post } from "@/src/models/post";
import { PaginationResult } from "@/src/models/pagination-result";
import { useAuth } from "@/src/contexts/auth-context";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import Toast from "react-native-root-toast";
import { useService } from "@/src/contexts/service-context";
import ListEnd from "../posts-feed-list/components/list-end";
import LoadingPosts from "../posts-feed-list/components/loading-posts";
import { usePost } from "@/src/contexts/post-context";

const PostLikesBottomSheet: React.FC = ({}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    // -1 means that the bottom sheet is closed
    if (index == -1) {
      selectPost(null);
    }
  }, []);

  const [reachedTheEnd, setReachedTheEnd] = useState(false);

  const [postLikesPagResult, setPostLikesPagResult] =
    useState<PaginationResult<PostLike> | null>(null);
  const [postLikes, setPostLikes] = useState<PostLike[]>([]);

  const { token } = useAuth();
  const { serviceManager } = useService();
  const { postService } = serviceManager;

  const { selectedPost, selectPost } = usePost();

  const fistTimeRef = useRef(true);

  const handleFetchPostsLikes = useCallback(
    async (postId, page: number, reset?: boolean) => {
      try {
        const result = await postService.fetchPostsLikes({
          token: token ?? "",
          page,
          limit: 8,
          postId: postId ?? "",
        });

        setPostLikesPagResult(result);

        if (result?.data) {
          setPostLikes((prevState) => {
            if (reset) {
              return result.data;
            }

            const data = [...prevState, ...result?.data];

            return data;
          });
        }
      } catch (err) {
        if (reset) {
          setPostLikes([]);
        }

        const exception = getExceptionFromError(err);

        Toast.show(exception.message);
      }
    },
    [token]
  );

  const handleOnReachEnd = useCallback(() => {
    if (
      postLikesPagResult !== null &&
      postLikesPagResult?.meta.currentPage === postLikesPagResult?.meta.lastPage
    ) {
      setReachedTheEnd(true);
      return;
    }

    if (!postLikesPagResult?.meta.currentPage) return;

    handleFetchPostsLikes(
      selectedPost?.id,
      postLikesPagResult?.meta.currentPage + 1
    );
  }, [postLikesPagResult, selectedPost]);

  const renderItem: ListRenderItem<PostLike> = useCallback(({ item }) => {
    return <PostLikeCard key={item.userId} postLike={item}></PostLikeCard>;
  }, []);

  const listFooterComp = reachedTheEnd ? (
    <ListEnd
      lightColors={true}
      text="Wow! Seens that you reached the end of the likes!"
    ></ListEnd>
  ) : (
    <LoadingPosts text="Loading new likes" lightColors={true}></LoadingPosts>
  );

  // If is the first time that fetch the posts and its your result is empty, so the user reached the end of the feed
  useEffect(() => {
    if (fistTimeRef.current) {
      if (postLikes.length < 1) {
        setReachedTheEnd(true);
      }
    }

    fistTimeRef.current = false;
  }, [postLikes]);

  useEffect(() => {
    if (selectedPost) {
      bottomSheetRef.current?.expand();

      handleFetchPostsLikes(selectedPost.id, 1, true);
    }
  }, [selectedPost]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      detached={false}
    >
      <BottomSheetFlatList
        style={{ flex: 1 }}
        data={postLikes}
        keyExtractor={(item) => item.userId + ""}
        renderItem={renderItem}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.05}
        ListFooterComponent={listFooterComp}
      />
    </BottomSheet>
  );
};

export default PostLikesBottomSheet;
