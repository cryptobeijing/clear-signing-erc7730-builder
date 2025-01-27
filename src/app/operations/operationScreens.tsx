import { type UseFormReturn } from "react-hook-form";
import { Device } from "~/components/devices/device";
import { ReviewScreen } from "~/components/devices/reviewScreen";
import { getScreensForOperation } from "~/shared/getScreensForOperation";
import { type Operation } from "~/store/types";
import { type OperationFormType } from "./editOperation";

interface Props {
  operation: Operation;
  form: UseFormReturn<OperationFormType>;
}

const OperationScreens = ({ operation, form }: Props) => {
  const { fields } = form.watch();

  if (fields.length === 0) return null;

  const screens = getScreensForOperation({
    ...operation,
    fields: operation.fields
      .map((field, index) => ({
        ...field,
        ...fields[index],
      }))
      .filter((field) => field.isIncluded),
  });

  const totalPages = screens.length + 1;

  return (
    <div className="hidden flex-col items-center gap-4 md:flex">
      {screens.map((screen, index) => (
        <Device.Frame key={`review-screen-${index}`}>
          <ReviewScreen screen={screen} />
          <Device.Pagination current={index + 2} total={totalPages} />
        </Device.Frame>
      ))}
    </div>
  );
};

export default OperationScreens;
