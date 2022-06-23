import { useAuth } from "@/src/contexts/auth-context";
import { usePost } from "@/src/contexts/post-context";
import { useService } from "@/src/contexts/service-context";
import { StyledMenuItem } from "@/src/modules/components/styled-menu-item";
import { HomeStackNavProps } from "@/src/routes/home.routes";
import { FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Column } from "@/src/ui-components/layout/column";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";
import { Body } from "@/src/ui-components/text/body";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValuePX } from "@/src/utils/responsive-fontsize";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import { Menu } from "react-native-material-menu";
import Toast from "react-native-root-toast";
import { PostCardProps } from "../..";
import { AvatarButton, AvatarButtonWrapper, AvatarImage } from "./styles";

const PostCardHeader: React.FC<PostCardProps> = ({ post }) => {
  const { token, user } = useAuth();
  const navigation = useNavigation<HomeStackNavProps>();
  const { serviceManager } = useService();
  const { fetchPosts } = usePost();
  const { userService, postService } = serviceManager;

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const handleDeletePost = useCallback(async () => {
    try {
      const result = await postService.deletePost({
        id: post.id,
        token: token ?? "",
      });

      if (result) {
        Toast.show("Successfully deleted!");
        fetchPosts({ limit: 10, page: 1, token: token ?? "" }, true);
      }
    } catch (error) {
      const exception = getExceptionFromError(error);

      Toast.show(exception.message);
    }
  }, []);

  const deletePostOnPress = useCallback(async () => {
    try {
      Alert.alert("Confirmation", "Do you want to delete the post?", [
        {
          text: "NO",
          onPress: () => {},
          style: "cancel",
        },
        { text: "YES", onPress: handleDeletePost },
      ]);
    } catch (error) {
      const exception = getExceptionFromError(error);

      Toast.show(exception.message);
    }
  }, []);

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

      navigation.push("Profile", { user });
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

          {post.user?.id === user?.id && (
            <Menu
              visible={visible}
              anchor={
                <IconButton
                  onPress={showMenu}
                  withBackgroundColor={false}
                  icon={<FeatherIcon name="more-vertical"></FeatherIcon>}
                ></IconButton>
              }
              onRequestClose={hideMenu}
            >
              <StyledMenuItem onPress={deletePostOnPress}>
                Delete Post
              </StyledMenuItem>
            </Menu>
          )}
        </Row>

        <LayoutContainer marginTop={rfValuePX(5)} />
      </Column>
    </Row>
  );
};

export default PostCardHeader;
