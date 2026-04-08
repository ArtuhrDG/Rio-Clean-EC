import { create } from 'zustand'
import { clasificarImagen } from '@/api/vision'

export const useVisionStore = create((set) => ({
  resultado: null,   // { tipo_residuo, nivel_llenado, verificado_por_ia, confianza }
  loading: false,
  error: null,

  clasificar: async (formData) => {
    set({ loading: true, error: null, resultado: null })
    try {
      const { data } = await clasificarImagen(formData)
      set({ resultado: data, loading: false })
      return data
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  reset: () => set({ resultado: null, error: null }),
}))
