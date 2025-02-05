"use client";

import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { cn } from "~/lib/utils";
import { useErc7730Store } from "~/store/erc7730Provider";
import useOperationStore from "~/store/useOperationStore";

const SelectOperation = () => {
  const operation = useErc7730Store((s) => s.getOperations)();
  const { selectedOperation, setSelectedOperation, validateOperation } =
    useOperationStore();

  useEffect(() => {
    void useOperationStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex w-full flex-col gap-1">
      <Label>Operation to clear sign</Label>
      <Select
        onValueChange={setSelectedOperation}
        value={selectedOperation ?? undefined}
      >
        <SelectTrigger className="w-auto text-ellipsis lg:w-[420px]">
          <SelectValue placeholder="Select a Operation" />
        </SelectTrigger>
        <SelectContent className="w-auto">
          <SelectGroup>
            <SelectLabel>Operation</SelectLabel>
            {operation?.formats &&
              Object.entries(operation.formats).map(([operationName]) => (
                <SelectItem value={operationName} key={operationName}>
                  <div key={operationName}>
                    <h3
                      className={cn({
                        "bg-green-200":
                          validateOperation.includes(operationName),
                      })}
                    >
                      {operationName}
                    </h3>
                  </div>
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOperation;
