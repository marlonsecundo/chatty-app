import { PostProvider } from "@/src/contexts/post-context";
import { Column } from "@/src/ui-components/layout/column";
import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import PostsFeedList from "./components/posts-feed-list";

const FeedScreen: React.FC = () => {
  return (
    <PostProvider>
      <Column height="100%" alignItems="flex-start">
        <Header></Header>
        <PostsFeedList></PostsFeedList>
        <Footer></Footer>
      </Column>
    </PostProvider>
  );
};

export default FeedScreen;
