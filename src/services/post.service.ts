import {
  AxiosPaginationResult,
  AxiosPostResult,
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

  async createPost({ content, token }: StorePostProps): AxiosPostResult<Post> {
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
}

export default new PostService();
