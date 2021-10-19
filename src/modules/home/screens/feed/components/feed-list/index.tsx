import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "../post-card";

import { FeedWrapper } from "./styles";

const FeedList: React.FC = () => {
  return (
    <FeedWrapper>
      <PostCard></PostCard>
    </FeedWrapper>
  );
};

export default FeedList;
