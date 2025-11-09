import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function getAddress(postcode: string) {
  const db = (await getCloudflareContext({ async: true })).env.DB;

  const stmt = db.prepare(
    `SELECT rowid, * FROM addresses WHERE searchable_postcode = "${postcode}" ORDER BY raw_address`
  );
  const result = (await stmt.run()).results;
  return result;
}
