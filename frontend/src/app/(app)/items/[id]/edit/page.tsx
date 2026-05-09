import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { itemsApi } from "@/lib/api/items"
import { ApiHttpError } from "@/lib/api"
import { ItemForm } from "../../item-form"

export const metadata: Metadata = { title: "Edit item" }
export const dynamic = "force-dynamic"

export default async function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()

  let item
  try {
    item = await itemsApi.get(session?.accessToken ?? null, id)
  } catch (err) {
    if (err instanceof ApiHttpError && err.status === 404) notFound()
    throw err
  }

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit item</h1>
        <p className="mt-1 text-sm text-muted-foreground">Update the details below.</p>
      </div>
      <ItemForm mode="edit" item={item} />
    </div>
  )
}
