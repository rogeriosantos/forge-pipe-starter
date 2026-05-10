import { Skeleton } from "@/components/ui/skeleton"

export default function ItemsLoading() {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-11 w-32" />
      </div>
      <div className="space-y-3">
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="rounded-md border p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-4 border-t py-3 first:border-t-0">
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
