import getImports from "@/app/data/getImports";
import Link from "next/link";

export default async function Home() {
  const importsQuery = await getImports();
  const imports = importsQuery.results;

  return (
    <>
      <h1 className="text-2xl">OSM Address Audit</h1>
      <hr />
      <table className="border-collapse border border-white m-4">
        <thead>
          <tr>
            <th className="border border-white p-2">Area</th>
            <th className="border border-white p-2">License</th>
            <th className="border border-white p-2">Data Source</th>
          </tr>
        </thead>
        <tbody>
          {imports.map((record) => (
            <tr key={Number(record.id as string)}>
              <td className="border border-white p-2">
                <Link
                  href={`/import/${record.id as string}`}
                  className="text-blue-500 underline"
                >
                  {record.authority as string}
                </Link>
              </td>
              <td className="border border-white p-2">
                <Link
                  href={record.data_license_url as string}
                  className="text-blue-500 underline"
                >
                  {record.data_license as string}
                </Link>
              </td>
              <td className="border border-white p-2">
                <Link
                  href={record.source_url as string}
                  className="text-blue-500 underline"
                >
                  Source
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
