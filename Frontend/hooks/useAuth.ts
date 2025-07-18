import { useState } from "react"
import { storage } from "@/utils/local-storage"


const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8088/api"

export function useAuth() {
  const getStoredToken = () => storage.get('JWT')

  const [token, setToken] = useState<string | null>(getStoredToken)

  const login = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error("Login failed")

    const data = await res.json()
    storage.set('JWT', data.token)
    setToken(data.token)
    return data.token
  }

  const logout = () => {
    storage.remove('JWT')
    setToken(null)
  }

  const isAuthenticated = !!token

  const getAuthHeader = () =>
    token ? { Authorization: `Bearer ${token}` } : {}

  return { token, login, logout, isAuthenticated, getAuthHeader }
}
