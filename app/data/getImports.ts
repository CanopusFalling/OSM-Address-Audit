import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function getImports() {
  const db = (await getCloudflareContext({ async: true })).env.DB;

  const stmt = db.prepare(`SELECT * FROM imports;`);
  return await stmt.run();
}
