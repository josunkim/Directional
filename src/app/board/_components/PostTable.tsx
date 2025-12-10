// PostsTable.tsx
"use client";

import { Box, Input, Spinner, Flex, Button } from "@chakra-ui/react";
import { TableVirtuoso } from "react-virtuoso";
import { columns as allColumns } from "./columns";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { useClientPaginatedPosts } from "@/src/api/mockApi/hooks";
import { MockPostItem } from "@/src/api/mockApi/api";

export const PostsTable = () => {
  const pageSize = 20;
  const { items, loadMore, hasMore, isLoading } =
    useClientPaginatedPosts(pageSize);

  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  // 검색 필터
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.body.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  // 보여줄 컬럼
  const visibleColumns = useMemo(
    () => allColumns.filter((col) => !hiddenColumns.includes(col.id ?? "")),
    [hiddenColumns]
  );

  const table = useReactTable({
    data: filteredItems,
    columns: visibleColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Spinner />;

  return (
    <Box
      w="full"
      h="calc(100vh - 120px)"
      display="flex"
      flexDirection="column"
      gap={4}
      justifyContent={"center"}
      alignContent={"center"}
    >
      {/* 검색 */}
      <Input
        placeholder="검색..."
        mb={4}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 테이블 */}
      <Box w="full" h="full">
        <TableVirtuoso
          style={{ height: "100%", width: "100%" }}
          data={filteredItems}
          endReached={() => {
            if (hasMore) loadMore();
          }}
          overscan={200}
          components={{
            Table: (props) => (
              <table
                style={{ width: "100%", borderCollapse: "collapse" }}
                {...props}
              />
            ),
            TableRow: (props) => <tr {...props} />,
            TableBody: (props) => <tbody {...props} />,
            TableHead: (props) => <thead {...props} />,
          }}
          fixedHeaderContent={() => (
            <tr>
              {visibleColumns.map((col, index) => (
                <th
                  key={col.id ?? index}
                  style={{
                    border: "1px solid #ccc",
                    padding: "4px",
                    background: "#f0f0f0",
                  }}
                >
                  {typeof col.header === "string" ? col.header : ""}
                </th>
              ))}
            </tr>
          )}
          itemContent={(index, row: MockPostItem) => (
            <>
              {visibleColumns.map((col, colIndex) => {
                return (
                  <td
                    key={col.id ?? colIndex}
                    style={{ padding: "4px", border: "1px solid #ccc" }}
                  >
                    {row[col.accessorKey as keyof MockPostItem]}
                  </td>
                );
              })}
            </>
          )}
        />
      </Box>
    </Box>
  );
};
