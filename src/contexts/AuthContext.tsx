import { useMemo, useState } from 'react'
import { api } from '../lib/api'
import type { AuthResponse } from '../types/api'
import { AuthContext, type AuthContextValue } from './auth-context'

const STORAGE_KEY = 'turma-do-bem.auth'

const loadSession = () => {
  const rawSession = window.localStorage.getItem(STORAGE_KEY)

  if (!rawSession) {
    return null
  }

  try {
    return JSON.parse(rawSession) as AuthResponse
  } catch {
    window.localStorage.removeItem(STORAGE_KEY)
    return null
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthResponse | null>(() => loadSession())

  const login = async (payload: { email: string; senha: string }) => {
    const session = await api.login(payload)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    setUser(session)
    return session
  }

  const logout = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
