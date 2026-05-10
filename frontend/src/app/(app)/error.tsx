"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

/**
 * Error boundary scoped to the (app) segment. Renders inside the
 * SidebarProvider/SidebarInset so the user keeps the app shell when
 * something throws inside an authed route.
 */
export default function AppError({
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-[var(--color-destructive-tint)] text-destructive">
        <AlertCircle className="size-6" />
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight">Something went wrong</h2>
      <p className="mt-2 max-w-md text-[15px] text-muted-foreground">
        An unexpected error occurred while loading this page.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/dashboard" className={buttonVariants({ variant: "outline" })}>
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
