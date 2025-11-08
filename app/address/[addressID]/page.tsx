import getAddress from "@/app/data/getAddress";

export default async function AddressPage({
  params,
}: {
  params: Promise<{ addressID: string }>;
}) {
  const { addressID } = await params;
  const addressInfo = await getAddress(Number(addressID));

  return (
    <div>
      <h1>{addressInfo["raw_address"] as string}</h1>

      <h2>Raw Data:</h2>

      <p>{JSON.stringify(addressInfo)}</p>
    </div>
  );
}
