import getData from "./data/getData";

export default async function Home() {
  return <div>{getData()}</div>;
}
