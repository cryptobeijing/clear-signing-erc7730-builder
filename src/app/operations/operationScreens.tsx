import { Device } from "~/components/devices/device";
import { ReviewScreen } from "~/components/devices/reviewScreen";
import { getScreensForOperation } from "~/shared/getScreensForOperation";
import { type Operation } from "~/store/types";

interface Props {
  operation: Operation;
}

const OperationScreens = ({ operation }: Props) => {
  const screens = getScreensForOperation(operation);
  const totalPages = screens.length + 1;

  return (
    <div className="flex flex-col gap-4">
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
