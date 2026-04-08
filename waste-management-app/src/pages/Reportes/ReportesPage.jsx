import { useState } from 'react'
import ReporteForm from '../../components/reportes/ReporteForm'
import ReporteList from '../../components/reportes/ReporteList'
import data from '../../data/base.json'

export default function ReportesPage() {
  const [reportes, setReportes] = useState(data.alertas_ciudadanas)

  const agregarReporte = (nuevo) => {
    setReportes([...reportes, nuevo])
  }

  return (
    <div>
      <h2>Reportes Ciudadanos</h2>

      <ReporteForm onAdd={agregarReporte} />
      <ReporteList reportes={reportes} />
    </div>
  )
}