import type { Metadata } from "next"
import Link from "next/link"
import { Plus } from "lucide-react"
import { auth } from "@/auth"
import { itemsApi } from "@/lib/api/items"
import { ApiHttpError } from "@/lib/api"
import { buttonVariants } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
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
    <div>
      <PageHeader
        kicker="Items"
        title="All items"
        description="The reference CRUD module shipped with this starter."
        action={
          <Link href="/items/new" className={buttonVariants()}>
            <Plus className="h-4 w-4" />
            New item
          </Link>
        }
      />

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
