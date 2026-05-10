import type { Metadata } from "next"
import { Pencil } from "lucide-react"
import { auth } from "@/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { PageHeader } from "@/components/page-header"

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
    <div>
      <PageHeader
        kicker="Profile"
        title="Account"
        description="Your account information."
        action={
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="outline" disabled>
                  <Pencil className="size-4" />
                  Edit
                </Button>
              }
            />
            <TooltipContent>Editing profile is available in v0.2.</TooltipContent>
          </Tooltip>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Read-only in v0.1. Edit support is coming.</CardDescription>
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
