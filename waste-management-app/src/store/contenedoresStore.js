import { create } from 'zustand'
import { getContenedores, actualizarEstado } from '@/api/contenedores'

export const useContenedoresStore = create((set) => ({
  contenedores: [],
  centroAcopio: null,
  loading: false,
  error: null,

  fetchContenedores: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await getContenedores()
      set({
        contenedores: data.contenedores_fijos || [],
        centroAcopio: data.centro_de_acopio || null,
        loading: false,
      })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  actualizarEstado: async (id, estado) => {
    await actualizarEstado(id, estado)
    set((s) => ({
      contenedores: s.contenedores.map((c) =>
        c.id === id ? { ...c, estado } : c
      ),
    }))
  },
}))
