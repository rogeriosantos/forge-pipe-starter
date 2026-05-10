import type { Metadata } from "next"
import { PageHeader } from "@/components/page-header"
import { ItemForm } from "../item-form"

export const metadata: Metadata = { title: "New item" }

export default function NewItemPage() {
  return (
    <div>
      <PageHeader
        back={{ href: "/items", label: "Items" }}
        title="New item"
        description="Add a new item to your collection."
      />
      <ItemForm mode="create" />
    </div>
  )
}
