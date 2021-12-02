import { AxiosResponse } from "axios";
import {
  AxiosPaginationResult,
  FetchPaginationProps,
  PaginationResult,
} from "../models/pagination-result";
import { Post } from "../models/post";
import { getAuthorizationHeader } from "../utils/get-authorization-header";
import getAxiosError from "../utils/get-axios-error";
import api from "./api";

export interface FetchPostProps extends FetchPaginationProps {
  token: string;
}

export interface StorePostProps {
  content: string;
  token: string;
}

export interface LikePostProps {
  post: Post;
  token: string;
}

class PostService {
  async fetchPosts({
    token,
    page,
    limit,
  }: FetchPostProps): AxiosPaginationResult<Post> {
    try {
      const response = await api.get<PaginationResult<Post>>("/posts", {
        params: {
          page,
          limit,
        },
        headers: getAuthorizationHeader(token),
      });

      return response.data;
    } catch (error) {
      console.log("ERROR - fetchPosts");
      throw getAxiosError(error);
    }
  }

  async createPost({ content, token }: StorePostProps): Promise<Post | null> {
    try {
      const data = { content };
      const response = await api.post("/posts", data, {
        headers: getAuthorizationHeader(token),
      });

      return response.data as Post;
    } catch (error) {
      console.log("ERROR - post.service - createPost");
      throw getAxiosError(error);
    }
  }

  async likePost({
    post,
    token,
  }: LikePostProps): Promise<AxiosResponse | null> {
    try {
      const route = `/posts/${post.id}/likes`;

      const response = await api.post(route, null, {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (error) {
      console.log("ERROR - post.service - likePost");
      throw getAxiosError(error);
    }
  }

  async removePostLike({
    post,
    token,
  }: LikePostProps): Promise<AxiosResponse | null> {
    try {
      const route = `/posts/${post.id}/likes/my`;

      const response = await api.delete(route, {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (error) {
      console.log("ERROR - post.service - removePostLike");
      throw getAxiosError(error);
    }
  }
}

export default new PostService();
