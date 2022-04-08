import { Column } from "@/src/ui-components/layout/column";
import React, { useCallback, useMemo, useRef } from "react";
import { Text, StyleSheet } from "react-native";
import { View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import PostLikeCard from "./components/post-like-card";

const PostLikesBottomSheet: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleSheetChanges = useCallback((index: number) => {}, []);

  const postLike = {
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
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      detached={false}
    >
      <Column>
        <PostLikeCard postLike={postLike}></PostLikeCard>
        <PostLikeCard postLike={postLike}></PostLikeCard>
        <PostLikeCard postLike={postLike}></PostLikeCard>
        <PostLikeCard postLike={postLike}></PostLikeCard>
        <PostLikeCard postLike={postLike}></PostLikeCard>
      </Column>
    </BottomSheet>
  );
};

export default PostLikesBottomSheet;
