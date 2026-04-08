import api from './axiosConfig'

// GET /alertas → { alertas_ciudadanas: [...] }
export const getAlertas = () => api.get('/alertas')

// POST /alertas (FormData con imagen + lat + lng + tipo_residuo)
export const crearAlerta = (formData) =>
  api.post('/alertas', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

// PATCH /alertas/:id/estado
export const resolverAlerta = (id) =>
  api.patch(`/alertas/${id}/estado`, { estado: 'Recolectado' })
