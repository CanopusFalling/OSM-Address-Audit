import getDB from "@/app/lib/db";

export interface Address {
  id: number;
  internal_ref_id: string; // Whatever the internal ID is used by the data provider.
  raw_address: string; // Raw address provided by the data provider.
  council_tax_band: string;
  x: number; // gps coordinate
  y: number; // gps coordinate
  city: string;
  postcode: string;
  country: string;
  geocode_success: boolean;
  import_id: number;
}

export async function getAddress(id: number): Promise<Address> {
  const db = await getDB();
  const stmt = db
    .prepare("SELECT rowid, * from addresses WHERE rowid = ?")
    .bind(id);
  const result = await stmt.first();

  if (result == null) {
    throw new Error("Address Not Found");
  }

  return {
    id: result["rowid"] as number,
    internal_ref_id: result["internal_ref_id"] as string,
    raw_address: result["raw_address"] as string,
    council_tax_band: result["council_tax_band"] as string,
    x: result["x"] as number,
    y: result["y"] as number,
    city: result["addr:city"] as string,
    postcode: result["searchable_postcode"] as string,
    country: result["addr:country"] as string,
    geocode_success:
      (result["source:geometry"] as string) == "OpenStreetMap" ? true : false,
    import_id: result["import_id"] as number,
  };
}
