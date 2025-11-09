import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

function calculatePercentage(
  records: Record<string, number | string>[],
  targetSource: string
): number {
  const totalCount = records.reduce((sum, record) => {
    return sum + (record["COUNT(*)"] as number);
  }, 0);

  if (totalCount === 0) {
    return 0;
  }

  const targetRecord = records.find(
    (record) => record["source:geometry"] === targetSource
  );
  const targetCount = targetRecord ? targetRecord["COUNT(*)"] : 0;

  const percentage = ((targetCount as number) / totalCount) * 100;

  return percentage;
}

export default async function getPercentGeocoded(import_id: number) {
  const db = (await getCloudflareContext({ async: true })).env.DB;

  const stmt = db
    .prepare(
      `SELECT
      "source:geometry", COUNT(*)
    FROM
      addresses
    WHERE
      import_id = ? GROUP BY "source:geometry";`
    )
    .bind(import_id);

  const queryResult = await stmt.run();

  return calculatePercentage(
    queryResult.results as Record<string, number | string>[],
    "OpenStreetMap"
  );
}
