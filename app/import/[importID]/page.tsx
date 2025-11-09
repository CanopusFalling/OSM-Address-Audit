import getPercentGeocoded from "@/app/data/getPercentGeocoded";
import getAddress from "@/app/data/getPercentGeocoded";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ importID: string }>;
}) {
  const { importID } = await params;
  const percentGeocoded = await getPercentGeocoded(Number(importID));

  return <div>Import is {percentGeocoded}% geocoded in OSM.</div>;
}
