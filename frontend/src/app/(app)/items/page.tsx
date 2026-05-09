import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { itemsApi } from "@/lib/api/items"
import { ApiHttpError } from "@/lib/api"
import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ItemRowActions } from "./row-actions"

export const metadata: Metadata = { title: "Items" }
export const dynamic = "force-dynamic"

export default async function ItemsPage() {
  const session = await auth()
  const token = session?.accessToken ?? null

  let data
  let errorMessage: string | null = null
  try {
    data = await itemsApi.list(token, { page: 1, pageSize: 50 })
  } catch (err) {
    errorMessage =
      err instanceof ApiHttpError ? err.message : "Failed to load items."
  }

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Items</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            The reference CRUD module shipped with this starter.
          </p>
        </div>
        <Link href="/items/new" className={buttonVariants()}>
          <Plus className="h-4 w-4" />
          New item
        </Link>
      </div>

      {errorMessage ? (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : !data || data.items.length === 0 ? (
        <div className="rounded-md border border-dashed p-12 text-center">
          <h2 className="text-base font-medium">No items yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Create your first item to get started.</p>
          <Link href="/items/new" className={`${buttonVariants()} mt-4`}>
            <Plus className="h-4 w-4" />
            New item
          </Link>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <Link href={`/items/${item.id}/edit`} className="hover:underline">
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell className="max-w-md truncate text-muted-foreground">
                    {item.description ?? "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <ItemRowActions itemId={item.id} title={item.title} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
