import api from './axiosConfig'

// GET /contenedores → { contenedores_fijos: [...], centro_de_acopio: {...} }
export const getContenedores = () => api.get('/contenedores')

// GET /contenedores/:id
export const getContenedorById = (id) => api.get(`/contenedores/${id}`)

// PATCH /contenedores/:id/estado
export const actualizarEstado = (id, estado) =>
  api.patch(`/contenedores/${id}/estado`, { estado })
