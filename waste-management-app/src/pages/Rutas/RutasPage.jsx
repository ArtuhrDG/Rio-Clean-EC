// RutasPage.jsx: Optimización de rutas de recolección con algoritmo Nearest Neighbor y prioridad
// Modulo 2 — Optimización de Rutas

import { useState, useCallback } from 'react'
import {
  Route, Play, RefreshCw, Truck,
  MapPin, BarChart3, AlertTriangle, Trash2, CheckCircle2
} from 'lucide-react'
import MapaRutas from '@/components/map/MapaRutas'
import KPICard   from '@/components/cards/KPICard'
import Badge     from '@/components/ui/Badge'
import styles    from './RutasPage.module.css'

// ── Datos reales del backend (base.json) ──────────────────────
const BASE = {
  id: 'base_01',
  tipo: 'base',
  nombre: 'GADM Riobamba — Gestión Ambiental',
  lat: -1.6651,
  lng: -78.6502,
  estado: 'Base',
}

const CONTENEDORES = [
  { id: 'c_001', tipo: 'contenedor', subTipo: 'Normal',    estado: 'Operativo', lat: -1.6685, lng: -78.6481 },
  { id: 'c_002', tipo: 'contenedor', subTipo: 'Reciclaje', estado: 'Lleno',     lat: -1.6712, lng: -78.6534 },
]

const ALERTAS = [
  {
    id: 'alerta_001', tipo: 'alerta', estado: 'Pendiente de Recolección',
    nombre: 'Plástico y Cartón', verificado_por_ia: true,
    lat: -1.6620, lng: -78.6450,
    fecha_reporte: '2026-04-08T09:15:00Z',
  },
  {
    id: 'alerta_002', tipo: 'alerta', estado: 'Pendiente de Recolección',
    nombre: 'Escombros y Basura Acumulada', verificado_por_ia: true,
    lat: -1.6605, lng: -78.6555,
    fecha_reporte: '2026-04-08T09:30:00Z',
  },
]

// ── Haversine (km) ────────────────────────────────────────────
function haversine(a, b) {
  const R = 6371, r = x => x * Math.PI / 180
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

// ── Prioridad: P = 0.40L + 0.25U + 0.20R + 0.15T ─────────────
const NIVEL   = { 'Operativo': 0.2, 'Lleno': 0.75, 'Desbordado': 1.0, 'Pendiente de Recolección': 0.8 }
const URGENCIA = { 'Operativo': 0.0, 'Lleno': 0.5,  'Desbordado': 1.0, 'Pendiente de Recolección': 0.7 }

function calcPrioridad(p) {
  const L = NIVEL[p.estado]    ?? 0.5
  const U = URGENCIA[p.estado] ?? 0.5
  const R = p.tipo === 'alerta' ? 0.9 : 0.3
  const T = 0.5
  return parseFloat((0.40 * L + 0.25 * U + 0.20 * R + 0.15 * T).toFixed(2))
}

// ── Nearest Neighbor con peso prioridad ───────────────────────
function optimizarNearestNeighbor(base, puntos) {
  const lista = puntos.map(p => ({ ...p, prioridad: calcPrioridad(p) }))
  const ruta = [base]
  let actual = base
  const restantes = [...lista]
  while (restantes.length) {
    restantes.sort((a, b) => {
      const sa = haversine(actual, a) / (a.prioridad + 0.01)
      const sb = haversine(actual, b) / (b.prioridad + 0.01)
      return sa - sb
    })
    const next = restantes.shift()
    ruta.push(next)
    actual = next
  }
  ruta.push(base)
  return ruta
}

function distTotal(ruta) {
  let d = 0
  for (let i = 0; i < ruta.length - 1; i++) d += haversine(ruta[i], ruta[i + 1])
  return d.toFixed(2)
}

// ── Helpers visuales ──────────────────────────────────────────
const prioColor = p => p >= 0.75 ? '#ef4444' : p >= 0.50 ? '#f59e0b' : '#3dd68c'
const prioLabel = p => p >= 0.75 ? 'Alta' : p >= 0.50 ? 'Media' : 'Baja'

// ─────────────────────────────────────────────────────────────
export default function RutasPage() {
  const [optimizado, setOptimizado] = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [rutaOptima, setRutaOptima] = useState([])

  // Solo los puntos que requieren atención (excluye Operativo)
  const puntosUrgentes = [
    ...CONTENEDORES.filter(c => c.estado !== 'Operativo'),
    ...ALERTAS,
  ]

  // Todos los puntos para el mapa (base + contenedores + alertas)
  const todosPuntos = [
    BASE,
    ...CONTENEDORES.map(c => ({ ...c, prioridad: calcPrioridad(c) })),
    ...ALERTAS.map(a => ({ ...a, prioridad: calcPrioridad(a) })),
  ]

  const optimizar = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const ruta = optimizarNearestNeighbor(BASE, puntosUrgentes)
      setRutaOptima(ruta)
      setOptimizado(true)
      setLoading(false)
    }, 1000)
  }, [])

  const resetear = () => { setOptimizado(false); setRutaOptima([]) }

  const paradasOrdenadas = rutaOptima.filter(p => p.tipo !== 'base')
  const kmTotal = optimizado ? distTotal(rutaOptima) : null
  const desbordados = CONTENEDORES.filter(c => c.estado === 'Desbordado').length
  const pendientes  = ALERTAS.length

  return (
    <div className={styles.page}>

      {/* KPIs */}
      <div className={styles.kpis}>
        <KPICard icon={Truck}         label="Paradas urgentes"   value={puntosUrgentes.length}              sub="a recolectar hoy"         color="var(--color-primary)" />
        <KPICard icon={AlertTriangle} label="Desbordados"        value={desbordados}                        sub="prioridad crítica"        color="#ef4444" />
        <KPICard icon={MapPin}        label="Alertas ciudadanas" value={pendientes}                         sub="verificadas por IA"       color="#f97316" />
        <KPICard icon={BarChart3}     label="Distancia estimada" value={kmTotal ? `${kmTotal} km` : '—'}   sub="ruta óptima calculada"    color="#6366f1" />
      </div>

      {/* Main */}
      <div className={styles.main}>

        {/* Panel izquierdo */}
        <aside className={styles.panel}>
          <div className={styles.panelHeader}>
            <Route size={15} />
            <span>{optimizado ? 'Ruta optimizada' : 'Puntos pendientes'}</span>
            <span className={styles.conteo}>{puntosUrgentes.length}</span>
          </div>

          <div className={styles.btnGroup}>
            {!optimizado
              ? (
                <button className={styles.btnPrimary} onClick={optimizar} disabled={loading}>
                  {loading
                    ? <><RefreshCw size={14} className={styles.spin} /> Calculando…</>
                    : <><Play size={14} /> Optimizar ruta</>}
                </button>
              ) : (
                <button className={styles.btnGhost} onClick={resetear}>
                  <RefreshCw size={13} /> Reiniciar
                </button>
              )
            }
          </div>

          {/* Lista */}
          <div className={styles.lista}>
            {(optimizado ? paradasOrdenadas : puntosUrgentes.map(p => ({ ...p, prioridad: calcPrioridad(p) }))).map((p, i) => (
              <div key={p.id} className={styles.stopCard}>
                {optimizado
                  ? <div className={styles.stopNum}>{i + 1}</div>
                  : (
                    <div className={styles.stopIcon} style={{
                      background: p.tipo === 'alerta' ? 'rgba(249,115,22,.15)' : 'rgba(245,158,11,.15)',
                      color: p.tipo === 'alerta' ? '#f97316' : '#f59e0b',
                    }}>
                      {p.tipo === 'alerta' ? <AlertTriangle size={13} /> : <Trash2 size={13} />}
                    </div>
                  )
                }
                <div className={styles.stopInfo}>
                  <span className={styles.stopNombre}>{p.nombre || p.id}</span>
                  <Badge estado={p.estado} />
                </div>
                <div className={styles.prioBadge} style={{
                  color: prioColor(p.prioridad),
                  background: `${prioColor(p.prioridad)}22`,
                }}>
                  {prioLabel(p.prioridad)}<br />
                  <small>{p.prioridad}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Fórmula */}
          <div className={styles.formula}>
            <span className={styles.formulaTitle}>Fórmula de prioridad</span>
            <code>P = 0.40·L + 0.25·U + 0.20·R + 0.15·T</code>
            <span className={styles.formulaSub}>L=llenado · U=urgencia · R=reportes · T=tiempo</span>
          </div>

          {/* Resumen */}
          {optimizado && (
            <div className={styles.resumen}>
              <CheckCircle2 size={14} color="var(--color-primary)" />
              <div>
                <b>{puntosUrgentes.length} paradas</b> · {kmTotal} km estimados<br />
                <span style={{ fontSize: '0.7rem', color: 'var(--color-muted)' }}>
                  Nearest Neighbor + peso por prioridad
                </span>
              </div>
            </div>
          )}
        </aside>

        {/* Mapa */}
        <div className={styles.mapa}>
          <MapaRutas
            puntos={todosPuntos}
            rutaOptima={rutaOptima}
            centroAcopio={BASE}
          />
        </div>
      </div>
    </div>
  )
}