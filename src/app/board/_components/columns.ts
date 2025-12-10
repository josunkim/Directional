import { MockPostItem } from "@/src/api/mockApi/api";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<MockPostItem>();

export const columns = [
  columnHelper.accessor("userId", {
    header: "User ID",
    size: 200,
  }),
  columnHelper.accessor("title", {
    header: "Title",
    size: 200,
  }),
  columnHelper.accessor("category", {
    header: "Category",
    size: 200,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    size: 200,
  }),
];
