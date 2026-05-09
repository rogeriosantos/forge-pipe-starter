export type User = {
  id: string
  email: string
  name: string | null
  emailVerified: boolean
  createdAt: string
  updatedAt: string
}

export type LoginResponse = {
  user: User
  accessToken: string
  expiresAt: string
}

export type Item = {
  id: string
  ownerId: string
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type Paginated<T> = {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type ApiError = {
  detail: string
  code?: string
}
