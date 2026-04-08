import { useState } from 'react'
import UploadImage from '../../components/vision/UploadImage'
import ResultadoIA from '../../components/vision/ResultadoIA'

export default function VisionPage() {
  const [resultado, setResultado] = useState(null)
  const [denuncias, setDenuncias] = useState([])

  const agregarDenuncia = (d) => {
    setDenuncias([...denuncias, d])
  }

  return (
    <div>
      <h2>Módulo de Visión Artificial</h2>

      <UploadImage 
        onResult={setResultado} 
        onDenunciar={agregarDenuncia}
      />

      {resultado && <ResultadoIA resultado={resultado} />}

      <h3>Denuncias generadas</h3>
      {denuncias.map(d => (
        <p key={d.id}>🚨 {d.tipo_residuo} - {d.estado}</p>
      ))}
    </div>
  )
}