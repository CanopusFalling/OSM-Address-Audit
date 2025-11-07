import getData from "../data/getData";

export default async function TablePage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const reqRes = await getData(table);

  return (
    <div>
      {reqRes.results.map((row, rowIndex) => (
        <p>
          {row.toString()} {rowIndex}
        </p>
      ))}
    </div>
  );
}
