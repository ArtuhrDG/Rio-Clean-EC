// src/utils/estadoColor.js
export const colorPorNivel = (nivel) => {
  const colores = {
    vacio:       '#639922',
    medio:       '#EF9F27',
    lleno:       '#E24B4A',
    desbordado:  '#A32D2D',
  }
  return colores[nivel] ?? '#888'
}