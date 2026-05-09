import { apiFetch } from "@/lib/api"
import type { Item, Paginated } from "@/types/api"

export const itemsApi = {
  async list(token: string | null, params: { page?: number; pageSize?: number; q?: string } = {}) {
    const search = new URLSearchParams()
    if (params.page) search.set("page", String(params.page))
    if (params.pageSize) search.set("pageSize", String(params.pageSize))
    if (params.q) search.set("q", params.q)
    const qs = search.toString()
    return apiFetch<Paginated<Item>>(`/items${qs ? `?${qs}` : ""}`, { token })
  },
  get(token: string | null, id: string) {
    return apiFetch<Item>(`/items/${id}`, { token })
  },
  create(token: string | null, body: { title: string; description?: string | null }) {
    return apiFetch<Item>(`/items`, { method: "POST", body, token })
  },
  update(token: string | null, id: string, body: { title?: string; description?: string | null }) {
    return apiFetch<Item>(`/items/${id}`, { method: "PATCH", body, token })
  },
  remove(token: string | null, id: string) {
    return apiFetch<void>(`/items/${id}`, { method: "DELETE", token })
  },
}
