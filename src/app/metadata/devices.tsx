import { Device } from "~/components/devices/device";
import { type Erc7730 } from "~/store/types";
import { MetadataContractAddressDevice } from "~/components/devices/MetadataContractAddressDevice";
import { MetadataInfoDevice } from "~/components/devices/MetadataInfoDevice";
import { MetadataNameDevice } from "~/components/devices/MetadataNameDevice";

interface Props {
  metadata?: Erc7730["metadata"];
  address: string | null;
  contractName?: Erc7730["context"]["$id"];
}

const Devices = ({ metadata, address, contractName }: Props) => {
  //const deployedOn = "2024-10-09";
  return (
    <div className="flex flex-col gap-16">
      <div className="flex justify-center">
        <Device.Frame size="medium">
          <MetadataNameDevice
            actionTitle="Interaction with"
            owner={metadata?.owner ?? ""}
            info={metadata?.info}
          />
        </Device.Frame>
      </div>
      <div className="flex justify-center gap-12">
        <Device.Frame size="medium">
          <MetadataInfoDevice
            actionTitle="Interaction with"
            owner={metadata?.owner ?? ""}
            info={metadata?.info}
            contractName={contractName ?? ""}
            //deployedOn={metadata?.info?.deploymentDate ?? deployedOn ?? ""}
          />
        </Device.Frame>
        <Device.Frame size="medium">
          <MetadataContractAddressDevice
            actionTitle="Smart contract"
            address={address ?? ""}
          />
        </Device.Frame>
      </div>
    </div>
  );
};

export default Devices;
