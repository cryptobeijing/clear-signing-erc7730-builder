import { Device } from "~/components/devices/device";
import { TitleScreen } from "~/components/devices/titleScreen";
import { InfoScreen } from "~/components/devices/infoScreen";
import { type Erc7730 } from "~/store/types";
import { MetadataInfoScreen } from "~/components/devices/metaDataScreen";

interface Props {
  metadata?: Erc7730["metadata"];
  address: string | null;
}

const Devices = ({ metadata, address }: Props) => {
  return (
    <div className="flex flex-col gap-16">
      <div className="flex justify-center">
        <Device.Frame>
          <MetadataInfoScreen
            owner={metadata?.owner ?? ""}
            info={metadata?.info}
            address={address ?? ""}
          />
        </Device.Frame>
      </div>
      <div className="flex justify-center gap-12">
        <Device.Frame>
          <MetadataInfoScreen
            owner={metadata?.owner ?? ""}
            info={metadata?.info}
            address={address ?? ""}
          />
        </Device.Frame>
        <Device.Frame>
          <MetadataInfoScreen
            owner={metadata?.owner ?? ""}
            info={metadata?.info}
            address={address ?? ""}
          />
        </Device.Frame>
      </div>
    </div>
  );
};

export default Devices;
