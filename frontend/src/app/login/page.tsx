import type { Metadata } from "next"
import { LoginForm } from "./login-form"

export const metadata: Metadata = { title: "Sign in" }

export default function LoginPage() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6 py-16">
      {/* soft accent glow — subtle, single decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--color-primary-tint),transparent_60%)]"
      />
      <div className="w-full max-w-sm">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <div className="flex aspect-square size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-semibold shadow-[var(--shadow-md)]">
            FP
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-[15px] text-muted-foreground">
            Enter your credentials to continue.
          </p>
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account? Contact your administrator. Self-service signup arrives in v0.2.
        </p>
      </div>
    </main>
  )
}
