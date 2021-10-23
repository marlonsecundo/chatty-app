import {
  AxiosPaginationResult,
  FetchPaginationProps,
  PaginationResult,
} from "../models/pagination-result";
import { Post } from "../models/post";
import { getAuthorizationHeader } from "../utils/get-authorization-header";
import api from "./api";

export interface FetchPostProps extends FetchPaginationProps {
  token: string;
}

export async function fetchPosts({
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
    throw error;
  }
}
