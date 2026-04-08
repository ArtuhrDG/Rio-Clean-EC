// Mapea el estado del contenedor/alerta a color CSS
export const estadoColor = (estado = '') => {
  const m = {
    'Operativo':              '#3dd68c',
    'Lleno':                  '#f59e0b',
    'Desbordado':             '#ef4444',
    'Pendiente de Recolección': '#f59e0b',
    'Recolectado':            '#3dd68c',
    'Fuera de servicio':      '#94a3b8',
  }
  return m[estado] ?? '#94a3b8'
}
