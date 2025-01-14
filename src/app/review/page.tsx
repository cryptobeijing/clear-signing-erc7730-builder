import { HydrateClient } from "~/trpc/server";
import { BreadcrumbInfo } from "./breadCrumb";
import OperationCarousel from "./operationCarousel";
import SelectOperation from "~/shared/selectOperation";
import BackToEdit from "./backToEdit";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="container mx-auto flex max-w-2xl flex-col justify-center p-4 lg:min-w-[1000px]">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Review Operations</h1>
          <BreadcrumbInfo />

          <BackToEdit />

          <div className="mx-auto py-4">
            <SelectOperation />
          </div>
          <OperationCarousel />
        </div>
      </div>
    </HydrateClient>
  );
}
