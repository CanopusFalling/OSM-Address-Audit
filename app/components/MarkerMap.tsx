"use client";

import L from "leaflet";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { StaticImageData } from "next/image";

// //@ts-expect-error required to delete leaflet icon url
// delete L.Icon.Default.prototype._getIconUrl; // Remove the old URL

// Required as the nextjs deployment behaves slightly differently on cloudflare workers vs dev.
const getIconUrl = (asset: StaticImageData | string) => {
  if (typeof asset === "object" && asset.src) {
    return asset.src;
  }
  return asset;
};

L.Icon.Default.mergeOptions({
  iconUrl: getIconUrl(markerIcon),
  iconRetinaUrl: getIconUrl(markerIcon2x),
  shadowUrl: getIconUrl(markerShadow),
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
