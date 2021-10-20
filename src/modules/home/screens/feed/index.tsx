import { Column } from "@/src/ui-components/layout/column";
import React from "react";
import FeedList from "./components/feed-list";
import Footer from "./components/footer";
import Header from "./components/header";

// import { Container } from './styles';

const FeedScreen: React.FC = () => {
  return (
    <Column height="100%" alignItems="flex-start">
      <Header></Header>
      <FeedList></FeedList>
      <Footer></Footer>
    </Column>
  );
};

export default FeedScreen;
