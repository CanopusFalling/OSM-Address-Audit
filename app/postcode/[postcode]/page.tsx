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
      <h1>Info For Postcode {postcode}</h1>

      <h2>Raw Data:</h2>

      {addressInfo.length === 0 ? (
        <p className="text-gray-600 p-4 border border-gray-200 rounded-lg bg-white">
          No addresses found for this postcode.
        </p>
      ) : (
        addressInfo.map((address) => (
          <div key={Number(address.row_id)}>
            <a
              href={`/address/${address.rowid}`}
              className="block text-lg font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-500 dark:hover:text-indigo-400 transition duration-150"
            >
              {address.raw_address as string}
            </a>
          </div>
        ))
      )}
    </div>
  );
}
