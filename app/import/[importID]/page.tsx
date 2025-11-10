export default async function ImportPage({
  params,
}: {
  params: Promise<{ importID: string }>;
}) {
  const { importID } = await params;
  return (
    <div>
      Import number {importID} | Percentage display is temporarily disabled as
      it was reading all 260,000 rows to calculate it and I don't want to slam
      the DB that hard.
    </div>
  );
}
