import "server-only";

import getDB from "@/app/lib/db";

export interface Postcode {
  id: number;
  postcode: string;
  geocoding_rate: number;
  import_id: number;
}

function parseRecord(record: Record<string, string | number>): Postcode {
  return {
    id: record["id"] as number,
    postcode: record["postcode"] as string,
    geocoding_rate: record["geocoding_rate"] as number,
    import_id: record["import_id"] as number,
  };
}

export async function getPostcode(id: number): Promise<Postcode> {
  const db = await getDB();
  const stmt = db.prepare("SELECT * from postcodes WHERE id = ?").bind(id);
  const result = await stmt.first();

  if (result == null) {
    throw new Error("Postcode Not Found");
  }

  return parseRecord(result as Record<string, string | number>);
}

export async function getPostcodesInImport(import_id: number) {
  const db = await getDB();
  const stmt = db
    .prepare(
      "SELECT * from postcodes WHERE import_id = ? AND geocoding_rate IS NOT 0 AND geocoding_rate IS NOT 1 ORDER BY geocoding_rate DESC LIMIT 100;"
    )
    .bind(import_id);
  const result = await stmt.run();

  if (result == null) {
    throw new Error("Postcodes associated with import not found.");
  }

  const postcodes = result.results.map((record) =>
    parseRecord(record as Record<string, string | number>)
  );

  return postcodes;
}
