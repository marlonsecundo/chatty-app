import { Post } from "@/src/models/post";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "../post-card";

import { FeedWrapper } from "./styles";

const FeedList: React.FC = () => {
  const posts: Post[] = [
    {
      id: "2105ebc8-8b33-48c8-91f4-b5f2c75715d6",
      content: "Ola gente",
      userId: 1,
      commentsCount: 20,
      likesCount: 15,
      passedTime: "21min",
      user: {
        userName: "marlon_secundo",
        email: "marlon.secundo@gmail.com",
        profile: {
          birth: new Date(),
          description: "Sou DEV",
          imageUrl:
            "https://lh3.googleusercontent.com/a-/AOh14GgloPD3GE3827pAuoJgnZ9wYPDCFFM2ffj7UaMD=s96-c",
          name: "Marlon Secundo",
        },
      },
    },
  ];

  return (
    <FeedWrapper>
      <PostCard post={posts[0]}></PostCard>
    </FeedWrapper>
  );
};

export default FeedList;
