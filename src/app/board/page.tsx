"use client";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { PostsTable } from "./_components/PostTable";
import { useRouter } from "next/navigation";

const PostsPage = () => {
  const router = useRouter();
  return (
    <VStack w={"full"} h={"full"}>
      <HStack w={"full"} h={"full"} justifyContent={"space-between"}>
        <Button onClick={() => router.push("/board/myboard")}>내가쓴 글</Button>
        <Button onClick={() => router.push("/board/edit")}>글쓰기</Button>
      </HStack>
      <Box w={"full"} h={"full"}>
        <PostsTable />
      </Box>
    </VStack>
  );
};
export default PostsPage;
