import { PostLike } from "@/src/models/post-like";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import LazyImage from "@/src/ui-components/lazy-image";
import { Body } from "@/src/ui-components/text/body";
import { rfPercentage, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { View } from "react-native";

import { DarkBody, DarkCaption, UserImage } from "./styles";

interface Props {
  postLike: PostLike;
}

const PostLikeCard: React.FC<Props> = ({ postLike }) => {
  const { user, userId } = postLike;
  return (
    <Row smargin={`${rfPercentage(2)}px ${rfPercentage(4)}px`}>
      <UserImage imageUrl={user?.profile?.imageUrl ?? ""}></UserImage>

      <LayoutContainer marginLeft={rfValuePX(15)} justifyContent="center">
        <DarkBody>{user?.username}</DarkBody>
      </LayoutContainer>

      <LayoutContainer alignItems="flex-end" justifyContent="center" sflex={1}>
        <DarkCaption opacity={0.4}>{postLike.timeSince}</DarkCaption>
      </LayoutContainer>
    </Row>
  );
};

export default PostLikeCard;
