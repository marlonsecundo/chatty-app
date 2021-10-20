export interface Post {
  id: string;
  content?: string;
  userId?: number;
  passedTime?: string;
  commentsCount?: number;
  likesCount?: number;
  user?: User;
}
