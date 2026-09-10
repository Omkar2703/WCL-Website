import { createContext, useContext, useState } from 'react'
import api from '../api/axios.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('wcl-admin-token'))
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('wcl-admin-user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setToken(data.token)
    setAdmin(data.admin)
    localStorage.setItem('wcl-admin-token', data.token)
    localStorage.setItem('wcl-admin-user', JSON.stringify(data.admin))
    return data.admin
  }

  const logout = () => {
    setToken(null)
    setAdmin(null)
    localStorage.removeItem('wcl-admin-token')
    localStorage.removeItem('wcl-admin-user')
  }

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
