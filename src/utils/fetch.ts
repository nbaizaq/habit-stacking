import router from '@/router'
import { useAuthStore } from '@/stores/auth'

// Base class for an API client
class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  // Private method for the core fetch logic
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`
    const token = useAuthStore().getUser?.token

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      if (response?.status === 401) {
        useAuthStore().setUser(null)
        useToast().add({
          title: 'Unauthorized',
          description: 'Please login to continue',
          color: 'error',
        })
        await router.push('/auth/login')
      }
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(error.message)
    }

    return (await response.json()) as ApiResponse<T>
  }
}

const api = new ApiClient(import.meta.env.VITE_API_URL)
export type ApiResponse<T> = {
  result: T
  ok: boolean
}
export default api
