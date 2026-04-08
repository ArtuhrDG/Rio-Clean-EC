import { useRef, useState, useEffect } from 'react'

export default function UploadImage({ onResult, onDenunciar }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const [imagen, setImagen] = useState(null)
  const [preview, setPreview] = useState(null)

  // 📷 Activar cámara
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => {
        console.log("No se pudo acceder a la cámara", err)
      })
  }, [])

  // 📸 Tomar foto
  const tomarFoto = () => {
    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0)

    const img = canvas.toDataURL('image/png')

    setPreview(img)
    setImagen(img)
  }

  // 📁 Subir imagen
  const subirImagen = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setPreview(url)
    setImagen(file)
  }

  // ❌ Eliminar imagen
  const eliminarImagen = () => {
    setImagen(null)
    setPreview(null)
  }

  // 🤖 IA simulada
  const analizar = () => {
    if (!imagen) {
      alert("Primero toma o selecciona una imagen")
      return
    }

    const niveles = ['Vacío', 'Medio', 'Lleno', 'Desbordado']
    const nivel = niveles[Math.floor(Math.random() * niveles.length)]

    const resultado = {
      nivel,
      confianza: (Math.random() * 100).toFixed(2),
      alerta: nivel === 'Lleno' || nivel === 'Desbordado'
    }

    onResult(resultado)
  }

  // 🚨 Denunciar
  const denunciar = () => {
    if (!imagen) {
      alert("Primero analiza una imagen")
      return
    }

    const data = {
      id: Date.now(),
      estado: "Pendiente",
      tipo_residuo: "Detectado por IA"
    }

    onDenunciar(data)
    alert("🚨 Denuncia enviada")
  }

  return (
    <div style={{ padding: '20px' }}>

      <h2>📷 Visión IA</h2>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>

        {/* 🎥 Cámara SOLO si no hay imagen */}
        <div>
          {!preview && (
            <>
              <video 
                ref={videoRef} 
                autoPlay 
                style={{ width: '300px', borderRadius: '10px' }}
              />
              <br />

              <button onClick={tomarFoto} style={btnPrimary}>
                📸 Tomar Foto
              </button>
            </>
          )}
        </div>

        {/* 👁 Vista previa */}
        <div>
          {preview ? (
            <div>
              <img 
                src={preview} 
                alt="preview" 
                style={{ width: '300px', borderRadius: '10px' }} 
              />

              <br />

              <button onClick={eliminarImagen} style={btnDelete}>
                ❌ Eliminar imagen
              </button>
            </div>
          ) : (
            <p>Sin imagen</p>
          )}
        </div>
      </div>

      {/* 📁 Subir imagen SOLO si no hay imagen */}
      {!preview && (
        <div style={{ marginTop: '15px' }}>
          <input type="file" accept="image/*" onChange={subirImagen} />
        </div>
      )}

      {/* ⚙️ Botones */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={analizar} style={btnSuccess}>
          🤖 Analizar
        </button>

        <button onClick={denunciar} style={btnDanger}>
          🚨 Denunciar
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />

    </div>
  )
}

// 🎨 estilos
const btnPrimary = {
  marginTop: '10px',
  padding: '10px',
  background: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
}

const btnSuccess = {
  padding: '10px',
  marginRight: '10px',
  background: '#22c55e',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
}

const btnDanger = {
  padding: '10px',
  background: '#ef4444',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
}

const btnDelete = {
  marginTop: '10px',
  padding: '8px',
  background: '#6b7280',
  color: 'white',
  border: 'none',
  borderRadius: '8px'
}