"use client";

import { generateOutput } from "@/lib/ai/actions";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import PickupLineInputForm from "./pickupline-generator/input-form";
import OutputForm from "./pickupline-generator/output-form";

const initialState: {
  message: string;
  pickupLines?: string[];
} = { message: "" };

function PickupLineGenerator() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(generateOutput, initialState);

  return (
    <div className="mx-auto w-full max-w-lg rounded-md bg-transparent text-[#FF2157]">
      <h1 className="mb-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
        Pickup Line Generator
      </h1>
      {!state.pickupLines ? (
        <PickupLineInputForm formAction={formAction} />
      ) : null}
      {state.pickupLines && <OutputForm pickupLines={state.pickupLines} />}
    </div>
  );
}

export default PickupLineGenerator;
