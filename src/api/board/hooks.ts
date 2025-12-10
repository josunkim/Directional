import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  BoardItem,
  BoardListResponse,
  BoardQueryParams,
  createBoard,
  createBoardReponse,
  createBoardRequest,
  deleteAllMyboard,
  myPostsList,
} from "./api";
import { useRouter } from "next/navigation";

interface BoardListPage {
  items: BoardItem[];
  nextCursor: string | null;
  prevCursor: string | null;
}

interface CursorParam {
  prevCursor?: string | null;
  nextCursor?: string | null;
}

export const useInfiniteBoardList = (
  params: Omit<BoardQueryParams, "prevCursor" | "nextCursor">
) => {
  return useInfiniteQuery<
    BoardListPage,
    Error,
    InfiniteData<BoardListPage>,
    [string, typeof params],
    CursorParam
  >({
    queryKey: ["board-infinite", params],

    queryFn: ({ pageParam }) => {
      return myPostsList({
        ...params,
        prevCursor: pageParam?.prevCursor ?? null,
        nextCursor: pageParam?.nextCursor ?? null,
      });
    },

    initialPageParam: {
      prevCursor: null,
      nextCursor: null,
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor) return null;
      return { nextCursor: lastPage.nextCursor };
    },

    placeholderData: (prev) => prev,
    staleTime: 10000,
  });
};

export const useCreateBoard = (): UseMutationResult<
  createBoardReponse,
  unknown,
  createBoardRequest
> => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: createBoardRequest) => createBoard(data),
    onSuccess: () => {
      router.replace("/board/myboard");
    },
  });
};

export const useDeleteAllMyboard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllMyboard,
    onSuccess: () => {
      // 무한 스크롤 리스트 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["board-infinite"] });
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
    },
  });
};
