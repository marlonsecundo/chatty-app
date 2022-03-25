import { PostProvider } from "@/src/contexts/post-context";
import { Column } from "@/src/ui-components/layout/column";
import React from "react";
import Footer from "./components/feed-footer";
import Header from "../components/header-bar";
import PostsFeedList from "./components/posts-feed-list";
import HeaderBar from "../components/header-bar";
import BackHeaderButton from "../components/back-header-button";
import ProfileButton from "./components/profile-button";
import LogoutButton from "./components/logout-button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/src/routes/home.routes";

export interface FeedScreenProps {
  postId?: string;
}

type Props = NativeStackScreenProps<HomeStackParamList, "Feed">;

const FeedScreen: React.FC<Props> = ({ route }) => {
  const postId = route.params?.postId;

  return (
    <PostProvider>
      <Column height="100%" alignItems="flex-start">
        <HeaderBar
          leftContent={<LogoutButton></LogoutButton>}
          title="Feed"
          rightContent={<ProfileButton></ProfileButton>}
        ></HeaderBar>
        <PostsFeedList postId={postId}></PostsFeedList>
        <Footer></Footer>
      </Column>
    </PostProvider>
  );
};

export default FeedScreen;
