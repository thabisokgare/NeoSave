import { useState } from "react"

export function useAuth() {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null
  )

  const login = async (email: string, password: string) => {
    const res = await fetch("http://localhost:8088/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) throw new Error("Login failed")
    const data = await res.json()
    localStorage.setItem("jwt", data.token)
    setToken(data.token)
    return data.token
  }

  const logout = () => {
    localStorage.removeItem("jwt")
    setToken(null)
  }

  const isAuthenticated = !!token

  const getAuthHeader = () =>
    token ? { Authorization: `Bearer ${token}` } : {}

  return { token, login, logout, isAuthenticated, getAuthHeader }
} 