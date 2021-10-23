export interface Post {
  id: string;
  content?: string;
  passedTime?: string;
  commentsCount?: number;
  likesCount?: number;
  user?: User;
}
