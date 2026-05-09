import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { UserMenu } from "@/components/app-shell/user-menu"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value !== "false"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="ml-auto">
            <UserMenu email={session.user.email ?? ""} name={session.user.name ?? null} />
          </div>
        </header>
        <main className="flex-1 px-4 py-8 md:px-6">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
