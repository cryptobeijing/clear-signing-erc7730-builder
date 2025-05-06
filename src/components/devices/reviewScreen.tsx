import { cn } from "~/lib/utils";
import { Device } from "./device";
import { type DisplayItem } from "~/shared/getScreensForOperation";
import Image from "next/image";
import ChevronIconButtonDisabled from "./assets/chevron-icon-button-disabled.svg";

export const ReviewScreen = ({ screen }: { screen: DisplayItem[] }) => {
  const isStax = true;

  return (
    <div
      className={cn(
        "flex flex-col items-start overflow-hidden",
        isStax ? "mt-4 gap-[6px] p-3" : "mt-5 gap-3 px-4",
      )}
    >
      {screen
        .filter((t) => t)
        .map(({ label, displayValue, isActive }, index) => (
          <div
            key={`${label}-field-${index}`}
            className={cn("w-full text-black/30", isActive && "text-black")}
          >
            <Device.ContentText>
              <span>{label}</span>
            </Device.ContentText>
            <div
              className={cn(
                "column-1 flex w-full items-center justify-between leading-[19px]",
              )}
            >
              <Device.HeadingText>{displayValue}</Device.HeadingText>
              {label === "Interaction with" && (
                <Image
                  className="w-4.5 inline-block text-gray-400"
                  src={ChevronIconButtonDisabled as string}
                  alt="Back"
                  width={20}
                  height={20}
                  color="gray-400"
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
