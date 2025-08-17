import * as React from "react";

import { Device } from "~/components/devices/device";
import { ReviewScreen } from "~/components/devices/reviewScreen";
import { TitleScreen } from "~/components/devices/titleScreen";
import { SignScreen } from "~/components/devices/signScreen";
import type { DisplayItem, Screen } from "~/shared/getScreensForOperation";
import type { Erc7730 } from "~/store/types";

const operationScreens = (
  screens: Screen[],
  metadata: {
    operationName: string;
    metadata: Erc7730["metadata"] | null;
  },
) => {
  const totalPages = screens.length + 2;
  const owner = metadata?.metadata?.owner;
  const ownerField: DisplayItem | null = owner
    ? {
        displayValue: owner,
        isActive: true,
        label: "Interaction with",
      }
    : null;

  if (ownerField) {
    screens[0]?.unshift(ownerField);
  }

  const titleScreen = (
    <>
      <TitleScreen
        functionName={metadata?.operationName ?? "{functionName}"}
        type={"transaction"}
      />
      <Device.Pagination current={1} total={totalPages} />
    </>
  );

  const reviewScreens = screens.map((screen, index) => (
    <>
      <ReviewScreen screen={screen} />
      <Device.Pagination current={index + 2} total={totalPages} />
    </>
  ));

  const signScreen = (
    <>
      <SignScreen
        intent={metadata?.operationName ?? "{intent}"}
        type={"transaction"}
      />
      <Device.Pagination current={totalPages} total={totalPages} />
    </>
  );

  return [titleScreen, ...reviewScreens, signScreen];
};

export default operationScreens;
