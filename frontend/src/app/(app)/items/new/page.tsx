import type { Metadata } from "next"
import { ItemForm } from "../item-form"

export const metadata: Metadata = { title: "New item" }

export default function NewItemPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New item</h1>
        <p className="mt-1 text-sm text-muted-foreground">Add a new item to your collection.</p>
      </div>
      <ItemForm mode="create" />
    </div>
  )
}
