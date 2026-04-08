export default function ContenedorCard({ contenedor }) {
  const getColor = () => {
    if (contenedor.estado === 'Lleno') return 'red'
    if (contenedor.estado === 'Operativo') return 'green'
    return 'orange'
  }

  return (
    <div style={{
      border: '1px solid gray',
      margin: '10px',
      padding: '10px',
      borderLeft: `5px solid ${getColor()}`
    }}>
      <h4>{contenedor.id}</h4>
      <p>Tipo: {contenedor.tipo}</p>
      <p>Estado: {contenedor.estado}</p>
    </div>
  )
}