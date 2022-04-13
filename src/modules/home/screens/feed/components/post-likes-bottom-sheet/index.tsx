import { Column } from "@/src/ui-components/layout/column";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, StyleSheet, RefreshControl, ListRenderItem } from "react-native";
import { View } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import PostLikeCard from "./components/post-like-card";
import { PostLike } from "@/src/models/post-like";
import { Post } from "@/src/models/post";

const PostLikesBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const postLike: PostLike = {
    postId: "2a40049d-921e-4a7a-b2e9-b45600b5ac9d",
    userId: "bb22982d-e80f-481d-b1e9-82ac305a45d2",
    user: {
      id: "bb22982d-e80f-481d-b1e9-82ac305a45d2",
      username: "dfsodkfsdf",
      profile: {
        imageUrl:
          "https://lh3.googleusercontent.com/a-/AOh14GgloPD3GE3827pAuoJgnZ9wYPDCFFM2ffj7UaMD=s96-c",
      },
      postLikesCount: 0,
      postsCount: 0,
    },
    timeSince: "1 minuto atras",
  };

  const likes = [
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
    postLike,
  ];

  const renderItem: ListRenderItem<PostLike> = useCallback(({ item }) => {
    return <PostLikeCard key={item.userId} postLike={item}></PostLikeCard>;
  }, []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      detached={false}
    >
      <BottomSheetFlatList
        style={{ flex: 1 }}
        data={likes}
        renderItem={renderItem}
        onEndReached={handleOnReachEnd}
        onEndReachedThreshold={0.05}
        ListFooterComponent={listFooterComp}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </BottomSheet>
  );
};

export default PostLikesBottomSheet;
