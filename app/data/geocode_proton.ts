import { getCloudflareContext } from "@opennextjs/cloudflare";

export default async function geocode(address: string): Promise<Response> {
  const targetUrl = new URL(`http://localhost:2322/api?q=${address}`);

  const cfContext = await getCloudflareContext({ async: true });

  //@ts-expect-error No idea why this type isn't recognised.
  const vpc_service = await cfContext.env.VPC_SERVICE;

  const fetchOptions: RequestInit = {
    method: "GET",
  };

  fetch;

  const res: Response = await vpc_service.fetch(targetUrl, fetchOptions);

  return res;
}
