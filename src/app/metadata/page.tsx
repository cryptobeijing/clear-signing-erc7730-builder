import { HydrateClient } from "~/trpc/server";
import MetadataForm from "./metaDataForm";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container m-auto flex h-screen max-w-2xl items-center justify-center p-4">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Page metadata</h1>
          <MetadataForm />
        </div>
      </div>
    </HydrateClient>
  );
}
