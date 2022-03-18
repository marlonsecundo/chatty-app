import { PostLike } from "./post-like";

export interface Post {
  id: string;
  content?: string;
  timeSince?: string;
  commentsCount?: number;
  likesCount?: number;
  user?: User;
  likes?: PostLike[];
}
