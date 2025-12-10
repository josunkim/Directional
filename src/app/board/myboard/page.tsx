"use client";
import { useInfiniteBoardList } from "@/src/api/board/hooks";
import { Box, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const MyboardPage = () => {
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteBoardList({});
  const { ref, inView } = useInView();
  const allPosts =
    data?.pages?.flatMap((page: { items: any }) => page.items) ?? [];
  console.log(data);
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  if (isLoading) return <Spinner size="xl" />;

  return (
    <VStack gap={4} align="stretch">
      <>
        {allPosts.map((post, idx) => {
          // 마지막 요소에 ref 연결
          const isLast = idx === allPosts.length - 1;
          return (
            <Box
              key={post.id}
              ref={isLast ? ref : null}
              p={4}
              borderWidth={1}
              onClick={() => router.push(`/board/${post.id}`)}
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: "gray.50" }}
            >
              <Text fontWeight="bold">{post.title}</Text>
              <Text>{post.body}</Text>
              <Text fontSize="sm" color="gray.500">
                {post.category}
              </Text>
            </Box>
          );
        })}

        {isFetchingNextPage && (
          <Stack align="center" mt={4}>
            <Spinner />
            <Text>더 불러오는 중...</Text>
          </Stack>
        )}

        {!hasNextPage && (
          <Text textAlign="center" color="gray.400" mt={4}>
            마지막 게시물입니다.
          </Text>
        )}
      </>
    </VStack>
  );
};
export default MyboardPage;
