import api from './axiosConfig'

// POST /vision/clasificar (FormData con imagen)
// → { tipo_residuo, nivel_llenado, verificado_por_ia, confianza }
export const clasificarImagen = (formData) =>
  api.post('/vision/clasificar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
