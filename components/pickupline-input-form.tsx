"use client";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

import React, { useState } from "react";
import GenerateButton from "./generate-cta-button";

function PickupLineInputForm() {
  const [crush, setCrush] = useState("");
  const [style, setStyle] = useState("");
  return (
    <div className="mx-auto w-full max-w-lg rounded-md bg-transparent text-[#FF2157]">
      <h1 className="mb-4 text-3xl leading-tight md:text-4xl lg:text-5xl">
        Pickup Line Generator
      </h1>

      <form className="space-y-4">
        <div>
          <label
            htmlFor="Crush"
            className="mb-1 block text-left font-medium text-[#A5455C] text-muted-foreground"
          >
            Tell us about your crush
          </label>
          <Textarea
            id="crush"
            rows={4}
            placeholder={"She is a 10 but...\nHe likes football...."}
            className="w-full resize-none placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-left font-medium text-[#A5455C] text-muted-foreground"
          >
            Style
          </label>
          <Input
            id="style"
            type="text"
            placeholder="eg: Funny"
            className="w-full placeholder:text-[#DCDCDC] focus:outline-none focus:ring-0"
          />
        </div>
        <GenerateButton className="w-full" />
      </form>
    </div>
  );
}

export default PickupLineInputForm;
