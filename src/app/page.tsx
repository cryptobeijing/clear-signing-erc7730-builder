import { HydrateClient } from "~/trpc/server";
import { HomeContent } from "./home-content";

export default async function Home() {
  return (
    <HydrateClient>
      <HomeContent />
    </HydrateClient>
  );
}
