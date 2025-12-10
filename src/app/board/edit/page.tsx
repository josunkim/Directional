"use client";
import { useCreateBoard } from "@/src/api/board/hooks";
import { FORBIDDENWORDS } from "@/src/shared/core/constant";
import { toaster } from "@/src/shared/ui/toaster";
import {
  Box,
  Button,
  createListCollection,
  HStack,
  Input,
  Portal,
  Select,
  Stack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { KeyboardEvent, useState } from "react";

const EditBoardPage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const { mutate, isPending } = useCreateBoard();

  const containsForbiddenWord = (text: string) =>
    FORBIDDENWORDS.some((word) => text.includes(word));

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (tagInput.trim() === "") return;
    if (containsForbiddenWord(tagInput)) {
      toaster.create({
        title: "금지어가 포함되어 있어 태그를 추가할 수 없습니다.",
        type: "error",
      });
      setTagInput("");
      return;
    }
    const newTags = tagInput
      .split(",") // 쉼표로 여러 태그 입력 가능
      .map((t) => t.trim())
      .filter(
        (t) => t && !FORBIDDENWORDS.includes(t) && !tags.includes(t) // 중복 체크
      );
    if (newTags.length === 0) return;
    setTags((prev) => [...prev, ...newTags]);
    setTagInput("");
  };

  const handleSubmit = () => {
    if (containsForbiddenWord(title) || containsForbiddenWord(body)) {
      alert("금지어가 포함되어 있어 게시글을 작성할 수 없습니다.");
      return;
    }
    if (title.length < 1) {
      return toaster.create({
        title: "제목을 입력해 주세요.",
        type: "error",
      });
    }
    if (title.length > 80) {
      return toaster.create({
        title: "게시글 제목 (최대 80자)",
        type: "error",
      });
    }
    if (category === "") {
      return toaster.create({
        title: "카테고리를 선택해 주세요.",
        type: "error",
      });
    }
    if (0 === body.length || body.length > 2000) {
      return toaster.create({
        title: "글 내용을 확인해 주세요.",
        type: "error",
      });
    }
    mutate({ title, category, body, tags });
  };

  return (
    <VStack>
      <Input
        placeholder="title"
        maxLength={80}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <CategorySelect value={category} setValue={setCategory} />
      <Textarea
        maxLength={2000}
        minHeight={400}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <HStack w={"full"}>
        {tags.map((d, idx) => (
          <Box
            key={idx}
            bg={"black"}
            color={"white"}
            borderRadius={10}
            p={2}
            cursor="pointer"
            onClick={() => {
              setTags((prev) => prev.filter((_, i) => i !== idx));
            }}
          >
            {d}
          </Box>
        ))}
      </HStack>
      <Input
        placeholder="tags"
        maxLength={24}
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && tagInput.trim() !== "") {
            return handleAddTag(e);
          }
        }}
      />
      <Stack w={"full"}>
        <Button loading={isPending} onClick={handleSubmit}>
          작성 완료
        </Button>
      </Stack>
    </VStack>
  );
};

const CategorySelect = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const frameworks = createListCollection({
    items: [
      { label: "NOTICE", value: "NOTICE" },
      { label: "QNA", value: "QNA" },
      { label: "FREE", value: "FREE" },
    ],
  });

  return (
    <Select.Root
      collection={frameworks}
      size="sm"
      width="full"
      onValueChange={(e) => setValue(e.value[0])}
      defaultValue={["coffee"]}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select Cartegory" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
export default EditBoardPage;
