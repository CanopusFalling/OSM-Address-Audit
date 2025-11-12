import { getAddress } from "@/app/data/address";
import { MarkerMapDynamic } from "@/app/components/MarkerMapDynamic";
import { MarkerData } from "@/app/components/MarkerMap";
import { get } from "http";
import geocode from "@/app/data/geocode_proton";

export const dynamic = "force-dynamic";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ addressID: string }>;
}) {
  const { addressID } = await params;
  const addressInfo = await getAddress(Number(addressID));

  const marker: MarkerData = {
    x: addressInfo.x,
    y: addressInfo.y,
    text: addressInfo.raw_address,
  };

  const geocodeRes = await geocode(addressInfo.raw_address);

  const geocodeBody = await geocodeRes.json();

  return (
    <div>
      <h1 className="text-2xl">{addressInfo.raw_address}</h1>

      <hr />

      {addressInfo.geocode_success ? (
        <p className="text-green-500">Address Detected in OSM!</p>
      ) : (
        <p className="text-red-500">Address Missing From OSM</p>
      )}

      <MarkerMapDynamic markers={[marker]} />

      <p>Raw Data: {JSON.stringify(addressInfo)}</p>

      <p>Geocode Res {JSON.stringify(geocodeBody as object)}</p>
    </div>
  );
}
