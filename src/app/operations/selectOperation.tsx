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
import { useErc7730Store } from "~/store/erc7730Provider";
import useOperationStore from "~/store/useOperationStore";

const SelectOperation = () => {
  const getOperation = useErc7730Store((s) => s.getOperations);
  const { selectedOperation, setSelectedOperation } = useOperationStore();
  const Operation = getOperation();

  useEffect(() => {
    void useOperationStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <Label>Operation to clear sign</Label>
      <Select
        onValueChange={setSelectedOperation}
        value={selectedOperation ?? undefined}
      >
        <SelectTrigger className="w-full lg:w-[420px]">
          <SelectValue placeholder="Select a Operation" />
        </SelectTrigger>
        <SelectContent className="w-full lg:w-auto">
          <SelectGroup>
            <SelectLabel>Operation</SelectLabel>
            {Operation?.formats &&
              Object.entries(Operation.formats).map(([OperationName]) => (
                <SelectItem value={OperationName} key={OperationName}>
                  <div key={OperationName}>
                    <h3>{OperationName}</h3>
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
