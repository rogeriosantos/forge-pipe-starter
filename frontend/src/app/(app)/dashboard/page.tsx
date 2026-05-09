import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"
import { auth } from "@/auth"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const session = await auth()
  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This is the starter dashboard. Add your domain widgets here.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>The reference CRUD module shipped with this starter.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/items" className={buttonVariants()}>Open items</Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account details, read-only in v0.1.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile" className={buttonVariants({ variant: "secondary" })}>View profile</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
