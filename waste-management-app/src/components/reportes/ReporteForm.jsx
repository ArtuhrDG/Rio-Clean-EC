import { useState } from 'react'
import MapaSelector from './MapaSelector'

export default function ReporteForm({ onAdd }) {
  const [tipo, setTipo] = useState('')
  const [ubicacion, setUbicacion] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    const nuevoReporte = {
      id: Date.now(),
      tipo_residuo: tipo,
      lat: ubicacion?.lat,
      lng: ubicacion?.lng,
      estado: 'Pendiente',
      verificado_por_ia: true // simulación IA
    }

    onAdd(nuevoReporte)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo Reporte</h3>

      <select onChange={(e) => setTipo(e.target.value)}>
        <option value="">Seleccione tipo</option>
        <option>Plástico</option>
        <option>Cartón</option>
        <option>Orgánico</option>
        <option>Escombros</option>
      </select>

      <MapaSelector onSelect={setUbicacion} />

      <button type="submit">Enviar Reporte</button>
    </form>
  )
}