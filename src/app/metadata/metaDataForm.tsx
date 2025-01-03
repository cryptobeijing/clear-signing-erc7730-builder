"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Devices from "./devices";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Erc7730StoreContext, useErc7730Store } from "~/store/erc7730Provider";

const metaDataSchema = z.object({
  owner: z.string().min(1, {
    message:
      "Please enter a description that will represent your ERC-7730 schema",
  }),
  url: z.string().min(1, {
    message:
      "Please enter a description that will represent your ERC-7730 schema",
  }),
  legalName: z.string().min(1, {
    message:
      "Please enter a description that will represent your ERC-7730 schema",
  }),
});

type MetadataFormType = z.infer<typeof metaDataSchema>;

const MetadataForm = () => {
  const router = useRouter();
  const hasHydrated = useContext(Erc7730StoreContext)?.persist?.hasHydrated();

  const { getMetadata, setMetadata, getContractAddress } = useErc7730Store(
    (s) => s,
  );
  const metadata = getMetadata();
  const address = getContractAddress();

  const form = useForm<MetadataFormType>({
    resolver: zodResolver(metaDataSchema),
    values: {
      owner: metadata?.owner ?? "",
      url: metadata?.info?.url ?? "",
      legalName: metadata?.info?.legalName ?? "",
    },
  });

  form.watch((value) => {
    if (hasHydrated === false) return;
    setMetadata({
      owner: value.owner,
      info: {
        legalName: value.legalName ?? "",
        url: value.url ?? "",
      },
    });
  });

  useEffect(() => {
    if (hasHydrated && metadata === null) {
      router.push("/");
    }
  }, [metadata, router, hasHydrated, form]);

  const onSubmit = (data: MetadataFormType) => {
    setMetadata({
      owner: data.owner,
      info: {
        legalName: data.legalName,
        url: data.url,
      },
    });
  };

  if (hasHydrated !== true) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {metadata && (
          <div className="hidden flex-row justify-between lg:flex">
            <Devices metadata={metadata} address={address} />
          </div>
        )}

        <FormField
          control={form.control}
          name="owner"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Contract owner</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="legalName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Legal Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Legal Name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                URL with more info on the entity the user interacts with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          {metadata && (
            <div className="lg:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button>See on devices</Button>
                </DrawerTrigger>
                <DrawerContent className="h-[80%]">
                  <DrawerHeader>
                    <DrawerTitle className="sr-only">
                      ledger devices
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="overflow-y-auto">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Devices metadata={metadata} address={address} />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          )}
        </div>
      </form>
    </Form>
  );
};

export default MetadataForm;
