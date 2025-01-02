import { HydrateClient } from "~/trpc/server";
import MetadataForm from "./metaDataForm";
import ToolBox from "~/components/utils/toolBox";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container m-auto flex h-screen max-w-2xl flex-col items-center justify-center p-4">
        <div className="flex w-full items-center justify-between">
          <h1 className="mb-4 text-2xl font-bold">Page metadata</h1>
          <ToolBox />
        </div>

        <MetadataForm />
      </div>
    </HydrateClient>
  );
}
