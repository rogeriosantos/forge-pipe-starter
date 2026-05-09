import type { Metadata } from "next"
import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Profile" }

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="col-span-2 font-medium">{value}</span>
    </div>
  )
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <div className="space-y-12">
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">Profile</p>
        <h1 className="text-3xl font-semibold tracking-tight">Account</h1>
        <p className="max-w-2xl text-[15px] text-muted-foreground">
          Your account information.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Read-only in v0.1. Edit support comes in a later release.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-[var(--color-divider)]">
          <Field label="Name" value={session.user.name ?? "—"} />
          <Field label="Email" value={session.user.email ?? "—"} />
          <Field label="Email verified" value={session.isEmailVerified ? "Yes" : "No"} />
          <Field label="User ID" value={session.user.id} />
        </CardContent>
      </Card>
    </div>
  )
}
