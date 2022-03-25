interface BaseMessage {
  [key: string]: string;
  itype: "new:postLike" | "unknow";
  title: string;
  body: string;
}

interface NewPostLikeMessage extends BaseMessage {
  itype: "new:postLike";
  postId: string;
  route: string;
}
