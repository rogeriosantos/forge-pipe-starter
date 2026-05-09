import type { Metadata } from "next"
import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = { title: "Profile" }

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-2 py-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="col-span-2 font-medium">{value}</span>
    </div>
  )
}

export default async function ProfilePage() {
  const session = await auth()
  if (!session?.user) return null

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your account information.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Read-only in v0.1. Edit support comes in a later release.</CardDescription>
        </CardHeader>
        <CardContent className="divide-y">
          <Field label="Name" value={session.user.name ?? "—"} />
          <Field label="Email" value={session.user.email ?? "—"} />
          <Field label="Email verified" value={session.isEmailVerified ? "Yes" : "No"} />
          <Field label="User ID" value={session.user.id} />
        </CardContent>
      </Card>
    </div>
  )
}
