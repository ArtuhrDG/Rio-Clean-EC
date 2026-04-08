import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet'
import { useState } from 'react'

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null)

  useMapEvents({
    click(e) {
      setPosition(e.latlng)
      onSelect(e.latlng)
    }
  })

  return position ? <Marker position={position} /> : null
}

export default function MapaSelector({ onSelect }) {
  return (
    <MapContainer center={[-1.665, -78.65]} zoom={14} style={{ height: '300px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker onSelect={onSelect} />
    </MapContainer>
  )
}