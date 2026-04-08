import { useState } from 'react'

export default function UploadImage({ onResult, onDenunciar }) {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleImage = (file) => {
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const analizarImagen = () => {
    if (!image) {
      alert("Seleccione o tome una imagen")
      return
    }

    // 🔥 Simulación IA
    const niveles = ['Vacío', 'Medio', 'Lleno', 'Desbordado']
    const nivel = niveles[Math.floor(Math.random() * niveles.length)]

    const resultado = {
      nivel,
      confianza: (Math.random() * 100).toFixed(2),
      alerta: nivel === 'Lleno' || nivel === 'Desbordado'
    }

    onResult(resultado)
  }

  const handleDenunciar = () => {
    if (!image) {
      alert("Primero analiza una imagen")
      return
    }

    const denuncia = {
      id: Date.now(),
      tipo_residuo: "Detectado por IA",
      estado: "Pendiente",
      fecha: new Date().toISOString()
    }

    onDenunciar(denuncia)
    alert("🚨 Denuncia enviada al sistema")
  }

  return (
    <div style={{ border: '1px solid gray', padding: '15px' }}>
      <h3>Subir o Capturar Imagen</h3>

      {/* 📁 Seleccionar archivo */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImage(e.target.files[0])}
      />

      {/* 📷 Tomar foto */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handleImage(e.target.files[0])}
      />

      {/* 👁 Vista previa */}
      {preview && (
        <div>
          <h4>Vista previa:</h4>
          <img src={preview} alt="preview" width="200" />
        </div>
      )}

      <br />

      <button onClick={analizarImagen}>
        🤖 Analizar con IA
      </button>

      <button onClick={handleDenunciar} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
        🚨 Denunciar
      </button>
    </div>
  )
}