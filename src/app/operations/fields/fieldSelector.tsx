import { type UseFormReturn } from "react-hook-form";
import { type OperationFormType } from "../editOperation";
import DateFieldForm from "./dateFieldForm";
import { type Operation } from "~/store/types";

interface Props {
  form: UseFormReturn<OperationFormType>;
  index: number;
  field: Operation["fields"][number];
}

const FieldSelector = ({ form, index, field }: Props) => {
  if ("format" in field && field.params && "encoding" in field.params) {
    return (
      <DateFieldForm form={form} dateParams={field.params} index={index} />
    );
  }
  return null;
};

export default FieldSelector;
