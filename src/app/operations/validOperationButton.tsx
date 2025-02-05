import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";
import useOperationStore from "~/store/useOperationStore";

interface Props {
  onClick: () => void;
}

const ValidOperationButton = ({ onClick }: Props) => {
  const [buttonState, setButtonState] = useState<
    "idle" | "validating" | "validated"
  >("idle");
  const { toast } = useToast();

  const setValidateOperation = useOperationStore(
    (state) => state.setValidateOperation,
  );

  const selectedOperation = useOperationStore(
    (state) => state.selectedOperation,
  );

  const handleSubmit = () => {
    setButtonState("validating");
    onClick();

    if (selectedOperation) setValidateOperation(selectedOperation);
    toast({
      title: "Operation validated",
      description: "The operation has been added to the final json.",
    });
    setTimeout(() => {
      setButtonState("validated");
    }, 1500);
  };

  return (
    <Button onClick={handleSubmit}>
      {buttonState === "idle" && "Valid operation"}
      {buttonState === "validating" && "Validating..."}
      {buttonState === "validated" && (
        <>
          Validated <Check />
        </>
      )}
    </Button>
  );
};

export default ValidOperationButton;
