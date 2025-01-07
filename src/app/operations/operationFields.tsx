import { type UseFormReturn } from "react-hook-form";
import { type OperationFormType } from "./editOperation";
import { type Operation } from "~/store/types";
import { Card } from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Device } from "~/components/devices/device";
import OperationInformation from "./operationInformation";
import OperationScreens from "./operationScreens";

interface Props {
  form: UseFormReturn<OperationFormType>;
  operationToEdit: Operation | null;
}

const OperationFields = ({ form, operationToEdit }: Props) => {
  if (!operationToEdit) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-4">
        {operationToEdit.fields.map((field, index) => (
          <Card key={field.path} className="p-4">
            <div className="flex items-center justify-between">
              <div>{field.path}</div>
              <Switch />
            </div>
            <div>{"label" in field ? field.label : "No label"}</div>
            <FormField
              control={form.control}
              name={`field.${index}.label`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operation name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the name of the transaction Operation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        ))}
      </div>
      <div>
        <OperationScreens operation={operationToEdit} />
      </div>
    </div>
  );
};

export default OperationFields;
