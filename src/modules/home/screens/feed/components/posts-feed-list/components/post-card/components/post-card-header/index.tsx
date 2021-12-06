import { useAuth } from "@/src/contexts/auth-context";
import { Post } from "@/src/models/post";
import { DefaultScreenProps, FeedScreenProps } from "@/src/routes/home.routes";
import userService from "@/src/services/user.service";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import LazyImage from "@/src/ui-components/lazy-image";
import { Body } from "@/src/ui-components/text/body";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback } from "react";
import { PostCardProps } from "../..";
import { AvatarButton, AvatarButtonWrapper, AvatarImage } from "./styles";

const PostCardHeader: React.FC<PostCardProps> = ({ post }) => {
  const { token } = useAuth();
  const navigation = useNavigation<DefaultScreenProps>();

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

  const handleAvatarButton = useCallback(async () => {
    try {
      const user = await userService.showUser({
        token,
        userId: post.user?.id,
      });

      navigation.navigate("Profile", { user });
    } catch (error) {
      const exeption = getExceptionFromError(error);
    }
  }, [token]);

  return (
    <Row alignItems="flex-start">
      <AvatarButtonWrapper>
        <AvatarButton onPress={handleAvatarButton}></AvatarButton>
        <AvatarImage
          imageUrl={post.user?.profile?.imageUrl ?? ""}
        ></AvatarImage>
      </AvatarButtonWrapper>

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
