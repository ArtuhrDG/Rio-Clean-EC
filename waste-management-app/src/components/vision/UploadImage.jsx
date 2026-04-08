import { useState } from 'react'

export default function UploadImage({ onResult }) {
  const [image, setImage] = useState(null)

  const analizarImagen = () => {
    // 🔥 SIMULACIÓN IA
    const niveles = ['Vacío', 'Medio', 'Lleno', 'Desbordado']
    const nivel = niveles[Math.floor(Math.random() * niveles.length)]

    const resultado = {
      nivel,
      confianza: (Math.random() * 100).toFixed(2),
      alerta: nivel === 'Lleno' || nivel === 'Desbordado'
    }

    onResult(resultado)
  }

  return (
    <div>
      <h3>Subir Imagen</h3>

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button onClick={analizarImagen}>
        Analizar con IA
      </button>
    </div>
  )
}