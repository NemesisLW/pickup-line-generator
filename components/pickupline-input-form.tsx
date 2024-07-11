"use client";

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import GenerateButton from "./generate-cta-button";
import { generateOutput } from "@/lib/ai/actions";
import { useFormState, useFormStatus } from "react-dom";
import { OutputSchemaType } from "@/lib/schema";

const initialState: {
  message: string;
  pickupLines?: OutputSchemaType;
} = { message: "" };

function PickupLineInputForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(generateOutput, initialState);

  return (
    <div className="mx-auto w-full max-w-lg rounded-md bg-transparent text-[#FF2157]">
      <h1 className="mb-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
        Pickup Line Generator
      </h1>
      <form
        className="flex flex-col text-xl md:text-2xl lg:space-y-4"
        action={formAction}
      >
        <div>
          <label
            htmlFor="crushDescription"
            className="mb-1 block text-left text-[#A5455C]"
          >
            Tell us about your crush
          </label>
          <Textarea
            id="crushDescription"
            name="crushDescription"
            rows={4}
            placeholder={"She is a 10 but...\nHe likes football...."}
            className="w-full resize-none placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0 md:text-lg"
            required
          />
        </div>
        <div>
          <label
            htmlFor="style"
            className="mb-1 block text-left text-[#A5455C]"
          >
            Style
          </label>
          <Input
            id="style"
            name="style"
            type="text"
            autoComplete="off"
            placeholder="eg: Funny"
            className="w-full placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0 md:text-lg"
            required
          />
        </div>
        <div className="pt-4 md:pt-8">
          <GenerateButton className="w-full" pending={pending} isServerAction />
        </div>
      </form>
      <p>{state.pickupLines?.pickupLines[0].text}</p>
      <p>{state.pickupLines?.pickupLines[1].text}</p>
    </div>
  );
}

export default PickupLineInputForm;
