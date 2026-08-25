import { create } from 'zustand'
import axios from 'axios'

interface User {
  id: string
  email: string
  name: string
}

interface AuthStore {
  user: User | null
  token: string | null
  initializeAuth: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),

  initializeAuth: async () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // Verify token validity
      } catch (error) {
        localStorage.removeItem('auth_token')
      }
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password })
      localStorage.setItem('auth_token', response.data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      set({ user: response.data.user, token: response.data.token })
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    axios.defaults.headers.common['Authorization'] = ''
    set({ user: null, token: null })
  },
}))
