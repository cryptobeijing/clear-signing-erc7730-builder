"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { Wrench } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Erc7730StoreContext, useErc7730Store } from "~/store/erc7730Provider";
import { useContext } from "react";

const ToolBox = () => {
  const clearStorage = useContext(Erc7730StoreContext)?.persist;

  const reset = () => {
    clearStorage?.clearStorage();
    window.location.reload();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Wrench className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Button variant="secondary" onClick={reset}>
          Reset
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default ToolBox;
