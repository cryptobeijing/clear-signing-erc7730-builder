import { FormDescription, FormLabel } from "~/components/ui/form";
const AmountFieldForm = () => {
  return (
    <div>
      <FormLabel>Amount</FormLabel>
      <FormDescription>
        Display as an amount in native currency, using best ticker / magnitude
        match
      </FormDescription>
    </div>
  );
};

export default AmountFieldForm;
