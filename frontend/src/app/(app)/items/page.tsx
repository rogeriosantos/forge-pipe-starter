import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { itemsApi } from "@/lib/api/items"
import { ApiHttpError } from "@/lib/api"
import { buttonVariants } from "@/components/ui/button"
import { ItemsTable } from "./items-table"

export const metadata: Metadata = { title: "Items" }
export const dynamic = "force-dynamic"

export default async function ItemsPage() {
  const session = await auth()
  const token = session?.accessToken ?? null

  let items: Awaited<ReturnType<typeof itemsApi.list>>["items"] | null = null
  let errorMessage: string | null = null
  try {
    const data = await itemsApi.list(token, { page: 1, pageSize: 200 })
    items = data.items
  } catch (err) {
    errorMessage =
      err instanceof ApiHttpError ? err.message : "Failed to load items."
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Items</p>
          <h1 className="text-3xl font-semibold tracking-tight">All items</h1>
          <p className="max-w-2xl text-[15px] text-muted-foreground">
            The reference CRUD module shipped with this starter.
          </p>
        </div>
        <Link href="/items/new" className={buttonVariants()}>
          <Plus className="h-4 w-4" />
          New item
        </Link>
      </header>

      {errorMessage ? (
        <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {errorMessage}
        </div>
      ) : (
        <ItemsTable items={items ?? []} />
      )}
    </div>
  )
}
