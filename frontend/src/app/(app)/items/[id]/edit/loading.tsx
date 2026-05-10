import { Skeleton } from "@/components/ui/skeleton"

export default function EditItemLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="grid max-w-xl gap-6">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-12 w-full" />
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-11 w-32" />
          <Skeleton className="h-11 w-24" />
        </div>
      </div>
    </div>
  )
}
