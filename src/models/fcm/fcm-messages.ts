interface BaseMessageData {
  [key: string]: string;
  itype: "new:postLike" | "unknow";
}

interface NewPostLikeMessageData extends BaseMessageData {
  itype: "new:postLike";
  postId: string;
  route: string;
}
