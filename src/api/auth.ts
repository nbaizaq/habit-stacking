import api from '@/utils/fetch'
import type { User } from '@/utils/types'

export function login(options: { email: string; password: string }) {
  return api
    .request<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(options),
    })
    .then((res) => res.result)
}
