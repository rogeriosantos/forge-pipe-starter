import NextAuth, { CredentialsSignin, type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

import { apiFetch, ApiHttpError } from "@/lib/api"
import type { LoginResponse } from "@/types/api"

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

class InvalidCredentials extends CredentialsSignin {
  code = "credentials"
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const parsed = credentialsSchema.safeParse(rawCredentials)
        if (!parsed.success) throw new InvalidCredentials()

        try {
          const data = await apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: parsed.data,
          })
          // Smuggle backend data through `User`'s loose shape; we read it in
          // the jwt callback below.
          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name ?? null,
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.expiresAt,
            isEmailVerified: data.user.emailVerified,
          } as unknown as { id: string; email: string; name: string | null }
        } catch (err) {
          if (err instanceof ApiHttpError && err.status === 401) {
            throw new InvalidCredentials()
          }
          throw err
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as {
          id: string
          accessToken: string
          accessTokenExpiresAt: string
          isEmailVerified: boolean
        }
        token.userId = u.id
        token.accessToken = u.accessToken
        token.accessTokenExpiresAt = u.accessTokenExpiresAt
        token.isEmailVerified = u.isEmailVerified
      }
      return token
    },
    async session({ session, token }) {
      if (token.userId) session.user.id = token.userId as string
      session.accessToken = (token.accessToken as string | undefined) ?? null
      session.accessTokenExpiresAt =
        (token.accessTokenExpiresAt as string | undefined) ?? null
      session.isEmailVerified = (token.isEmailVerified as boolean | undefined) ?? false
      return session
    },
    authorized({ auth: session, request }) {
      const { pathname } = request.nextUrl
      const isAuthed = !!session?.user
      const isAuthPage =
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname.startsWith("/forgot-password") ||
        pathname.startsWith("/reset-password") ||
        pathname.startsWith("/verify-email")
      const isPublic = pathname === "/" || pathname.startsWith("/legal")

      if (isAuthed && isAuthPage) {
        return Response.redirect(new URL("/dashboard", request.nextUrl))
      }
      if (!isAuthed && !isAuthPage && !isPublic) {
        return false
      }
      return true
    },
  },
})

declare module "next-auth" {
  interface Session {
    accessToken: string | null
    accessTokenExpiresAt: string | null
    isEmailVerified: boolean
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    userId?: string
    accessToken?: string
    accessTokenExpiresAt?: string
    isEmailVerified?: boolean
  }
}
