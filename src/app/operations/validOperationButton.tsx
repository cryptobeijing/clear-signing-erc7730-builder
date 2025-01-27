import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/hooks/use-toast";

interface Props {
  onClick: () => void;
}

const ValidOperationButton = ({ onClick }: Props) => {
  const [buttonState, setButtonState] = useState<
    "idle" | "validating" | "validated"
  >("idle");
  const { toast } = useToast();

  const handleSubmit = () => {
    setButtonState("validating");
    onClick();

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
