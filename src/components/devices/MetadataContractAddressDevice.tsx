import Image from "next/image";

import flexBackArrow from "./assets/flex-back-arrow.svg";
import { cn } from "~/lib/utils";
import { Device } from "./device";
import { type Erc7730 } from "~/store/types";
import QRCodeDisplay from "./QRCodeDisplay";

export const MetadataContractAddressDevice = ({
  actionTitle,
  address,
}: {
  actionTitle?: string;
  owner?: string;
  address?: string;
  deployedOn?: string;
  contractName?: string;
  info?: Erc7730["metadata"]["info"];
}) => {
  return (
    <>
      <div className="relative w-[99%] border-b border-gray-200">
        <div
          className={cn(
            "absolute bottom-0 left-3 top-0 flex items-center justify-center",
          )}
        >
          <Image
            className="inline-block w-4"
            src={flexBackArrow as string}
            alt="Back"
            width={16}
            height={16}
          />
        </div>
        {actionTitle && (
          <div className={cn("py-[14px] text-center")}>
            <Device.ActionText>
              <span>{actionTitle}</span>
            </Device.ActionText>
          </div>
        )}
      </div>
      <div className="grow">
        {address && (
          <Device.Section>
            <div className="flex justify-center">
              <QRCodeDisplay text={address} size={120} />
            </div>
            <div className="text-center">
              <Device.ContentText size="small">{address}</Device.ContentText>
            </div>
          </Device.Section>
        )}
      </div>
    </>
  );
};
