"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Erc7730StoreContext, useErc7730Store } from "~/store/erc7730Provider";
import SelectOperation from "~/shared/selectOperation";
import EditOperation from "./editOperation";
import useOperationStore from "~/store/useOperationStore";
import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

const OperationsManagement = () => {
  const router = useRouter();
  const hasHydrated = useContext(Erc7730StoreContext)?.persist?.hasHydrated();

  const { getOperations } = useErc7730Store((s) => s);
  const operations = getOperations();
  const { selectedOperation } = useOperationStore();

  useEffect(() => {
    if (hasHydrated && operations === null) {
      router.push("/");
    }
  }, [operations, router, hasHydrated]);

  if (hasHydrated !== true) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between">
        <SelectOperation />
        <Button onClick={() => router.push("/review")}>
          review <ArrowRight />
        </Button>
      </div>
      {selectedOperation && (
        <EditOperation selectedOperation={selectedOperation} />
      )}
    </div>
  );
};

export default OperationsManagement;
