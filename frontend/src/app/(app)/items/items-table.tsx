"use client"

import Link from "next/link"
import { Package, Plus } from "lucide-react"
import { ItemRowActions } from "./row-actions"
import { SmartTable, type ColumnDef } from "@/components/ui/smart-table"
import { buttonVariants } from "@/components/ui/button"
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
      <span className="line-clamp-1 text-muted-foreground">{(v as string | null) ?? "—"}</span>
    ),
  },
  {
    key: "updatedAt",
    header: "Updated",
    defaultWidth: 120,
    render: (v) => (
      <span className="text-muted-foreground">
        {new Date(v as string).toLocaleDateString()}
      </span>
    ),
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

const ItemsEmptyState = () => (
  <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
    <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-[var(--color-primary-tint)] text-primary">
      <Package className="size-6" />
    </div>
    <h2 className="mt-4 text-lg font-semibold tracking-tight">No items yet</h2>
    <p className="mt-1 max-w-sm text-sm text-muted-foreground">
      Create your first item to start tracking your work.
    </p>
    <Link href="/items/new" className={`${buttonVariants()} mt-6`}>
      <Plus className="size-4" />
      New item
    </Link>
  </div>
)

export function ItemsTable({ items }: { items: Item[] }) {
  return (
    <SmartTable
      tableId="items-list"
      data={items as unknown as Record<string, unknown>[]}
      columns={columns as unknown as ColumnDef<Record<string, unknown>>[]}
      defaultSortKey="updatedAt"
      defaultSortDir="desc"
      emptyState={<ItemsEmptyState />}
    />
  )
}
