import ContenedorCard from './ContenedorCard'

export default function ContenedorList({ contenedores }) {
  return (
    <div>
      <h3>Lista de Contenedores</h3>

      {contenedores.map(c => (
        <ContenedorCard key={c.id} contenedor={c} />
      ))}
    </div>
  )
}