export const runtime = "edge";

import getData from "./data/getData";

export default function Home() {
  return <div>{getData()}</div>;
}
