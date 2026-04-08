export default function ContenedorCard({ contenedor }) {

  const getColor = () => {
    if (contenedor.estado === 'Lleno') return '#ef4444'
    if (contenedor.estado === 'Operativo') return '#22c55e'
    return '#f59e0b'
  }

  return (
    <div style={{
      background: '#22263a',
      padding: '15px',
      borderRadius: '12px',
      borderLeft: `6px solid ${getColor()}`,
      boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
      color: 'white',
      transition: '0.3s'
    }}>
      <h3>🗑 {contenedor.id}</h3>

      <p><b>Tipo:</b> {contenedor.tipo}</p>
      <p><b>Estado:</b> 
        <span style={{ color: getColor(), marginLeft: '5px' }}>
          {contenedor.estado}
        </span>
      </p>

      <p style={{ fontSize: '12px', color: '#94a3b8' }}>
        📍 {contenedor.lat}, {contenedor.lng}
      </p>
    </div>
  )
}