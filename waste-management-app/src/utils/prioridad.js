// P = 0.40*L + 0.25*U + 0.20*R + 0.15*T
// L: nivel llenado (0-1), U: urgencia visual (0-1),
// R: reportes (0-1 normalizado), T: tiempo sin recoletar (0-1 normalizado)
export const calcularPrioridad = ({ nivelLlenado = 0, urgencia = 0, reportes = 0, tiempoSinRecolectar = 0 }) => {
  return (0.40 * nivelLlenado + 0.25 * urgencia + 0.20 * reportes + 0.15 * tiempoSinRecolectar).toFixed(3)
}

export const nivelLlenadoValor = (estado) => {
  const m = { 'Operativo': 0.3, 'Lleno': 0.85, 'Desbordado': 1.0 }
  return m[estado] ?? 0.5
}
