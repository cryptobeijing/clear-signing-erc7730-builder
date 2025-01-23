import { type UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type components } from "~/generate/api-types";
import { type OperationFormType } from "../editOperation";

const dateEncoding = [
  {
    value: "blockheight",
    description:
      "value is a blockheight and is converted to an approximate unix timestamp",
  },
  { value: "timestamp", description: "value is encoded as a unix timestamp" },
];

export const DateFieldFormSchema = z.object({
  encoding: z.enum(["blockheight", "timestamp"]),
});

interface Props {
  form: UseFormReturn<OperationFormType>;
  index: number;
  dateParams: components["schemas"]["InputDateParameters"];
}

const DateFieldForm = ({ dateParams, form, index }: Props) => {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={`fields.${index}.params.encoding`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Date encoding</FormLabel>
            <FormDescription>
              Display int as a date, using specified encoding. Date display
              RECOMMENDED use of RFC 3339
            </FormDescription>
            <Select
              onValueChange={field.onChange}
              defaultValue={dateParams.encoding}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="blockheight">Block height</SelectItem>
                <SelectItem value="timestamp">Timestamp</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              {
                dateEncoding.find((item) => item.value === field.value)
                  ?.description
              }
            </FormDescription>
          </FormItem>
        )}
      />
    </Form>
  );
};

export default DateFieldForm;
