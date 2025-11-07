import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function getData(table: string) {
  const db = (await getCloudflareContext({ async: true })).env.DB;

  const stmt = db.prepare(`SELECT * FROM ${table} LIMIT 100;`);
  return (await stmt.run()).results.toString();
}
