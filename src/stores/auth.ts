import { defineStore } from 'pinia'
import type { User } from '@/utils/types'

export const useAuthStore = defineStore('auth', {
  state: (): {
    user: User | null
  } => ({
    user: null,
  }),
  getters: {
    getUser(): User | null {
      return this.user
    },
  },
  actions: {
    setUser(user: User | null) {
      this.user = user
    },
  },
  persist: true,
})
