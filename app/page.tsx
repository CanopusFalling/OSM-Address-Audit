import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Home() {
  async function search(formData: FormData) {
    "use server";
    redirect(`/address/${formData.get("address_id")}`);
  }

  return (
    <div>
      search for an address by id (unhelpful but this is just for testing)
      <form action={search}>
        <label>ID: </label>
        <input type="text" name="address_id" />
        <button type="submit">GO!</button>
      </form>
    </div>
  );
}
