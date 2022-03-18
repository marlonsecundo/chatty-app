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

const FeedScreen: React.FC = () => {
  return (
    <PostProvider>
      <Column height="100%" alignItems="flex-start">
        <HeaderBar
          leftContent={<LogoutButton></LogoutButton>}
          title="Feed"
          rightContent={<ProfileButton></ProfileButton>}
        ></HeaderBar>
        <PostsFeedList></PostsFeedList>
        <Footer></Footer>
      </Column>
    </PostProvider>
  );
};

export default FeedScreen;
