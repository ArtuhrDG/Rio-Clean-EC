// src/services/api.js
import axios from 'axios'

const BASE_URL = 'http://localhost:8000'  // Cambiar en producción

// Instancia base de axios
const api = axios.create({
  baseURL: BASE_URL,
})

// Interceptor: agrega el token JWT automáticamente en cada request
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ─── AUTH ───────────────────────────────────────────────
export const loginService = async (username, password) => {
  // ⚠️ Tu backend usa OAuth2PasswordRequestForm = form-urlencoded, NO json
  const formData = new URLSearchParams()
  formData.append('username', username)
  formData.append('password', password)

  const res = await api.post('/api/auth/login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
  return res.data  // { access_token, token_type, rol }
}

export const getMiPerfil = async () => {
  const res = await api.get('/api/auth/me')
  return res.data  // { username, rol, nombre }
}

// ─── MAPA ────────────────────────────────────────────────
export const getEstadoActual = async () => {
  const res = await api.get('/api/estado-actual')
  return res.data  // { centro, contenedores, alertas }
}

// ─── REPORTAR ────────────────────────────────────────────
export const reportarAlerta = async (lat, lng, fotoFile) => {
  const formData = new FormData()
  formData.append('lat', lat)
  formData.append('lng', lng)
  formData.append('foto', fotoFile)

  const res = await api.post('/api/reportar', formData)
  return res.data
}

// ─── RUTAS ───────────────────────────────────────────────
export const optimizarRuta = async () => {
  const res = await api.get('/api/optimizar-ruta')
  return res.data  // { status, ruta_optimizada }
}

export default api