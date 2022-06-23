import { useAuth } from "@/src/contexts/auth-context";
import { useService } from "@/src/contexts/service-context";
import { HomeStackNavProps } from "@/src/routes/home.routes";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import { Body } from "@/src/ui-components/text/body";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback } from "react";
import Toast from "react-native-root-toast";
import { PostCardProps } from "../..";
import { AvatarButton, AvatarButtonWrapper, AvatarImage } from "./styles";

const PostCardHeader: React.FC<PostCardProps> = ({ post }) => {
  const { token } = useAuth();
  const navigation = useNavigation<HomeStackNavProps>();
  const { serviceManager } = useService();
  const { userService } = serviceManager;

  const renderProfileName = (
    <Body fontFamily="Roboto_700Bold" opacity={0.9}>
      {post.user?.profile?.name ?? "-"}
    </Body>
  );

  const renderUserName = (
    <Body color="primary" opacity={0.6}>
      {post.user?.username ? "@" + post.user?.username : "-"}
    </Body>
  );

  const handleAvatarButton = useCallback(async () => {
    try {
      const user = await userService.showUser({
        token: token ?? "",
        userId: post.user?.id ?? "",
      });

      navigation.navigate("Profile", { user });
    } catch (error) {
      const exception = getExceptionFromError(error);
      Toast.show(exception.message);
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

          {/* <IconButton
            icon={<FeatherIcon name="more-vertical"></FeatherIcon>}
            withBackgroundColor={false}
          ></IconButton> */}
        </Row>

        <LayoutContainer marginTop={rfValuePX(5)} />
      </Column>
    </Row>
  );
};

export default PostCardHeader;
