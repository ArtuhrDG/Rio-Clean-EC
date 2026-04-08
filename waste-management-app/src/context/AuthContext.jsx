// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react'
import { loginService } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const login = async (username, password) => {
    const data = await loginService(username, password)
    sessionStorage.setItem('token', data.access_token)
    setUsuario({ username, rol: data.rol })
    return data.rol  // Para redirigir según el rol
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext)