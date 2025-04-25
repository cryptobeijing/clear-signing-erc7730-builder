import Image from "next/image";

import flexBackArrow from "./assets/flex-back-arrow.svg";
import { cn } from "~/lib/utils";
import { Device } from "./device";
import { type Erc7730 } from "~/store/types";

export const MetadataInfoDevice = ({
  actionTitle,
  info,
  deployedOn,
  contractName,
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
        <Device.Section>
          <Device.ActionText>Smart contract owner</Device.ActionText>
          <Device.ContentText size="small">
            {info?.legalName ?? ""}
            <br />
            {info?.url ?? ""}
          </Device.ContentText>
        </Device.Section>
        <Device.Section>
          <Device.ActionText>Smart contract</Device.ActionText>
          <Device.ContentText size="small">
            {contractName ?? ""}
          </Device.ContentText>
        </Device.Section>
        <Device.Section>
          <Device.ActionText>Deployed on</Device.ActionText>
          <Device.ContentText size="small">{deployedOn}</Device.ContentText>
        </Device.Section>
      </div>
    </>
  );
};
