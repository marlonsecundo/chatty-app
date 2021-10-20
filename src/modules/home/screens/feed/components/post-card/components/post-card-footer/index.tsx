import { Post } from "@/src/models/post";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Row } from "@/src/ui-components/layout/row";
import { Body } from "@/src/ui-components/text/body";
import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import React from "react";
import { PostCardProps } from "../..";
import { Footer } from "./styles";

const PostCardFooter: React.FC<PostCardProps> = ({ post }) => {
  const renderLikes = (
    <IconButton
      withBackgroundColor={false}
      icon={
        <FeatherIcon
          name="heart"
          fontSize={rfValue(18)}
          color="primary"
        ></FeatherIcon>
      }
      text={post.likesCount?.toString() ?? "0"}
      size="normal"
      textColor="primary"
    />
  );

  const renderComments = (
    <IconButton
      withBackgroundColor={false}
      icon={
        <FeatherIcon
          color="primary"
          name="message-square"
          fontSize={rfValue(18)}
        ></FeatherIcon>
      }
      size="normal"
      text={post.commentsCount?.toString() ?? "0"}
      textColor="primary"
    />
  );

  const renderPassedTime = <Body>{post.passedTime}</Body>;

  return (
    <Footer
      width="100%"
      justifyContent="space-between"
      spadding={`${rfValuePX(8)} 0px`}
    >
      <Row justifyContent="space-between">
        {renderLikes}

        <Row alignItems="center" marginLeft={rfValuePX(10)}>
          {renderComments}
        </Row>
      </Row>

      <Row alignItems="center" marginRight={rfValuePX(15)}>
        {renderPassedTime}
      </Row>
    </Footer>
  );
};

export default PostCardFooter;
