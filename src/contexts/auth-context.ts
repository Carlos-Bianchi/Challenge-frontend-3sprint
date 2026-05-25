import { createContext } from 'react'
import type { AuthResponse } from '../types/api'

export interface AuthContextValue {
  user: AuthResponse | null
  isAuthenticated: boolean
  login: (payload: { email: string; senha: string }) => Promise<AuthResponse>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
