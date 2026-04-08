// src/pages/Dashboard/DashboardPage.jsx
import { useEffect, useState } from 'react'
import { LayoutDashboard, RefreshCw } from 'lucide-react'
import { getEstadoActual } from '../../services/api'

export default function DashboardPage() {
  const [estado, setEstado]   = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  const cargarDatos = () => {
    setLoading(true)
    setError(null)
    getEstadoActual()
      .then(setEstado)
      .catch(() => setError('No se pudo conectar con el servidor.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { cargarDatos() }, [])

  // ── Métricas calculadas desde la API ──
  const contenedoresActivos = estado?.contenedores?.length ?? 0
  const alertasPendientes   = estado?.alertas?.length ?? 0
  const verificadosIA       = estado?.alertas?.filter(a => a.confianza_ia >= 0.7).length ?? 0

  const tarjetas = [
    { label: 'Contenedores activos', value: loading ? '…' : contenedoresActivos, color: '#3dd68c', emoji: '🗑' },
    { label: 'Alertas pendientes',   value: loading ? '…' : alertasPendientes,   color: '#f97316', emoji: '📍' },
    { label: 'Rutas optimizadas',    value: loading ? '…' : '0',                 color: '#6366f1', emoji: '🚛' },
    { label: 'Verificados por IA',   value: loading ? '…' : verificadosIA,       color: '#f59e0b', emoji: '🤖' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Header ── */}
      <div style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '32px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 'var(--radius-md)',
            background: 'rgba(61,214,140,.12)', color: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <LayoutDashboard size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>
              Bienvenido a Rio-Clean-EC
            </h2>
            <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem' }}>
              Sistema Inteligente de Gestión de Residuos Sólidos — Riobamba, Ecuador
            </p>
          </div>
        </div>

        {/* Botón refrescar */}
        <button
          onClick={cargarDatos}
          disabled={loading}
          title="Actualizar datos"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 10px',
            cursor: loading ? 'not-allowed' : 'pointer',
            color: 'var(--color-muted)',
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.8rem',
          }}
        >
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          {loading ? 'Cargando…' : 'Actualizar'}
        </button>
      </div>

      {/* ── Error ── */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,.08)',
          border: '1px solid rgba(239,68,68,.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '14px 18px',
          color: '#ef4444',
          fontSize: '0.85rem',
        }}>
          ⚠️ {error}{' '}
          <button
            onClick={cargarDatos}
            style={{ color: '#ef4444', fontWeight: 700, cursor: 'pointer',
                     background: 'none', border: 'none', textDecoration: 'underline' }}
          >
            Reintentar
          </button>
        </div>
      )}

      {/* ── Tarjetas KPI ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 12,
      }}>
        {tarjetas.map(({ label, value, color, emoji }) => (
          <div key={label} style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '20px 18px',
            display: 'flex', flexDirection: 'column', gap: 8,
            opacity: loading ? 0.6 : 1,
            transition: 'opacity 0.3s',
          }}>
            <span style={{ fontSize: '1.6rem' }}>{emoji}</span>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color }}>{value}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-muted)' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* ── Tip ── */}
      <div style={{
        background: 'rgba(61,214,140,.06)',
        border: '1px solid rgba(61,214,140,.2)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        color: 'var(--color-muted)',
        fontSize: '0.82rem',
      }}>
        📌 Usa el menú lateral para navegar a cada módulo.
        El <strong style={{ color: 'var(--color-primary)' }}>Módulo 2 — Rutas</strong> ya está operativo.
      </div>

      {/* ── Animación de spin para el botón de carga ── */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
}