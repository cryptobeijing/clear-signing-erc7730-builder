import { HydrateClient } from "~/trpc/server";
import CardErc7730 from "./address-abi-form";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container m-auto flex h-screen max-w-2xl items-center justify-center p-4">
        <div>
          <h1 className="mb-4 text-2xl font-bold">ERC7730 Json builder</h1>
          <CardErc7730 />
        </div>
      </div>
    </HydrateClient>
  );
}
