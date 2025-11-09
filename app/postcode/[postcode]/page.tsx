import getPostcode from "@/app/data/getPostcode";

export default async function PostcodePage({
  params,
}: {
  params: Promise<{ postcode: string }>;
}) {
  const { postcode } = await params;
  const addressInfo = await getPostcode(postcode);

  return (
    <div>
      <h1 className="text-xl">Addresses in {postcode}</h1>

      <hr />

      {addressInfo.length === 0 ? (
        <p className="bg-red-800 p-4 rounded-lg">
          No addresses found for this postcode.
        </p>
      ) : (
        addressInfo.map((address) => (
          <div key={Number(address.rowid)}>
            <a
              href={`/address/${address.rowid}`}
              className="block text-lg font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400 transition duration-150"
            >
              {address.raw_address as string} |{" "}
              {(address["source:geometry"] as string) == "OpenStreetMap" ? (
                <span className="text-green-500">successfully geocoded</span>
              ) : (
                <span className="text-red-500">failed geocoding</span>
              )}
            </a>
          </div>
        ))
      )}
    </div>
  );
}
