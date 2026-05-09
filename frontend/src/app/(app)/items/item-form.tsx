"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { z } from "zod"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { itemsApi } from "@/lib/api/items"
import { ApiHttpError } from "@/lib/api"
import type { Item } from "@/types/api"

const schema = z.object({
  title: z.string().min(1, "Title is required").max(120, "Max 120 characters"),
  description: z.string().max(2000, "Max 2000 characters").optional(),
})

type FormValues = z.infer<typeof schema>

type Props =
  | { mode: "create"; item?: undefined }
  | { mode: "edit"; item: Item }

export function ItemForm(props: Props) {
  const router = useRouter()
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: props.mode === "edit" ? props.item.title : "",
      description: props.mode === "edit" ? props.item.description ?? "" : "",
    },
  })

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const token = session?.accessToken ?? null
        if (props.mode === "create") {
          const created = await itemsApi.create(token, {
            title: values.title,
            description: values.description?.trim() ? values.description.trim() : null,
          })
          toast.success(`Created "${created.title}"`)
        } else {
          await itemsApi.update(token, props.item.id, {
            title: values.title,
            description: values.description?.trim() ? values.description.trim() : null,
          })
          toast.success("Item updated")
        }
        router.push("/items")
        router.refresh()
      } catch (err) {
        const message =
          err instanceof ApiHttpError ? err.message : "Failed to save item."
        toast.error(message)
      }
    })
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 max-w-xl" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          autoFocus
          aria-invalid={!!form.formState.errors.title || undefined}
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          aria-invalid={!!form.formState.errors.description || undefined}
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving…" : props.mode === "create" ? "Create item" : "Save changes"}
        </Button>
        <Link href="/items" className={buttonVariants({ variant: "ghost" })}>Cancel</Link>
      </div>
    </form>
  )
}
