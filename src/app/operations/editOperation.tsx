import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useErc7730Store } from "~/store/erc7730Provider";
import { z } from "zod";
import { Form } from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import OperationInformation from "./operationInformation";
import OperationFields from "./operationFields";
import { DateFieldFormSchema } from "./fields/dateFieldForm";
import { useEffect } from "react";
import { TokenAmountFieldFormSchema } from "./fields/tokenAmountFormField";
import { NftNameParametersFormSchema } from "./fields/nftNameFieldForm";
import { AddressNameParametersFormSchema } from "./fields/addressNameFieldForm";
import { UnitParametersFormSchema } from "./fields/unitFieldForm copy";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import ValidOperationButton from "./validOperationButton";
import ReviewOperationsButton from "./reviewOperationsButton";
import { convertOperationToSchema } from "~/lib/convertOperationToSchema";
import { updateOperationFromSchema } from "~/lib/updateOperationFromSchema";
import { removeExcludedFields } from "~/lib/removeExcludedFields";

const OperationFormSchema = z.object({
  intent: z.string().min(1, {
    message: "Please enter the intent of the operation.",
  }),
  fields: z.array(
    z.object({
      label: z.string(),
      format: z.union([
        z.enum([
          "raw",
          "addressName",
          "calldata",
          "amount",
          "tokenAmount",
          "nftName",
          "date",
          "duration",
          "unit",
          "enum",
        ]),
        z.null(),
        z.undefined(),
      ]),
      params: z.union([
        DateFieldFormSchema,
        TokenAmountFieldFormSchema,
        NftNameParametersFormSchema,
        AddressNameParametersFormSchema,
        UnitParametersFormSchema,
        z.object({}).strict(),
      ]),
      path: z.string(),
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

  const operationMetadata = useErc7730Store((s) => s.getOperationsMetadata)(
    selectedOperation,
  );

  const setOperationData = useErc7730Store((s) => s.setOperationData);

  const router = useRouter();

  const form = useForm<OperationFormType>({
    resolver: zodResolver(OperationFormSchema),
    defaultValues: {
      intent: "",
      fields: [],
    },
  });

  useEffect(() => {
    if (!operationToEdit) return;
    const defaultValues = convertOperationToSchema(operationToEdit);

    form.reset(defaultValues);
  }, [operationToEdit, form]);

  if (!selectedOperation) return null;

  function onSubmit() {
    const { intent, fields } = form.getValues();

    if (!operationToEdit) return;

    const updatedOperation = updateOperationFromSchema(operationToEdit, {
      intent,
      fields,
    });

    setOperationData(
      selectedOperation,
      updatedOperation,
      removeExcludedFields(updatedOperation),
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="space-y-8"
      >
        <OperationInformation
          form={form}
          operationMetadata={operationMetadata}
        />
        <OperationFields form={form} operationToEdit={operationToEdit} />
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          {operationToEdit && (
            <ReviewOperationsButton
              form={form}
              operation={operationToEdit}
              operationMetadata={operationMetadata}
            />
          )}
          <ValidOperationButton onClick={form.handleSubmit(onSubmit)} />
          <Button onClick={() => router.push("/review")}>
            review <ArrowRight />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditOperation;
