"use client";

import dynamic from "next/dynamic";

export const MapContainer = dynamic(() => import("./map"), {
  ssr: false,
});
