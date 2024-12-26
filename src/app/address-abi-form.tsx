"use client";

import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import SampleAddressAbiCard from "./sampleAddressAbiCard";
import { Button } from "~/components/ui/button";

const fetchERC7730Metadata = async () => {
  // In a real implementation, this function would interact with the backed
  // and parse the actual metadata. For this example, we'll return mock data.
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  return {
    name: "Sample ERC7730 Token",
    symbol: "ERC7730",
    totalSupply: "1000000",
    owner: "0x1234567890123456789012345678901234567890",
  };
};

const CardErc7730 = () => {
  const [input, setInput] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const [metadata, setMetadata] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputType, setInputType] = useState<"address" | "abi">("address");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetchERC7730Metadata();
      setMetadata(result);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setMetadata(null);
    }
    setLoading(false);
  };

  const onTabChange = (value: string) => {
    setInputType(value as "address" | "abi");
    setInput("");
  };

  return (
    <div className="lg:w-[580px]">
      <form onSubmit={handleSubmit} className="mb-4 flex w-full flex-col gap-4">
        <Tabs defaultValue="address" onValueChange={onTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="address">Contract Address</TabsTrigger>
            <TabsTrigger value="abi">ABI</TabsTrigger>
          </TabsList>
          <TabsContent value="address">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eth-address">Contract Address</Label>
                <Input
                  id="contract-address"
                  placeholder="0x..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="abi">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="abi">ABI</Label>
                <Textarea
                  id="abi"
                  placeholder="Paste your ABI here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>

      <SampleAddressAbiCard setInput={setInput} inputType={inputType} />

      {metadata && (
        <Card>
          <CardHeader>
            <CardTitle>ERC7730 Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              {JSON.stringify(metadata, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CardErc7730;
