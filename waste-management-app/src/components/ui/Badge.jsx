// Badge.jsx
import { colorPorNivel } from '@/utils/estadoColor'

export default function Badge({ estado }) {
  const color = colorPorNivel(estado)  // <--- aquí usas colorPorNivel
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: '0.72rem', fontWeight: 600,
      padding: '3px 9px', borderRadius: 999,
      background: `${color}22`, color,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
      {estado}
    </span>
  )
}