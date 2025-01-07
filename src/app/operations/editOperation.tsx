import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useErc7730Store } from "~/store/erc7730Provider";
import useOperationStore from "~/store/useOperationStore";
import { z } from "zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import OperationInformation from "./operationInformation";
import OperationFields from "./operationFields";

const OperationFormSchema = z.object({
  $id: z.string().min(1, {
    message: "id is required. Please enter the id.",
  }),
  field: z.array(
    z.object({
      label: z.string(),
      // isIncluded: z.boolean(),
    }),
  ),
});

export type OperationFormType = z.infer<typeof OperationFormSchema>;

const EditOperation = () => {
  const { selectedOperation } = useOperationStore();
  const getOperationsByName = useErc7730Store((s) => s.getOperationsByName);
  const setOperationData = useErc7730Store((s) => s.setOperationData);

  const operationToEdit = getOperationsByName(selectedOperation ?? "");

  const form = useForm<OperationFormType>({
    resolver: zodResolver(OperationFormSchema),
    values: {
      $id: operationToEdit?.$id ?? "",
      field:
        operationToEdit?.fields?.map((field) => {
          const fieldObject = {
            ...field,
            label: "label" in field ? (field.label ?? "") : "",
          };
          return fieldObject;
        }) ?? [],
    },
  });

  if (!selectedOperation) return null;

  function onSubmit(values: OperationFormType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  form.watch((value) => {
    if (!operationToEdit) return null;

    return setOperationData(selectedOperation, {
      ...operationToEdit,
      $id: value.$id,
      fields: operationToEdit.fields ?? [],
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <OperationInformation
          form={form}
          selectedOperation={selectedOperation}
        />
        <OperationFields form={form} operationToEdit={operationToEdit} />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default EditOperation;
