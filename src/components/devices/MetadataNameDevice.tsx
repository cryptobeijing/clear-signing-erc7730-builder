import Image from "next/image";

import ChevronIconButton from "./assets/chevron-icon-button.svg";
import { cn } from "~/lib/utils";
import { Device } from "./device";
import { type Erc7730 } from "~/store/types";

export const MetadataNameDevice = ({
  owner,
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
      <div className={cn("py-[14px]")}>
        <div className="flex-grow">
          <Device.Section>
            <div className="text-[#959595]">
              <Device.ContentText>Interaction with</Device.ContentText>
            </div>
            <div
              className={cn(
                "font-semibold",
                "column-1 flex items-center justify-between text-[12px] leading-[12px]",
              )}
            >
              <Device.ContentText size="small">
                {owner ?? ""}
              </Device.ContentText>
              <Image
                className="w-4.5 inline-block"
                src={ChevronIconButton as string}
                alt="Back"
                width={20}
                height={20}
              />
            </div>
          </Device.Section>
        </div>
      </div>
      <div className="justify-center pb-11 md:flex">
        <Device.Pagination
          current={2}
          total={4}
          size="small"
        ></Device.Pagination>
      </div>
    </>
  );
};
