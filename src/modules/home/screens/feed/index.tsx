import { PostProvider, usePost } from "@/src/contexts/post-context";
import { Column } from "@/src/ui-components/layout/column";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "./components/feed-footer";
import Header from "../components/header-bar";
import PostsFeedList from "./components/posts-feed-list";
import HeaderBar from "../components/header-bar";
import BackHeaderButton from "../components/back-header-button";
import ProfileButton from "./components/profile-button";
import LogoutButton from "./components/logout-button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  HomeStackNavProps,
  HomeStackParamList,
} from "@/src/routes/home.routes";
import PostLikesBottomSheet from "./components/post-likes-bottom-sheet";
import { useService } from "@/src/contexts/service-context";
import { useAuth } from "@/src/contexts/auth-context";
import { SubmitButton } from "@/src/modules/components/submit-button";
import { Body } from "@/src/ui-components/text/body";
import { LayoutContainer } from "@/src/ui-components/layout/layout-container";
import { Row } from "@/src/ui-components/layout/row";

export interface FeedScreenProps {
  postId?: string;
  userId?: string;
  withFooter?: boolean;
}

type Props = NativeStackScreenProps<HomeStackParamList, "Feed">;

const FeedScreen: React.FC<Props> = ({ route }) => {
  const postId = route.params?.postId;
  const userId = route.params?.userId;
  const withFooter = route.params?.withFooter ?? true;

  const { token } = useAuth();
  const navigation = useNavigation<HomeStackNavProps>();

  const {
    serviceManager: { userService },
  } = useService();

  const [currentUserFeedName, setCurrentUserFeedName] = useState<
    string | null
  >();

  useEffect(() => {
    if (userId) {
      userService.showUser({ token: token ?? "", userId }).then((user) => {
        setCurrentUserFeedName(user?.profile?.name);
      });
    }
  }, []);

  return (
    <PostProvider>
      <Column height="100%" alignItems="flex-start">
        <HeaderBar
          leftContent={<LogoutButton></LogoutButton>}
          title={currentUserFeedName ?? "Feed"}
          rightContent={<ProfileButton></ProfileButton>}
        ></HeaderBar>

        <PostsFeedList userId={userId} postId={postId}></PostsFeedList>

        {userId && (
          <Column width="100%">
            <SubmitButton onPress={navigation.popToTop}>
              <Body>Back To Feed</Body>
            </SubmitButton>
          </Column>
        )}

        {withFooter && <Footer></Footer>}
      </Column>
      <PostLikesBottomSheet></PostLikesBottomSheet>
    </PostProvider>
  );
};

export default FeedScreen;
