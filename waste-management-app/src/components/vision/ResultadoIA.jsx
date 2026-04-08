export default function ResultadoIA({ resultado }) {

  const getColor = () => {
    if (resultado.nivel === 'Desbordado') return 'red'
    if (resultado.nivel === 'Lleno') return 'orange'
    if (resultado.nivel === 'Medio') return 'yellow'
    return 'green'
  }

  return (
    <div style={{
      border: '2px solid',
      padding: '10px',
      marginTop: '10px',
      borderColor: getColor()
    }}>
      <h3>Resultado IA</h3>

      <p><b>Nivel detectado:</b> {resultado.nivel}</p>
      <p><b>Confianza:</b> {resultado.confianza}%</p>

      {resultado.alerta && (
        <p style={{ color: 'red' }}>
          ⚠️ ALERTA: Contenedor requiere recolección
        </p>
      )}
    </div>
  )
}