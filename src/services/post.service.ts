import { AxiosResponse } from "axios";
import { STATUS_OK } from "../core/contants/axios-response-status";
import {
  AxiosPaginationResult,
  FetchPaginationProps,
  PaginationResult,
} from "../models/pagination-result";
import { Post } from "../models/post";
import { PostLike } from "../models/post-like";
import { getAuthorizationHeader } from "../utils/get-authorization-header";
import getAxiosError from "../utils/get-axios-error";
import BaseService from "./base-service";

export interface FetchPostProps extends FetchPaginationProps {
  token: string;
  id?: string;
  userId?: string;
}

export interface StorePostProps {
  content: string;
  token: string;
}

export interface DeletePostProps {
  id: string;
  token: string;
}

export interface LikePostProps {
  post: Post;
  token: string;
}

export interface FetchPostLikesProps extends FetchPaginationProps {
  token: string;
  postId: string;
}

class PostService extends BaseService {
  async fetchPosts({
    token,
    page,
    limit,
    id,
    userId,
  }: FetchPostProps): AxiosPaginationResult<Post> {
    try {
      const response = await this.axiosAPI.get<PaginationResult<Post>>(
        "/posts",
        {
          params: {
            page,
            limit,
            id,
            userId,
          },
          headers: getAuthorizationHeader(token),
        }
      );

      return response.data;
    } catch (error) {
      console.log({ error });
      throw getAxiosError(error);
    }
  }

  async createPost({ content, token }: StorePostProps): Promise<Post | null> {
    try {
      const data = { content };
      const response = await this.axiosAPI.post("/posts", data, {
        headers: getAuthorizationHeader(token),
      });

      return response.data as Post;
    } catch (error) {
      throw getAxiosError(error);
    }
  }

  async deletePost({ id, token }: DeletePostProps): Promise<boolean | null> {
    try {
      const response = await this.axiosAPI.delete(`/posts/${id}`, {
        headers: getAuthorizationHeader(token),
      });

      return response.status === STATUS_OK;
    } catch (error) {
      throw getAxiosError(error);
    }
  }

  async likePost({
    post,
    token,
  }: LikePostProps): Promise<AxiosResponse | null> {
    try {
      const route = `/posts/${post.id}/likes`;

      const response = await this.axiosAPI.post(route, null, {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (error) {
      throw getAxiosError(error);
    }
  }

  async removePostLike({
    post,
    token,
  }: LikePostProps): Promise<AxiosResponse | null> {
    try {
      const route = `/posts/${post.id}/likes/my`;

      const response = await this.axiosAPI.delete(route, {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (error) {
      throw getAxiosError(error);
    }
  }

  async fetchPostsLikes({
    token,
    page,
    limit,
    postId,
  }: FetchPostLikesProps): AxiosPaginationResult<PostLike> {
    try {
      const response = await this.axiosAPI.get<PaginationResult<PostLike>>(
        `/posts/${postId}/likes`,
        {
          params: {
            page,
            limit,
          },
          headers: getAuthorizationHeader(token),
        }
      );

      return response.data;
    } catch (error) {
      throw getAxiosError(error);
    }
  }
}

export default PostService;
