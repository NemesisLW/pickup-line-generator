import { copyToClipboard } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import GenerateButton from "../generate-cta-button";
import { Card, CardContent } from "../ui/card";

function OutputForm({ pickupLines }: { pickupLines: string[] }) {
  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <h2 className="text-center text-xl text-[#A5455C] mb-4">
        Copy the below pick up lines
      </h2>

      {pickupLines.map((line, index) => (
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
      <div className="pt-4">
        <GenerateButton className="w-full" text="Regenerate Pickup Line" />
      </div>
    </div>
  );
}

export default OutputForm;
