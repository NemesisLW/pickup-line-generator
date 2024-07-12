"use client";

import { generateOutput } from "@/lib/ai/actions";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormState } from "react-dom";
import PickupLineInputForm from "./pickupline-generator/input-form";
import OutputForm from "./pickupline-generator/output-form";

const initialState: {
  message: string;
  pickupLines?: string[];
} = { message: "" };

function PickupLineGenerator() {
  const [state, formAction] = useFormState(generateOutput, initialState);

  return (
    <div className="mx-auto w-full max-w-lg rounded-md bg-transparent text-[#FF2157]">
      <h1
        className={cn(
          "text-3xl leading-tight md:text-4xl lg:text-5xl",
          !state.message ? "mb-4" : "mb-8",
        )}
      >
        Pickup Line Generator
      </h1>
      {!state.pickupLines ? (
        <PickupLineInputForm formAction={formAction} />
      ) : (
        <OutputForm pickupLines={state.pickupLines} />
      )}
    </div>
  );
}

export default PickupLineGenerator;
