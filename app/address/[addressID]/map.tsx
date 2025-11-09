"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface mapProps {
  x: number;
  y: number;
  text: string;
}

export default function Map({ x, y, text }: mapProps) {
  return (
    <MapContainer center={[x, y]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[x, y]}>
        <Popup>{text}</Popup>
      </Marker>
    </MapContainer>
  );
}
