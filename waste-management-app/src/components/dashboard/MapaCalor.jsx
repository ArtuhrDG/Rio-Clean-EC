// src/components/dashboard/MapaCalor.jsx
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { colorPorNivel } from '../../utils/estadoColor'

// Datos simulados — luego vienen del backend
const contenedores = [
  { id: 1,  lat: -1.6635, lng: -78.6543, nivel: 'desbordado', nombre: '#14 Cdla. Olmedo' },
  { id: 2,  lat: -1.6702, lng: -78.6481, nivel: 'desbordado', nombre: '#07 Mercado La Merced' },
  { id: 3,  lat: -1.6580, lng: -78.6600, nivel: 'lleno',      nombre: '#21 Parque Maldonado' },
  { id: 4,  lat: -1.6720, lng: -78.6560, nivel: 'lleno',      nombre: '#03 Terminal Terrestre' },
  { id: 5,  lat: -1.6550, lng: -78.6520, nivel: 'medio',      nombre: '#09 Cdla. Bellavista' },
  { id: 6,  lat: -1.6660, lng: -78.6620, nivel: 'medio',      nombre: '#18 Barrio San Juan' },
]

const reportes = [
  { id: 'r1', lat: -1.6610, lng: -78.6490, texto: 'Reporte: Av. Daniel León Borja' },
  { id: 'r2', lat: -1.6500, lng: -78.6580, texto: 'Reporte: Cdla. Los Álamos' },
]

const radios = { desbordado: 14, lleno: 11, medio: 9, vacio: 7 }

export default function MapaCalor() {
  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e5e5' }}>
      <div style={{ padding: '12px 14px 8px', fontWeight: 500, fontSize: 13 }}>
        Mapa interactivo — Riobamba
        <div style={{ display: 'flex', gap: 12, marginTop: 6, flexWrap: 'wrap' }}>
          {[['#A32D2D','Desbordado'],['#E24B4A','Lleno'],['#EF9F27','Medio'],['#378ADD','Reporte']].map(([color, label]) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#888' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }}/>
              {label}
            </span>
          ))}
        </div>
      </div>
      <MapContainer center={[-1.6635, -78.6543]} zoom={13} style={{ height: 300, width: '100%' }} zoomControl={false}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OSM"/>
        {contenedores.map(c => (
          <CircleMarker key={c.id} center={[c.lat, c.lng]}
            radius={radios[c.nivel] ?? 9}
            pathOptions={{ fillColor: colorPorNivel(c.nivel), color: '#fff', weight: 2, fillOpacity: 0.9 }}>
            <Popup><b>{c.nombre}</b><br/>Nivel: {c.nivel}</Popup>
          </CircleMarker>
        ))}
        {reportes.map(r => (
          <CircleMarker key={r.id} center={[r.lat, r.lng]}
            radius={9}
            pathOptions={{ fillColor: '#378ADD', color: '#fff', weight: 2, fillOpacity: 0.85 }}>
            <Popup>{r.texto}</Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}