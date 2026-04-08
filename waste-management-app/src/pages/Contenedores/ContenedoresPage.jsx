import ContenedorMapa from '../../components/contenedores/ContenedorMapa'
import ContenedorList from '../../components/contenedores/ContenedorList'
import data from '../../data/base.json'

export default function ContenedoresPage() {
  const contenedores = data.contenedores_fijos

  return (
    <div>
      <h2>Gestión de Contenedores</h2>

      <ContenedorMapa contenedores={contenedores} />
      <ContenedorList contenedores={contenedores} />
    </div>
  )
}