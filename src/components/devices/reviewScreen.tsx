import { cn } from "~/lib/utils";
import { Device } from "./device";
import { type DisplayItem } from "~/app/operations/operationScreens";

export const ReviewScreen = ({ screen }: { screen: DisplayItem[] }) => {
  const isStax = true;

  return (
    <div
      className={cn(
        "flex flex-col items-start",
        isStax ? "mt-4 gap-[6px] p-3" : "mt-5 gap-3 px-4",
      )}
    >
      {screen
        .filter((t) => t)
        .map(({ label, displayValue }, index) => (
          <div key={`${label}-field-${index}`}>
            <Device.ContentText>
              <span className="text-dark-grey">{label}</span>
            </Device.ContentText>
            <Device.HeadingText>{displayValue}</Device.HeadingText>
          </div>
        ))}
    </div>
  );
};
