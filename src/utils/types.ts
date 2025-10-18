import type { Models } from 'appwrite'

export type Model = Models.DefaultRow
export type User = {
  id: string
  firstname: string
  lastname: string
  email: string
  token: string
}
