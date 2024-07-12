import React from "react";
import { useFormStatus } from "react-dom";
import GenerateButton from "./generate-cta-button";

function GenerateFormButton({
  text,
  formAction,
}: {
  text?: string;
  formAction?: (payload: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <GenerateButton
      className="w-full"
      pending={pending}
      formAction={formAction}
      text={text}
      isServerAction
    />
  );
}

export default GenerateFormButton;
