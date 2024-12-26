import { api, HydrateClient } from "~/trpc/server";
import CardErc7730 from "./address-abi-form";

export default async function Home() {
  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="container m-auto flex h-screen max-w-2xl items-center justify-center p-4">
        <div>
          <h1 className="mb-4 text-2xl font-bold">ERC7730 Jsn builder</h1>
          <CardErc7730 />
        </div>
      </div>
    </HydrateClient>
  );
}
