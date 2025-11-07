import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function Home() {
  const db = getCloudflareContext().env.DB;
  const stmt = db.prepare(`SELECT * FROM addresses LIMIT 100;`);
  const returnValue = await stmt.run();

  return <div>{returnValue.results.toString()}</div>;
}
