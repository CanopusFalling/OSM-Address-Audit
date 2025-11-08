import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function getAddress(id: number) {
  const db = (await getCloudflareContext({ async: true })).env.DB;

  const stmt = db.prepare(`SELECT * FROM addresses WHERE rowid = ${id}`);
  const result = (await stmt.run()).results[0];
  return result;
}
