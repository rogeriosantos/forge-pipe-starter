import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  /** Small accent text above the title (e.g., section name). Mutually exclusive with `back`. */
  kicker?: string
  /** Main page heading. */
  title: string
  /** One-line description below the title. */
  description?: string
  /** Back-navigation target. Renders an arrow link above the title. */
  back?: { href: string; label: string }
  /** Right-aligned action(s) — typically a primary Button or Link. */
  action?: React.ReactNode
  /** Additional className on the outer header element. */
  className?: string
}

/**
 * Standard page header. Use on every page.
 *
 * Pattern A — top-level section page (Dashboard / Items / Profile):
 *   <PageHeader kicker="Items" title="All items" description="…" action={<NewItemButton />} />
 *
 * Pattern B — child page (new / edit / detail):
 *   <PageHeader back={{ href: "/items", label: "Items" }} title="New item" description="…" />
 */
export function PageHeader({
  kicker,
  title,
  description,
  back,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-8 flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="min-w-0 space-y-2">
        {back ? (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            {back.label}
          </Link>
        ) : kicker ? (
          <p className="text-sm font-medium text-primary">{kicker}</p>
        ) : null}
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        {description && (
          <p className="max-w-2xl text-[15px] text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
    </header>
  )
}
