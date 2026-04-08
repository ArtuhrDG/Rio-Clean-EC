import { useState } from 'react'
import UploadImage from '../../components/vision/UploadImage'
import ResultadoIA from '../../components/vision/ResultadoIA'

export default function VisionPage() {
  const [resultado, setResultado] = useState(null)

  return (
    <div>
      <h2>Módulo de Visión Artificial</h2>

      <UploadImage onResult={setResultado} />

      {resultado && <ResultadoIA resultado={resultado} />}
    </div>
  )
}