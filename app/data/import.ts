import "server-only";

import getDB from "@/app/lib/db";

export interface Import {
  id: number;
  authority: string;
  osm_boundary_id: number;
  data_license: string;
  import_date: Date;
  source_url: string;
  data_license_url: string;
}

function parseRecord(record: Record<string, any>): Import {
  return {
    id: record["id"] as number,
    authority: record["authority"] as string,
    osm_boundary_id: record["osm_boundry_id"] as number,
    data_license: record["data_license"] as string,
    import_date: new Date(record["import_date"] as string),
    source_url: record["source_url"] as string,
    data_license_url: record["data_license_url"] as string,
  };
}

export async function getImport(id: number): Promise<Import> {
  const db = await getDB();
  const stmt = db
    .prepare("SELECT rowid, * from imports WHERE rowid = ?")
    .bind(id);
  const result = await stmt.first();

  if (result == null) {
    throw new Error("Import Not Found");
  }

  return parseRecord(result);
}

export async function getImports(): Promise<Import[]> {
  const db = await getDB();
  const stmt = db.prepare("SELECT rowid, * from imports");
  const result = await stmt.run();

  if (result == null) {
    throw new Error("No Imports in DB");
  }

  const imports: Import[] = result.results.map((record) => parseRecord(record));
  return imports;
}
