"use client";

import dynamic from "next/dynamic";

export const MarkerMapDynamic = dynamic(() => import("./MarkerMap"), {
  ssr: false,
});
