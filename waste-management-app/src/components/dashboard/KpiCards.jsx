// src/components/dashboard/KpiCards.jsx
const kpis = [
  { valor: 7,    label: 'Contenedores críticos',      badge: '↑ 2 hoy',             color: '#E24B4A', bg: '#FCEBEB', texto: '#A32D2D' },
  { valor: 23,   label: 'Reportes ciudadanos',         badge: 'Pendientes: 9',        color: '#EF9F27', bg: '#FAEEDA', texto: '#854F0B' },
  { valor: '84%',label: 'Eficiencia de recolección',   badge: '↑ 6% esta semana',     color: '#639922', bg: '#EAF3DE', texto: '#3B6D11' },
  { valor: 12,   label: 'Zonas monitoreadas',          badge: 'Riobamba activo',       color: '#378ADD', bg: '#E6F1FB', texto: '#185FA5' },
]

export default function KpiCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
      {kpis.map((k, i) => (
        <div key={i} style={{ background: 'var(--color-bg, #fff)', border: '1px solid #e5e5e5', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 28, fontWeight: 500, color: k.color }}>{k.valor}</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{k.label}</div>
          <span style={{ display: 'inline-block', marginTop: 6, fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20, background: k.bg, color: k.texto }}>{k.badge}</span>
        </div>
      ))}
    </div>
  )
}