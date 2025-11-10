import { getImport } from "@/app/data/import";
import { getPostcodesInImport } from "@/app/data/postcode";
import Link from "next/link";

export default async function ImportPage({
  params,
}: {
  params: Promise<{ importID: string }>;
}) {
  const { importID } = await params;
  const importData = await getImport(Number(importID));

  const postcodes = await getPostcodesInImport(Number(importID));
  console.log(postcodes);

  return (
    <>
      <h1 className="text-2xl">{importData.authority}</h1>
      <hr />
      <p>
        License:{" "}
        <Link href={importData.data_license_url}>
          {importData.data_license}
        </Link>
      </p>
      <p>
        <Link
          className="text-blue-500 underline"
          href={`https://www.openstreetmap.org/relation/${importData.osm_boundary_id}`}
        >
          View On OSM
        </Link>
      </p>

      <Link className="text-blue-500 underline" href={importData.source_url}>
        Data Source
      </Link>

      <p>Raw Data: {JSON.stringify(importData)}</p>

      <hr />

      <div className="flex flex-col">
        {postcodes.map((postcode) => (
          <Link
            key={postcode.postcode}
            href={`/postcode/${postcode.postcode}`}
            className="text-blue-500 underline"
          >
            {postcode.postcode} | {`${postcode.geocoding_rate * 100}%`}
          </Link>
        ))}
      </div>
    </>
  );
}
