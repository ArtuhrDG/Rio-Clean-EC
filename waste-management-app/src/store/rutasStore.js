import { create } from 'zustand'
import { optimizarRuta, getRutasActivas } from '@/api/rutas'

export const useRutasStore = create((set) => ({
  rutaOptima: [],      // array ordenado de puntos { id, lat, lng, prioridad }
  rutasActivas: [],
  loading: false,
  error: null,

  fetchRutasActivas: async () => {
    set({ loading: true })
    try {
      const { data } = await getRutasActivas()
      set({ rutasActivas: data, loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  optimizarRuta: async (puntos) => {
    set({ loading: true, error: null })
    try {
      const { data } = await optimizarRuta({ puntos })
      set({ rutaOptima: data.ruta_optimizada || [], loading: false })
      return data
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },
}))
