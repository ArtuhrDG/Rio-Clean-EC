import api from './axiosConfig'

// POST /rutas/optimizar → recibe lista de puntos, devuelve ruta ordenada
export const optimizarRuta = (payload) => api.post('/rutas/optimizar', payload)

// GET /rutas/activas → rutas actuales del camión
export const getRutasActivas = () => api.get('/rutas/activas')
