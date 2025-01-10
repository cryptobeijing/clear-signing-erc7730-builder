"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Erc7730StoreContext, useErc7730Store } from "~/store/erc7730Provider";
import SelectOperation from "./selectOperation";
import EditOperation from "./editOperation";

const OperationsManagement = () => {
  const router = useRouter();
  const hasHydrated = useContext(Erc7730StoreContext)?.persist?.hasHydrated();

  const { getOperations } = useErc7730Store((s) => s);
  const operations = getOperations();

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
      <SelectOperation />
      <EditOperation />
    </div>
  );
};

export default OperationsManagement;
