import Link from "next/link"
import { FileQuestion } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-[var(--color-primary-tint)] text-primary">
          <FileQuestion className="size-6" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-2 max-w-sm text-[15px] text-muted-foreground">
          We couldn&apos;t find what you were looking for. It may have been moved or deleted.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link href="/dashboard" className={buttonVariants()}>
            Go to dashboard
          </Link>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}
