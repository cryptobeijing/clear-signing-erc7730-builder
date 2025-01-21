import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
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

export const DateFieldFormSchema = z.object({
  encoding: z.enum(["blockheight", "timestamp"]),
});

interface Props {
  form: UseFormReturn<OperationFormType>;
  index: number;
  dateParams: components["schemas"]["InputDateParameters"];
}

const DateFieldForm = ({ dateParams, form, index }: Props) => {
  // console.log("field", field);
  // const format = field.encoding;
  // const form = useForm<z.infer<typeof DateFieldFormSchema>>({
  //   resolver: zodResolver(DateFieldFormSchema),
  // });

  // function onSubmit(data: z.infer<typeof DateFieldFormSchema>) {
  //   console.log("data", data);
  // }

  // return (
  //   <div>
  //     Date field format
  //     <Select value={dateParams.encoding}>
  //       <SelectTrigger className="w-[180px]">
  //         <SelectValue placeholder="Date possibles formats" />
  //       </SelectTrigger>
  //       <SelectContent>

  //       </SelectContent>
  //     </Select>
  //   </div>
  // );

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={`field.${index}.params.encoding`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Date encoding</FormLabel>
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
          </FormItem>
        )}
      />
      {/* <Button onClick={form.handleSubmit(onSubmit)}>Submit</Button> */}
    </Form>
  );
};

export default DateFieldForm;
