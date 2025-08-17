"use client";

import CardErc7730 from "./address-abi-form";
import { ModeToggle } from "~/components/ui/theme-switcher";
import { JsonFileUpload } from "~/components/ui/json-file-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export function HomeContent() {
  return (
    <div className="container m-auto min-h-screen max-w-4xl p-4">
      <div className="w-full">
        <header className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            ERC7730 Json builder <span className="text-red-500">Alpha</span>
          </h1>
          <ModeToggle />
        </header>

        <Tabs defaultValue="build" className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-2">
            <TabsTrigger value="build" className="text-base">
              Build Json
            </TabsTrigger>
            <TabsTrigger value="preview" className="text-base">
              Preview Json
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="build" className="mt-0">
            <div className="flex justify-center">
              <CardErc7730 />
            </div>
          </TabsContent>
          
          <TabsContent value="preview" className="mt-0">
            <JsonFileUpload />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}