import { getImports } from "@/app/data/import";
import Link from "next/link";

export default async function Home() {
  const imports = await getImports();

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
            <tr key={Number(record.id)}>
              <td className="border border-white p-2">
                <Link
                  href={`/import/${record.id}`}
                  className="text-blue-500 underline"
                >
                  {record.authority}
                </Link>
              </td>
              <td className="border border-white p-2">
                <Link
                  href={record.data_license_url}
                  className="text-blue-500 underline"
                >
                  {record.data_license}
                </Link>
              </td>
              <td className="border border-white p-2">
                <Link
                  href={record.source_url}
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
