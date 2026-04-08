import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function getColor(estado) {
  if (estado === 'Lleno') return 'red'
  if (estado === 'Operativo') return 'green'
  return 'orange'
}

export default function ContenedorMapa({ contenedores }) {
  return (
    <MapContainer center={[-1.665, -78.65]} zoom={14} style={{ height: '400px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {contenedores.map(c => (
        <Marker key={c.id} position={[c.lat, c.lng]}>
          <Popup>
            <b>ID:</b> {c.id} <br />
            <b>Tipo:</b> {c.tipo} <br />
            <b>Estado:</b> {c.estado}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}