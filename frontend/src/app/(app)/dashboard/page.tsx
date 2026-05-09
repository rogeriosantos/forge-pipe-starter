import type { Metadata } from "next"
import Link from "next/link"
import { Package, User as UserIcon, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { auth } from "@/auth"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await auth()
  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="max-w-2xl text-[15px] text-muted-foreground">
          This is the starter dashboard. Replace this section with your domain widgets and KPIs.
        </p>
      </header>

      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">Get started</h2>
          <p className="text-sm text-muted-foreground">Quick links to the modules shipped with this starter.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/items"
            className="group relative overflow-hidden rounded-xl bg-card p-6 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]"
          >
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[var(--color-primary-tint)] text-primary">
              <Package className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight">Items</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              The reference CRUD module shipped with this starter.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              Open items
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            href="/profile"
            className="group relative overflow-hidden rounded-xl bg-card p-6 shadow-[var(--shadow-md)] transition-shadow duration-200 hover:shadow-[var(--shadow-lg)]"
          >
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[var(--color-secondary-tint)] text-[var(--color-secondary-hex)]">
              <UserIcon className="size-5" />
            </div>
            <h3 className="mt-4 text-base font-semibold tracking-tight">Profile</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your account details, read-only in v0.1.
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
              View profile
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
