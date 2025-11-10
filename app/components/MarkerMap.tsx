"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// //@ts-expect-error required to delete leaflet icon url
// delete L.Icon.Default.prototype._getIconUrl; // Remove the old URL

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export interface MarkerData {
  x: number; // Longitude
  y: number; // Latitude
  text: string;
}

interface MapProps {
  markers: MarkerData[];
}

export default function MarkerMap({ markers }: MapProps) {
  // Calculate where to place the centre of the map.
  const avgLat = markers.reduce((sum, m) => sum + m.y, 0) / markers.length;
  const avgLon = markers.reduce((sum, m) => sum + m.x, 0) / markers.length;

  const centerPos: [number, number] = [avgLat, avgLon];

  return (
    <MapContainer
      center={centerPos}
      zoom={16}
      scrollWheelZoom={true}
      className="h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => {
        // Position is [Latitude (y), Longitude (x)]
        const pos: [number, number] = [marker.y, marker.x];

        return (
          <Marker key={index} position={pos}>
            <Popup>{marker.text}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
