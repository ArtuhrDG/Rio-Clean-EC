import { useState } from 'react'
import ContenedorCard from './ContenedorCard'

export default function ContenedorList({ contenedores }) {
  const [filtro, setFiltro] = useState('Todos')

  const filtrar = () => {
    if (filtro === 'Todos') return contenedores
    return contenedores.filter(c => c.estado === filtro)
  }

  const lista = filtrar()

  const total = contenedores.length
  const llenos = contenedores.filter(c => c.estado === 'Lleno').length
  const operativos = contenedores.filter(c => c.estado === 'Operativo').length

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>📦 Gestión de Contenedores</h2>

      {/* 🔥 KPIs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px'
      }}>
        <div style={cardStyle}>Total: {total}</div>
        <div style={{ ...cardStyle, color: 'green' }}>Operativos: {operativos}</div>
        <div style={{ ...cardStyle, color: 'red' }}>Llenos: {llenos}</div>
      </div>

      {/* 🔍 Filtros */}
      <div style={{ marginBottom: '15px' }}>
        <label>Filtrar por estado: </label>

        <select onChange={(e) => setFiltro(e.target.value)}>
          <option>Todos</option>
          <option>Operativo</option>
          <option>Lleno</option>
        </select>
      </div>

      {/* 📋 Lista */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
      }}>
        {lista.map(c => (
          <ContenedorCard key={c.id} contenedor={c} />
        ))}
      </div>
    </div>
  )
}

const cardStyle = {
  background: '#1a1d27',
  padding: '15px',
  borderRadius: '10px',
  color: 'white',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
}