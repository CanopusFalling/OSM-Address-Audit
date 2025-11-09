import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function getDB() {
  return (await getCloudflareContext({ async: true })).env.DB;
}
