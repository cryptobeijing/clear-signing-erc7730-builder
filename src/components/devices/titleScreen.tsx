import { Device } from "./device";

export const TitleScreen = ({
  functionName,
  type,
}: {
  functionName: string;
  type: string;
}) => (
  <Device.OperationSummary
    type={type}
  >{`Review ${type} to ${functionName}`}</Device.OperationSummary>
);
