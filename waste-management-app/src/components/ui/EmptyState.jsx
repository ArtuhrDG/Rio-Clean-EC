export default function EmptyState({ mensaje = 'Sin datos disponibles', icon = '📭' }) {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--color-muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>{icon}</div>
      <p style={{ fontSize: '0.9rem' }}>{mensaje}</p>
    </div>
  )
}
