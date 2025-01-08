import { Device } from "~/components/devices/device";
import { ReviewScreen } from "~/components/devices/reviewScreen";
import matchFieldFormatToMockData from "~/lib/matchFormatToMockData";
import { type Operation } from "~/store/types";

const ITEM_PER_SCREEN = 4;
export interface DisplayItem {
  label: string;
  displayValue: string;
}

export type Screen = DisplayItem[];

const getScreensForOperation = (operation: Operation) => {
  const displays = operation.fields.filter((field) => {
    const label = field && "label" in field ? field.label : undefined;

    return !(label === undefined || label === null || label === "");
  });

  const itemsPerScreen = ITEM_PER_SCREEN;

  const screens: Screen[] = [];
  let screen: DisplayItem[] = [];

  for (let i = 0; i < displays.length; i++) {
    const isLastItem = i === displays.length - 1;

    const displayItem = displays[i];
    const label =
      displayItem && "label" in displayItem ? displayItem.label : undefined;

    if (label === undefined || label === null || label === "") continue;
    if (!displayItem) continue;

    screen.push({
      label,
      displayValue:
        "format" in displayItem
          ? matchFieldFormatToMockData(displayItem?.format ?? "")
          : "displayValue",
    });

    if (screen.length === itemsPerScreen || isLastItem) {
      screens.push(screen);
      screen = [];
    }
  }

  return screens;
};

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
