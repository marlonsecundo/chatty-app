export interface PaginationResult<T> {
  data: T[];
  meta: {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    firstPage: number;
  };
}

export interface FetchPaginationProps {
  page: number;
  limit: number;
}

export type AxiosPaginationResult<T> = Promise<PaginationResult<T> | null>;
