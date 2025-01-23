import { FormDescription, FormLabel } from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const RawFieldForm = () => {
  return (
    <div>
      <FormLabel className="mt-1">
        <Select defaultValue="Raw">
          <SelectTrigger className="h-6 w-full text-sm">
            <SelectValue placeholder="value" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Raw">Raw</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </FormLabel>
      <FormDescription>
        Display the integer as a raw int in natural, localized representation
      </FormDescription>
    </div>
  );
};

export default RawFieldForm;
