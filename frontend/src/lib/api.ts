import { env } from "@/lib/env"
import type { ApiError } from "@/types/api"

export class ApiHttpError extends Error {
  status: number
  code?: string
  constructor(status: number, detail: string, code?: string) {
    super(detail)
    this.status = status
    this.code = code
  }
}

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown
  token?: string | null
}

export async function apiFetch<T>(
  path: string,
  { body, token, headers, ...rest }: FetchOptions = {}
): Promise<T> {
  const url = `${env.apiUrl}${path.startsWith("/") ? path : `/${path}`}`
  const init: RequestInit = {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
  }

  const res = await fetch(url, init)

  if (res.status === 204) {
    return undefined as T
  }

  const contentType = res.headers.get("content-type") ?? ""
  const isJson = contentType.includes("application/json")
  const payload = isJson ? await res.json() : await res.text()

  if (!res.ok) {
    const err = (isJson ? (payload as ApiError) : null) ?? null
    throw new ApiHttpError(
      res.status,
      err?.detail ?? (typeof payload === "string" ? payload : "Request failed"),
      err?.code
    )
  }

  return payload as T
}
