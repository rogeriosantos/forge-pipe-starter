"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-[var(--color-destructive-tint)] text-destructive">
          <AlertCircle className="size-6" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">500</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
          An unexpected error occurred. You can try again, or come back later.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button onClick={reset}>Try again</Button>
          <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
            Go to dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}
