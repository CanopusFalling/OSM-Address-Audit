import getData from "../data/getData";

export default async function TablePage({
  params,
}: {
  params: Promise<{ table: string }>;
}) {
  const { table } = await params;
  const reqRes = await getData(table);

  return <div>{reqRes}</div>;
}
