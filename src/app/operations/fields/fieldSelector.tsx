import { type UseFormReturn } from "react-hook-form";
import { type OperationFormType } from "../editOperation";
import DateFieldForm from "./dateFieldForm";
import { type Operation } from "~/store/types";
import RawFieldForm from "./rawFieldForm";
import CallDataFieldForm from "./callDataFieldForm";
import AmountFieldForm from "./amountFieldForm";

interface Props {
  form: UseFormReturn<OperationFormType>;
  index: number;
  field: Operation["fields"][number];
}

const FieldSelector = ({ form, index, field }: Props) => {
  if (!("format" in field)) return <div>unknown field format</div>;

  if (field.format === "raw") {
    return <RawFieldForm />;
  }

  if (field.format === "amount") {
    return <AmountFieldForm />;
  }

  if (field.format === "calldata") {
    return <CallDataFieldForm />;
  }

  if (
    "format" in field &&
    field.format === "date" &&
    field.params &&
    "encoding" in field.params
  ) {
    return (
      <DateFieldForm form={form} dateParams={field.params} index={index} />
    );
  }

  return <div>{field.format}</div>;
};

export default FieldSelector;
