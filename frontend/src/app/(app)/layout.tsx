import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { SidebarNav } from "@/components/app-shell/sidebar"
import { UserMenu } from "@/components/app-shell/user-menu"
import { MobileNav } from "@/components/app-shell/mobile-nav"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background px-4 md:pl-64">
        <div className="flex items-center gap-2">
          <MobileNav />
          <span className="font-semibold tracking-tight md:hidden">forge-pipe</span>
        </div>
        <UserMenu email={session.user.email ?? ""} name={session.user.name ?? null} />
      </header>
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r bg-card md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <span className="font-semibold tracking-tight">forge-pipe</span>
        </div>
        <SidebarNav />
      </aside>
      <main className="flex-1 px-4 py-8 md:pl-72 md:pr-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  )
}
