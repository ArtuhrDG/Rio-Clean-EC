// src/components/dashboard/AlertasPanel.jsx
const alertas = [
  { nivel: 'critical', texto: '#14 Cdla. Olmedo',          sub: 'Desbordado · Visión IA',     tiempo: 'hace 8 min' },
  { nivel: 'critical', texto: '#07 Mercado La Merced',      sub: 'Desbordado · Visión IA',     tiempo: 'hace 14 min' },
  { nivel: 'warning',  texto: '#21 Parque Maldonado',       sub: 'Lleno al 92%',               tiempo: 'hace 22 min' },
  { nivel: 'warning',  texto: 'Reporte: Av. Daniel León Borja', sub: 'Urgencia alta',          tiempo: 'hace 35 min' },
  { nivel: 'warning',  texto: '#03 Terminal Terrestre',     sub: 'Lleno al 88%',               tiempo: 'hace 1h' },
  { nivel: 'info',     texto: 'Reporte: Cdla. Los Álamos', sub: 'Urgencia media',              tiempo: 'hace 1h 20m' },
]

const estilos = {
  critical: { bg: '#FCEBEB', dot: '#E24B4A' },
  warning:  { bg: '#FAEEDA', dot: '#EF9F27' },
  info:     { bg: '#E6F1FB', dot: '#378ADD' },
}

export default function AlertasPanel() {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ padding: '12px 14px 8px', fontWeight: 500, fontSize: 13, display: 'flex', justifyContent: 'space-between' }}>
        Alertas activas
        <span style={{ fontSize: 11, color: '#888', fontWeight: 400 }}>{alertas.length} sin atender</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, padding: '0 10px 12px', maxHeight: 280, overflowY: 'auto' }}>
        {alertas.map((a, i) => {
          const s = estilos[a.nivel]
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, background: s.bg, borderRadius: 8, padding: '8px 10px', fontSize: 12, cursor: 'pointer' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.dot, flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div>{a.texto}</div>
                <div style={{ fontSize: 10, color: '#888' }}>{a.sub}</div>
              </div>
              <div style={{ fontSize: 10, color: '#aaa', flexShrink: 0 }}>{a.tiempo}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}