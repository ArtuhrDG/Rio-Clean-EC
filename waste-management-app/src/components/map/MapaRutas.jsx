import { useEffect, useRef, useState } from 'react'
import {
  MapContainer, TileLayer, Marker, Popup,
  Polyline, useMap, CircleMarker
} from 'react-leaflet'
import L from 'leaflet'

// Fix Vite + Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// ── Iconos DivIcon ────────────────────────────────────────────
const makeIcon = (bg, emoji, size = 34) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:${bg};border:2.5px solid rgba(255,255,255,0.9);
      display:flex;align-items:center;justify-content:center;
      font-size:${size * 0.42}px;
      box-shadow:0 3px 12px rgba(0,0,0,0.55);cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })

const stopIcon = (n, size = 26) =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:${size}px;height:${size}px;border-radius:50%;
      background:#3dd68c;border:2px solid #0f1117;
      display:flex;align-items:center;justify-content:center;
      font-size:${size * 0.42}px;font-weight:800;color:#0f1117;
      box-shadow:0 2px 8px rgba(0,0,0,0.5);
    ">${n}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  })

const truckIcon = () =>
  L.divIcon({
    className: '',
    html: `<div style="
      width:40px;height:40px;border-radius:50%;
      background:#6366f1;border:3px solid white;
      display:flex;align-items:center;justify-content:center;
      font-size:18px;box-shadow:0 0 0 6px rgba(99,102,241,.25);
      animation:truckPulse 1.5s ease-in-out infinite;
    ">🚛</div>
    <style>@keyframes truckPulse{0%,100%{box-shadow:0 0 0 4px rgba(99,102,241,.3)}50%{box-shadow:0 0 0 10px rgba(99,102,241,.1)}}</style>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  })

function iconForPunto(p) {
  if (p.tipo === 'base')             return makeIcon('#6366f1', '🏭', 38)
  if (p.tipo === 'alerta')           return makeIcon('#f97316', '📍', 30)
  if (p.estado === 'Desbordado')     return makeIcon('#ef4444', '⚠️', 32)
  if (p.estado === 'Lleno')          return makeIcon('#f59e0b', '🗑', 30)
  return makeIcon('#3dd68c', '✅', 28)
}

// ── FlyTo cuando cambia la ruta ───────────────────────────────
function FlyToRuta({ ruta }) {
  const map = useMap()
  useEffect(() => {
    if (!ruta || ruta.length < 2) return
    const bounds = L.latLngBounds(ruta.map(p => [p.lat, p.lng]))
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.4 })
  }, [ruta, map])
  return null
}

// ── Componente principal ──────────────────────────────────────
export default function MapaRutas({ puntos = [], rutaOptima = [], centroAcopio }) {
  const center = centroAcopio
    ? [centroAcopio.lat, centroAcopio.lng]
    : [-1.6651, -78.6502]

  const [ubicacionReal, setUbicacionReal] = useState(null)
  const [geoError, setGeoError]           = useState(null)
  const watchId = useRef(null)

  // ── Geolocalización en tiempo real ───────────────────────────
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoError('GPS no disponible en este dispositivo')
      return
    }
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        setUbicacionReal({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setGeoError(null)
      },
      (err) => setGeoError('Sin acceso al GPS — mostrando posición simulada'),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    )
    return () => {
      if (watchId.current) navigator.geolocation.clearWatch(watchId.current)
    }
  }, [])

  const rutaCoords = rutaOptima.map(p => [p.lat, p.lng])
  const paradasSinBase = rutaOptima.filter(p => p.tipo !== 'base')

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={center}
        zoom={14}
        style={{ height: '100%', width: '100%', borderRadius: 12 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ── Ruta: línea principal verde ── */}
        {rutaOptima.length > 1 && (
          <>
            {/* Sombra de la ruta (línea gruesa oscura detrás) */}
            <Polyline
              positions={rutaCoords}
              pathOptions={{ color: '#0f1117', weight: 7, opacity: 0.5 }}
            />
            {/* Línea principal */}
            <Polyline
              positions={rutaCoords}
              pathOptions={{
                color: '#3dd68c', weight: 4,
                opacity: 0.95, dashArray: '10 6',
                lineCap: 'round', lineJoin: 'round'
              }}
            />
          </>
        )}

        {/* ── Marcadores de todos los puntos ── */}
        {puntos.map((p) => (
          <Marker key={p.id} position={[p.lat, p.lng]} icon={iconForPunto(p)}>
            <Popup>
              <div style={{ minWidth: 170, fontFamily: 'system-ui', fontSize: 13 }}>
                <strong style={{ display: 'block', marginBottom: 4 }}>{p.nombre || p.id}</strong>
                <span>Tipo: {p.tipo === 'alerta' ? '📍 Alerta ciudadana' : `🗑 Contenedor ${p.subTipo || ''}`}</span><br />
                <span>Estado: <b>{p.estado}</b></span>
                {p.prioridad != null && (
                  <><br /><span>Prioridad: <b style={{ color: '#3dd68c' }}>{p.prioridad}</b></span></>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* ── Numeración de paradas sobre la ruta ── */}
        {paradasSinBase.map((p, i) => (
          <Marker
            key={`n-${p.id}`}
            position={[p.lat, p.lng]}
            icon={stopIcon(i + 1, 24)}
            zIndexOffset={200}
          />
        ))}

        {/* ── Ubicación en tiempo real del camión ── */}
        {ubicacionReal && (
          <Marker position={[ubicacionReal.lat, ubicacionReal.lng]} icon={truckIcon()}>
            <Popup>
              <div style={{ fontFamily: 'system-ui', fontSize: 13 }}>
                <strong>🚛 Camión recolector</strong><br />
                <span>Ubicación en tiempo real</span><br />
                <small style={{ color: '#888' }}>
                  {ubicacionReal.lat.toFixed(5)}, {ubicacionReal.lng.toFixed(5)}
                </small>
              </div>
            </Popup>
          </Marker>
        )}

        {rutaOptima.length > 1 && <FlyToRuta ruta={rutaOptima} />}
      </MapContainer>

      {/* ── Leyenda ── */}
      <div style={{
        position: 'absolute', bottom: 14, left: 14, zIndex: 999,
        background: 'rgba(26,29,39,.92)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,.08)',
        borderRadius: 10, padding: '10px 14px',
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        {[
          ['#6366f1', '🏭', 'Centro de acopio'],
          ['#3dd68c', '✅', 'Operativo'],
          ['#f59e0b', '🗑',  'Lleno'],
          ['#ef4444', '⚠️', 'Desbordado'],
          ['#f97316', '📍', 'Alerta ciudadana'],
          ['#6366f1', '🚛', 'Camión (GPS)'],
        ].map(([c, e, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 11, color: '#94a3b8' }}>
            <span style={{ width: 18, height: 18, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>{e}</span>
            {l}
          </div>
        ))}
      </div>

      {/* ── Aviso GPS ── */}
      {geoError && (
        <div style={{
          position: 'absolute', top: 12, right: 12, zIndex: 999,
          background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.4)',
          borderRadius: 8, padding: '7px 12px',
          fontSize: 11, color: '#f59e0b', maxWidth: 220,
        }}>
          📡 {geoError}
        </div>
      )}
    </div>
  )
}