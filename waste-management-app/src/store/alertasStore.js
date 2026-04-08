import { create } from 'zustand'
import { getAlertas, crearAlerta, resolverAlerta } from '@/api/alertas'

export const useAlertasStore = create((set) => ({
  alertas: [],
  loading: false,
  error: null,

  fetchAlertas: async () => {
    set({ loading: true, error: null })
    try {
      const { data } = await getAlertas()
      set({ alertas: data.alertas_ciudadanas || [], loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  crearAlerta: async (formData) => {
    const { data } = await crearAlerta(formData)
    set((s) => ({ alertas: [data, ...s.alertas] }))
    return data
  },

  resolverAlerta: async (id) => {
    await resolverAlerta(id)
    set((s) => ({
      alertas: s.alertas.map((a) =>
        a.id === id ? { ...a, estado: 'Recolectado' } : a
      ),
    }))
  },
}))
