"use client"

import Link from "next/link"
import { ItemRowActions } from "./row-actions"
import { SmartTable, type ColumnDef } from "@/components/ui/smart-table"
import type { Item } from "@/types/api"

const columns: ColumnDef<Item>[] = [
  {
    key: "title",
    header: "Title",
    render: (_v, row) => (
      <Link href={`/items/${row.id}/edit`} className="font-medium hover:underline">
        {row.title}
      </Link>
    ),
  },
  {
    key: "description",
    header: "Description",
    sortable: true,
    render: (v) => (
      <span className="truncate text-muted-foreground">{(v as string | null) ?? "—"}</span>
    ),
  },
  {
    key: "updatedAt",
    header: "Updated",
    render: (v) => (
      <span className="text-muted-foreground">
        {new Date(v as string).toLocaleDateString()}
      </span>
    ),
    defaultWidth: 120,
  },
  {
    key: "id",
    header: "Actions",
    sortable: false,
    filterable: false,
    defaultWidth: 80,
    render: (_v, row) => <ItemRowActions itemId={row.id} title={row.title} />,
  },
]

export function ItemsTable({ items }: { items: Item[] }) {
  return (
    <SmartTable
      tableId="items-list"
      data={items as unknown as Record<string, unknown>[]}
      columns={columns as unknown as ColumnDef<Record<string, unknown>>[]}
      defaultSortKey="updatedAt"
      defaultSortDir="desc"
    />
  )
}
