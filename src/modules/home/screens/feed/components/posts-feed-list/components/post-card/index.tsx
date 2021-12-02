import { Post } from "@/src/models/post";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Body } from "@/src/ui-components/text/body";
import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import PostCardFooter from "./components/post-card-footer";
import PostCardHeader from "./components/post-card-header";

import { PostWrapper } from "./styles";

export interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { content } = post;
  return (
    <PostWrapper>
      <Column spadding={`${rfValuePX(15)}`} paddingBottom="0px">
        <PostCardHeader post={post}></PostCardHeader>

        <LayoutContainer marginTop={rfValuePX(10)} />

        <LayoutContainer>
          <Body lineHeight={rfValue(20)} textAlign="justify">
            {content}
          </Body>
        </LayoutContainer>
      </Column>

      <PostCardFooter post={post}></PostCardFooter>
    </PostWrapper>
  );
};

export default PostCard;
