import { Post } from "@/src/models/post";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import { Body } from "@/src/ui-components/text/body";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { PostCardProps } from "../..";
import AvatarImage from "../avatar-image";

const PostCardHeader: React.FC<PostCardProps> = ({ post }) => {
  const renderProfileName = (
    <Body fontFamily="Roboto_700Bold" opacity={0.9}>
      {post.user?.profile?.name ?? "-"}
    </Body>
  );

  const renderUserName = (
    <Body color="primary" opacity={0.6}>
      {post.user?.username ?? "-"}
    </Body>
  );

  return (
    <Row alignItems="flex-start">
      <Column width="auto">
        <AvatarImage></AvatarImage>
      </Column>

      <LayoutContainer marginLeft={rfValuePX(15)} />

      <Column sflex={1} alignItems="flex-start">
        <Row
          justifyContent="space-between"
          width="100%"
          alignItems="flex-start"
        >
          <Column alignItems="flex-start" justifyContent="space-between">
            {renderProfileName}

            <LayoutContainer marginTop={rfValuePX(1)} />

            {renderUserName}
          </Column>

          <IconButton
            icon={<FeatherIcon name="more-vertical"></FeatherIcon>}
            withBackgroundColor={false}
          ></IconButton>
        </Row>

        <LayoutContainer marginTop={rfValuePX(5)} />
      </Column>
    </Row>
  );
};

export default PostCardHeader;
