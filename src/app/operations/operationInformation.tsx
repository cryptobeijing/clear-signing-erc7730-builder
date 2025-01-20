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
import { type OperationMetadata } from "~/store/types";

interface Props {
  form: UseFormReturn<OperationFormType>;
  operationMetadata: OperationMetadata | null;
}

const OperationInformation = ({ form, operationMetadata }: Props) => {
  const { intent } = form.watch();

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
            functionName={intent ?? "{functionName}"}
            type={"transaction"}
            owner={operationMetadata?.metadata?.owner ?? ""}
          />
          <Device.Pagination current={1} total={1} />
        </Device.Frame>
      </div>
    </div>
  );
};

export default OperationInformation;
