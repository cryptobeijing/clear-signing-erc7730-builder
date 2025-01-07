import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type UseFormReturn } from "react-hook-form";
import { type OperationFormType } from "./editOperation";
import { Device } from "~/components/devices/device";
import { TitleScreen } from "~/components/devices/titleScreen";
import { Card } from "~/components/ui/card";
import { useErc7730Store } from "~/store/erc7730Provider";

interface Props {
  form: UseFormReturn<OperationFormType>;
  selectedOperation: string;
}

const OperationInformation = ({ form, selectedOperation }: Props) => {
  const getOperationsMetadata = useErc7730Store((s) => s.getOperationsMetadata);

  const data = getOperationsMetadata(selectedOperation);

  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="h-fit p-4">
        <FormField
          control={form.control}
          name="intent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operation name</FormLabel>
              <FormControl>
                <Input placeholder="intent" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the transaction Operation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </Card>
      <div>
        <Device.Frame>
          <TitleScreen
            functionName={data.operationName ?? "{functionName}"}
            type={"transaction"}
            owner={data.metadata?.owner ?? ""}
          />
          <Device.Pagination current={1} total={1} />
        </Device.Frame>
      </div>
    </div>
  );
};

export default OperationInformation;
