import { regenerateOutput } from "@/lib/ai/actions";
import { copyToClipboard } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import GenerateFormButton from "../buttons/generate-form-button";
import { Card, CardContent } from "../ui/card";

// TODO: Debug Multiple Regeneration issues

function OutputForm({ pickupLines, InitialFormState }: FormOutputProps) {
  // const formActionPayload = regenerateOutput.bind(null, InitialFormState!);

  const initialState: GenerateOutputState = {
    message: "regenerating...",
    InitialFormState: {
      crushDescription: InitialFormState?.crushDescription!,
      style: InitialFormState?.style!,
    },
  };
  const [state, formAction] = useFormState(regenerateOutput, initialState);

  if (state.message === "error") {
    toast.error("Error regenerating pickup lines.");
    console.log(state.pickupLines);
  }

  const currentPickupLines = state.pickupLines || pickupLines;

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <h2 className="text-center text-xl text-[#A5455C] mb-4">
        Copy the below pick up lines
      </h2>

      {currentPickupLines.map((line, index) => (
        <Card key={index} className="border-2 border-[#FF2157] bg-white">
          <CardContent className="py-5 px-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-xl md:text-2xl text-[#B5002C]">
                Pickup line {index + 1}
              </h3>
              <button onClick={() => copyToClipboard(line)}>
                <Image src="/copy.svg" alt="copy" width={20} height={20} />
              </button>
            </div>
            <p className="mt-2 text-lg text-[#FF6A8E] text-left">{line}</p>
          </CardContent>
        </Card>
      ))}
      <form className="pt-4">
        <GenerateFormButton
          text="Regenerate Pickup Line"
          formAction={formAction}
        />
      </form>
    </div>
  );
}

export default OutputForm;
