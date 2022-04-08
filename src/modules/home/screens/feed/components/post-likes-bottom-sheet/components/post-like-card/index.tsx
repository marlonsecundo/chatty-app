import { PostLike } from "@/src/models/post-like";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import LazyImage from "@/src/ui-components/lazy-image";
import { Body } from "@/src/ui-components/text/body";
import { rfPercentage, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { View } from "react-native";
import { UserImage } from "./styles";

// import { Container } from './styles';

interface Props {
  postLike: PostLike;
}

const PostLikeCard: React.FC<Props> = ({ postLike }) => {
  const { user, userId } = postLike;
  return (
    <Row smargin={`${rfPercentage(2)}px ${rfPercentage(4)}px`}>
      <UserImage imageUrl={user?.profile?.imageUrl ?? ""}></UserImage>

      <LayoutContainer marginLeft={rfValuePX(15)} justifyContent="center">
        <Body>{user?.username}</Body>
      </LayoutContainer>
    </Row>
  );
};

export default PostLikeCard;
