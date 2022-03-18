import { useAuth } from "@/src/contexts/auth-context";
import { useService } from "@/src/contexts/service-context";
import { STATUS_OK } from "@/src/core/contants/axios-response-status";
import { Post } from "@/src/models/post";
import { AntDesignIcon, FeatherIcon } from "@/src/ui-components/icon";
import IconButton from "@/src/ui-components/icon-button";
import { Row } from "@/src/ui-components/layout/row";
import { Body } from "@/src/ui-components/text/body";
import { getExceptionFromError } from "@/src/utils/get-exception-from-error";
import { rfValue, rfValuePX } from "@/src/utils/responsive-fontsize";
import { AxiosResponse } from "axios";
import React, { useCallback, useState } from "react";
import Toast from "react-native-root-toast";
import { PostCardProps } from "../..";
import { Footer } from "./styles";

const PostCardFooter: React.FC<PostCardProps> = ({ post }) => {
  const { user, token } = useAuth();
  const { serviceManager } = useService();

  const { postService } = serviceManager;

  const likedPost = post.likes?.find(
    (postLike) => postLike.userId === user?.id
  );

  const [liked, setLiked] = useState(!!likedPost);
  const [likeCount, setLikeCount] = useState(post.likesCount ?? 0);

  const heartIcon = liked ? (
    <AntDesignIcon
      name="heart"
      fontSize={rfValue(18)}
      color="primary"
    ></AntDesignIcon>
  ) : (
    <FeatherIcon
      name="heart"
      fontSize={rfValue(18)}
      color="primary"
    ></FeatherIcon>
  );

  const handleLikePost = useCallback(async () => {
    try {
      let response: AxiosResponse | null;

      let newLiked = liked;

      if (liked) {
        response = await postService.removePostLike({
          post,
          token: token ?? "",
        });

        if (response?.status === STATUS_OK) {
          newLiked = false;
        }
      } else {
        response = await postService.likePost({ post, token: token ?? "" });

        if (response?.status === STATUS_OK) {
          newLiked = true;
        }
      }

      if (response?.status !== STATUS_OK) {
        console.log(response?.status);
        const text = liked ? "dislike" : "like";
        Toast.show(`Failed to ${text} the post`);
        return;
      }

      setLiked(newLiked);

      setLikeCount((prevLikeCount) => {
        return newLiked ? prevLikeCount + 1 : prevLikeCount - 1;
      });
    } catch (err) {
      const exception = getExceptionFromError(err);

      Toast.show(exception.message);
    }
  }, [liked]);

  return (
    <Footer
      width="100%"
      justifyContent="space-between"
      spadding={`${rfValuePX(8)} 0px`}
    >
      <IconButton
        withBackgroundColor={false}
        icon={heartIcon}
        text={String(likeCount)}
        size="normal"
        textColor="primary"
        onPress={handleLikePost}
      />
      <Row alignItems="center" marginRight={rfValuePX(15)}>
        <Body>{post.timeSince}</Body>
      </Row>
    </Footer>
  );
};

export default PostCardFooter;
