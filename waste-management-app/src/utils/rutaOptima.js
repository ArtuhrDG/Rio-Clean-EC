// Algoritmo Nearest Neighbor → genera ruta inicial greedy
// puntos: [{ id, lat, lng, prioridad }]
// Retorna array ordenado de puntos comenzando y terminando en base

const distancia = (a, b) =>
  Math.sqrt(Math.pow(a.lat - b.lat, 2) + Math.pow(a.lng - b.lng, 2))

export const nearestNeighbor = (base, puntos) => {
  const restantes = [...puntos]
  const ruta = [base]
  let actual = base

  while (restantes.length) {
    // Preferimos puntos de mayor prioridad a igual distancia
    restantes.sort((a, b) => {
      const da = distancia(actual, a)
      const db = distancia(actual, b)
      // Score = distancia / prioridad (menor = mejor)
      return da / (a.prioridad + 0.01) - db / (b.prioridad + 0.01)
    })
    ruta.push(restantes.shift())
    actual = ruta[ruta.length - 1]
  }
  ruta.push(base) // regresa a base
  return ruta
}
