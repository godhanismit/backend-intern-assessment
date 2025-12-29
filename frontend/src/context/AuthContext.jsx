import { createContext, useEffect, useState } from "react"
import api from "../api/axios"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return setLoading(false)

    api.get("/auth/me")
      .then(res => setUser(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
