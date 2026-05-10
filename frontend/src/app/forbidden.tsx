import Link from "next/link"
import { ShieldOff } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

export default function Forbidden() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="flex flex-col items-center text-center">
        <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-[var(--color-destructive-tint)] text-destructive">
          <ShieldOff className="size-6" />
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">403</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Access denied</h1>
        <p className="mt-2 max-w-sm text-[15px] text-muted-foreground">
          You don&apos;t have permission to view this page. If you believe this is a mistake, contact your administrator.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link href="/dashboard" className={buttonVariants()}>
            Go to dashboard
          </Link>
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>
            Sign in as someone else
          </Link>
        </div>
      </div>
    </main>
  )
}
