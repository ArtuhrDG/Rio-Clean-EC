export default function ReporteList({ reportes }) {
  return (
    <div>
      <h3>Alertas Generadas</h3>

      {reportes.map(r => (
        <div key={r.id} style={{
          border: '1px solid gray',
          margin: '10px',
          padding: '10px'
        }}>
          <p><b>Tipo:</b> {r.tipo_residuo}</p>
          <p><b>Estado:</b> {r.estado}</p>
          <p><b>Ubicación:</b> {r.lat}, {r.lng}</p>
        </div>
      ))}
    </div>
  )
}