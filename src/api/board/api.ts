import { apiClient } from "../axios";

export interface BoardQueryParams {
  limit?: number;
  prevCursor?: string | null;
  nextCursor?: string | null;
  sort?: "createdAt" | "title";
  order?: "asc" | "desc";
  category?: "NOTICE" | "QNA" | "FREE";
  from?: string;
  to?: string;
  search?: string;
}
export interface BoardItem {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  createdAt: string;
}
export interface BoardListResponse {
  items: BoardItem[];
  nextCursor: string | null;
  prevCursor: string | null;
}

export const myPostsList = async (
  params: BoardQueryParams
): Promise<BoardListResponse> => {
  const response = await apiClient.get("/posts", { params });
  return response.data as BoardListResponse;
};

export interface createBoardRequest {
  title: string;
  body: string;
  category: string;
  tags: string[];
}
export interface createBoardReponse {
  id: string;
  userId: string;
  title: string;
  body: string;
  category: string;
  tags: string[];
  createdAt: string;
}

export const createBoard = async ({
  title,
  body,
  category,
  tags,
}: createBoardRequest) => {
  const response = await apiClient.post("/posts", {
    title,
    body,
    category,
    tags,
  });
  return response.data as createBoardReponse;
};

export const deleteAllMyboard = async ({}) => {
  const response = await apiClient.delete("/posts");
};
