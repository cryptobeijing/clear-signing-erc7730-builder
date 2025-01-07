import { type UseFormReturn } from "react-hook-form";
import { type OperationFormType } from "./editOperation";
import { Erc7730, type Operation } from "~/store/types";

import OperationScreens from "./operationScreens";
import { useErc7730Store } from "~/store/erc7730Provider";
import FieldForm from "./fieldForm";

interface Props {
  form: UseFormReturn<OperationFormType>;
  operationToEdit: Operation | null;
}

const OperationFields = ({ form, operationToEdit }: Props) => {
  const context = useErc7730Store((s) => s.getContext)();

  if (!operationToEdit || !context) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-4">
        {operationToEdit.fields.map((field, index) => (
          <FieldForm key={field.path} field={field} form={form} index={index} />
        ))}
      </div>
      <OperationScreens operation={operationToEdit} />
    </div>
  );
};

export default OperationFields;
