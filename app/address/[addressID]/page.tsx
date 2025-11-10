import { getAddress } from "@/app/data/address";
import { MarkerMapDynamic } from "@/app/components/MarkerMapDynamic";
import { MarkerData } from "@/app/components/MarkerMap";

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
    </div>
  );
}
