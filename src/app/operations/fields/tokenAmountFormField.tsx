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
import { type components } from "~/generate/api-types";
import { type OperationFormType } from "../editOperation";
import { Input } from "~/components/ui/input";

export const TokenAmountFieldFormSchema = z.object({
  tokenPath: z.string().optional(),
  nativeCurrencyAddress: z.union([z.string(), z.array(z.string())]).optional(),
  threshold: z.string().optional(),
  message: z.string().optional().default("Unlimited"),
});

interface Props {
  form: UseFormReturn<OperationFormType>;
  index: number;
  tokenParams: components["schemas"]["InputTokenAmountParameters"];
}

/**
 *
 * to finish
 */
const TokenAmountFieldForm = ({ tokenParams, form, index }: Props) => {
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name={`fields.${index}.params.tokenPath`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Token Path</FormLabel>
            <FormDescription>
              Path reference or constant value for the address of the token
              contract.
            </FormDescription>
            <FormControl>
              <Input {...field} placeholder="Enter token path" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`fields.${index}.params.nativeCurrencyAddress`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Native Currency Address</FormLabel>
            <FormDescription>
              Either a single address or an array of addresses. If the token
              path matches one of these addresses, the tokenAmount is
              interpreted as native currency.
            </FormDescription>
            <FormControl>
              <Input
                {...field}
                placeholder="Enter native currency address(es)"
              />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`fields.${index}.params.threshold`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Threshold</FormLabel>
            <FormDescription>
              Integer value above which a special message is displayed.
              Optional.
            </FormDescription>
            <FormControl>
              <Input {...field} placeholder="Enter threshold value" />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`fields.${index}.params.message`}
        render={({ field }) => (
          <FormItem className="mb-1">
            <FormLabel>Message</FormLabel>
            <FormDescription>
              Message to display if the value exceeds the threshold. Defaults to
              &quot;Unlimited&quot;.
            </FormDescription>
            <FormControl>
              <Input {...field} placeholder="Enter custom message" />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
};

export default TokenAmountFieldForm;
