import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useErc7730Store } from "~/store/erc7730Provider";
import { z } from "zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import OperationInformation from "./operationInformation";
import OperationFields from "./operationFields";
import { useRouter } from "next/navigation";
import { DateFieldFormSchema } from "./fields/dateFieldForm";

const OperationFormSchema = z.object({
  intent: z.string().min(1, {
    message: "Please enter the intent of the operation.",
  }),
  fields: z.array(
    z.object({
      label: z.string(),
      params: z.union([DateFieldFormSchema, z.object({}).strict()]),
      isIncluded: z.boolean(),
    }),
  ),
});

export type OperationFormType = z.infer<typeof OperationFormSchema>;

interface Props {
  selectedOperation: string;
}
const EditOperation = ({ selectedOperation }: Props) => {
  const operationToEdit = useErc7730Store((s) => s.getOperationsByName)(
    selectedOperation,
  );
  const operationValidated = useErc7730Store((s) => s.getFinalOperationByName)(
    selectedOperation,
  );
  console.log("operationValidated", operationValidated);
  const operationMetadata = useErc7730Store((s) => s.getOperationsMetadata)(
    selectedOperation,
  );

  const setOperationData = useErc7730Store((s) => s.setOperationData);
  const router = useRouter();

  const form = useForm<OperationFormType>({
    resolver: zodResolver(OperationFormSchema),
    defaultValues: {
      intent:
        typeof operationToEdit?.intent === "string"
          ? operationToEdit.intent
          : "",
      fields:
        operationToEdit?.fields?.map((field) => {
          const label = "label" in field ? (field.label ?? "") : "";
          // console.log("operationValidated", operationValidated);
          // console.log("field", field);
          const isIncluded =
            operationValidated === null
              ? true
              : !!operationValidated.fields.find((f) => f.path === field.path);
          // console.log("useForm setup");
          const fieldObject = {
            ...field,
            label,
            params: "params" in field ? (field.params ?? {}) : {},
            isIncluded,
          };
          return fieldObject;
        }) ?? [],
    },
    // values: {
    //   intent:
    //     typeof operationToEdit?.intent === "string"
    //       ? operationToEdit.intent
    //       : "",
    //   fields:
    //     operationToEdit?.fields?.map((field) => {
    //       const label = "label" in field ? (field.label ?? "") : "";
    //       const isIncluded =
    //         operationValidated === null
    //           ? true
    //           : !!operationValidated.fields.find((f) => f.path === field.path);

    //       console.log("useForm setup");
    //       const fieldObject = {
    //         ...field,
    //         label,
    //         params: "params" in field ? (field.params ?? {}) : {},
    //         isIncluded,
    //       };
    //       return fieldObject;
    //     }) ?? [],
    // },
  });

  if (!selectedOperation) return null;

  function onSubmit() {
    console.log("submit");
    const { intent, fields } = form.getValues();

    console.log(fields);
    console.log(fields.filter((field) => field.isIncluded));
    setOperationData(
      selectedOperation,
      {
        intent,
        fields,
      },
      {
        intent,
        fields: fields.filter((field) => field.isIncluded),
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <OperationInformation
          form={form}
          operationMetadata={operationMetadata}
        />
        <OperationFields form={form} operationToEdit={operationToEdit} />
        <Button type="submit" onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default EditOperation;
